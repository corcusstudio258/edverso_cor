/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/students/update/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import jwt from "jsonwebtoken";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "No token provided" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const studentId = decoded?.sub;
    if (!studentId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    console.log("🟢 Incoming update action:", body);

    const {
      action,
      topic,
      currentPage,
      totalPages = 55,
      score,
      grade,
      page,
      startTime,
      passed,
      updates,
    } = body || {};

    if (!action)
      return NextResponse.json({ error: "Missing 'action' in body" }, { status: 400 });

    const cleanAction = String(action).trim().toLowerCase();

    const student = await Student.findById(studentId).select("-passwordHash");
    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });

    if (!Array.isArray(student.topicProgress)) student.topicProgress = [];

    switch (cleanAction) {
      case "selecttopic":
      case "select_topic": {
        if (!topic)
          return NextResponse.json({ error: "Topic is required" }, { status: 400 });

        student.internshipTopic = topic;

        const existing = student.topicProgress.find((p) => p.topic === topic);
        if (!existing) {
          student.topicProgress.push({
            topic,
            currentPage: 1,
            pagesRead: [],
            pageStartTimes: {},
            completed: false,
            assessmentDone: false,
          });
        }

        await student.save();
        console.log(`✅ Topic selected/initialized: ${topic}`);
        break;
      }

      case "pagestarttime":
      case "page_start_time": {
        if (!topic || page == null || !startTime)
          return NextResponse.json(
            { error: "Topic, page, and startTime are required" },
            { status: 400 }
          );

        let topicData = student.topicProgress.find((p) => p.topic === topic);
        if (!topicData) {
          topicData = {
            topic,
            currentPage: 1,
            pagesRead: [],
            pageStartTimes: {},
            completed: false,
            assessmentDone: false,
          };
          student.topicProgress.push(topicData);
        }

        if (!topicData.pageStartTimes) topicData.pageStartTimes = {};
        topicData.pageStartTimes[page] = new Date(startTime);

        student.markModified("topicProgress");
        await student.save();
        console.log(`⏱️ Started timer for ${topic} page ${page}`);
        break;
      }

      case "markpageread":
      case "mark_page_read": {
        if (!topic || page == null)
          return NextResponse.json(
            { error: "Topic and page are required" },
            { status: 400 }
          );

        let topicData = student.topicProgress.find((p) => p.topic === topic);
        if (!topicData) {
          topicData = {
            topic,
            currentPage: 1,
            pagesRead: [],
            pageStartTimes: {},
            completed: false,
            assessmentDone: false,
          };
          student.topicProgress.push(topicData);
        }

        // Mark page as read
        if (!topicData.pagesRead.includes(page)) {
          topicData.pagesRead.push(page);
        }

        // Update current page to the next page
        topicData.currentPage = Math.min(page + 1, totalPages);

        // Check if all pages are read (module completed)
        if (topicData.pagesRead.length >= totalPages) {
          topicData.currentPage = totalPages;
          topicData.completed = true; // Mark module as completed
          console.log(`🎉 Module completed for ${topic}`);
        }

        student.markModified("topicProgress");
        await student.save();
        console.log(`✅ Marked page ${page} as read for ${topic}`);
        break;
      }

      case "updatecurrentpage":
      case "update_current_page": {
        if (!topic || currentPage == null)
          return NextResponse.json(
            { error: "Topic and currentPage are required" },
            { status: 400 }
          );

        let topicData = student.topicProgress.find((p) => p.topic === topic);
        if (!topicData) {
          topicData = {
            topic,
            currentPage: currentPage,
            pagesRead: [],
            pageStartTimes: {},
            completed: false,
            assessmentDone: false,
          };
          student.topicProgress.push(topicData);
        }

        topicData.currentPage = currentPage;

        student.markModified("topicProgress");
        await student.save();
        console.log(`📖 Updated current page for ${topic} → ${currentPage}`);
        break;
      }

      case "completeassessment":
      case "complete_assessment": {
        if (!topic || score == null || !grade) {
          return NextResponse.json(
            { error: "Topic, score, and grade are required" },
            { status: 400 }
          );
        }

        const topicData = student.topicProgress.find((p) => p.topic === topic);
        if (!topicData) {
          return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        // Update topic progress with assessment results
        topicData.assessmentScore = score;
        topicData.grade = grade;
        topicData.assessmentDone = true; // Mark assessment as completed
        student.attendance = 100; // Assuming attendance is always 100% after completing an internship
        
        // If passed and module is completed, mark as fully completed
        if (passed && topicData.completed) {
          topicData.completedAt = new Date();
          topicData.certificateIssued = true;
          console.log(`🏁 Topic fully completed: ${topic}`);
        }

        student.markModified("topicProgress");
        await student.save();
        console.log(`📊 Assessment completed for ${topic}: ${score}% (${grade}) - ${passed ? 'PASSED' : 'FAILED'}`);
        break;
      }

      case "updateprofile":
      case "update_profile":
      case "updateProfile": {
        const allowedUpdates = [
          'fullName', 'gender', 'parentName', 'contactNumber', 'email', 'universityName', 
          'collegeName', 'degree', 'department', 'rollNumber', 'classSemester',
          'emergencyContactName', 'emergencyContactNumber', 'emergencyRelation'
        ];
        
        if (!updates || typeof updates !== "object") {
          return NextResponse.json(
            { error: "Invalid updates payload" },
            { status: 400 }
          );
        }

        const updateKeys = Object.keys(updates);
        const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));
        
        if (!isValidUpdate) {
          return NextResponse.json(
            { error: "Invalid update fields" },
            { status: 400 }
          );
        }

        updateKeys.forEach((key) => {
          student.set(key as any, (updates as any)[key]);
        });

        await student.save();
        console.log(`👤 Profile updated for student: ${studentId}`);
        break;
      }

      default: {
        console.warn(`⚠️ Invalid action type received: ${action}`);
        return NextResponse.json(
          { error: `Invalid action type: ${action}` },
          { status: 400 }
        );
      }
    }

    const updated = await Student.findById(studentId).select("-passwordHash").lean();
    return NextResponse.json({ ok: true, student: updated });
  } catch (err: any) {
    console.error("🔥 update student error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}