/* eslint-disable react/no-unescaped-entities */
"use client";

import { api } from "@/lib/api";
import { decodeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface StudentData {
  id: string;
  // Personal Info
  fullName: string;
  gender: string;
  parentName: string;
  contactNumber: string;
  email: string;
  passwordHash: string;

  // Academic Info
  universityName: string;
  degree: string;
  collegeName: string;
  department: string;
  rollNumber: string;
  classSemester: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyRelation: string;

  // Internship Info
  organizationName: string;
  organizationRegNo: string;
  organizationAddress: string;
  organizationContact: string;
  internshipStart: string;
  internshipEnd: string;
  durationHours: number;

  // Registration Status
  registrationStatus: string;
  hasPaid: boolean;
  attendance: number;
  assessmentScore: number;
}

export default function ProfilePage() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<StudentData>>({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const token = localStorage.getItem("balaji_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const decoded = decodeToken(token);
        if (!decoded) {
          router.push("/login");
          return;
        }

        const res = await api.get("/students/me");
        setStudent(res.data.student);
      } catch (error) {
        console.error("Profile load error:", error);
        setError("Failed to load profile data. Please try again.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  const handleEditClick = (section: string) => {
    setEditingSection(section);
    // Initialize form data with current student data for the editable fields
    if (student) {
      if (section === 'personal') {
        setFormData({
          fullName: student.fullName,
          gender: student.gender,
          parentName: student.parentName,
          contactNumber: student.contactNumber,
          email: student.email,
        });
      } else if (section === 'academic') {
        setFormData({
          universityName: student.universityName,
          degree: student.degree,
          collegeName: student.collegeName,
          department: student.department,
          rollNumber: student.rollNumber,
          classSemester: student.classSemester,
        });
      } else if (section === 'emergency') {
        setFormData({
          emergencyContactName: student.emergencyContactName,
          emergencyContactNumber: student.emergencyContactNumber,
          emergencyRelation: student.emergencyRelation,
        });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!student) return;

    setSaving(true);
    try {
      // Use the update endpoint with a new action type for profile updates
      const res = await api.put("/students/update", {
        action: "updateProfile",
        updates: formData
      });

      setStudent(res.data.student);
      toast.success("Profile updated successfully!");
      setEditingSection(null);
      setFormData({});
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
        >
          Retry
        </button>
      </div>
    );

  if (!student)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">No profile data found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Student Profile
          </h1>
          <p className="text-gray-600">
            Here's your complete registration and internship information
          </p>
        </div>

        {/* Personal Information - Editable */}
        <ProfileSection 
          title="Personal Information" 
          isEditing={editingSection === 'personal'}
          onEdit={() => handleEditClick('personal')}
          onCancel={handleCancelEdit}
          onSave={handleSave}
          saving={saving}
        >
          <Grid>
            {editingSection === 'personal' ? (
              <>
                <EditableInfo 
                  title="Full Name" 
                  value={formData.fullName || student.fullName}
                  onChange={(value) => handleInputChange('fullName', value)}
                />
                <EditableInfo 
                  title="Gender" 
                  value={formData.gender || student.gender}
                  onChange={(value) => handleInputChange('gender', value)}
                />
                <EditableInfo 
                  title="Parent / Guardian Name" 
                  value={formData.parentName || student.parentName}
                  onChange={(value) => handleInputChange('parentName', value)}
                />
                <EditableInfo 
                  title="Contact Number" 
                  value={formData.contactNumber || student.contactNumber}
                  onChange={(value) => handleInputChange('contactNumber', value)}
                />
                <EditableInfo 
                  title="Email" 
                  value={formData.email || student.email}
                  onChange={(value) => handleInputChange('email', value)}
                />
              </>
            ) : (
              <>
                <Info title="Full Name" value={student.fullName} />
                <Info title="Gender" value={student.gender} />
                <Info title="Parent / Guardian Name" value={student.parentName} />
                <Info title="Contact Number" value={student.contactNumber} />
                <Info title="Email" value={student.email} />
              </>
            )}
          </Grid>
        </ProfileSection>

        {/* Academic Information - Now Editable */}
        <ProfileSection 
          title="Academic Information"
          isEditing={editingSection === 'academic'}
          onEdit={() => handleEditClick('academic')}
          onCancel={handleCancelEdit}
          onSave={handleSave}
          saving={saving}
        >
          <Grid>
            {editingSection === 'academic' ? (
              <>
                <EditableInfo 
                  title="University" 
                  value={formData.universityName || student.universityName}
                  onChange={(value) => handleInputChange('universityName', value)}
                />
                <EditableInfo 
                  title="Degree" 
                  value={formData.degree || student.degree}
                  onChange={(value) => handleInputChange('degree', value)}
                />
                <EditableInfo 
                  title="College" 
                  value={formData.collegeName || student.collegeName}
                  onChange={(value) => handleInputChange('collegeName', value)}
                />
                <EditableInfo 
                  title="Department" 
                  value={formData.department || student.department}
                  onChange={(value) => handleInputChange('department', value)}
                />
                <EditableInfo 
                  title="Roll Number" 
                  value={formData.rollNumber || student.rollNumber}
                  onChange={(value) => handleInputChange('rollNumber', value)}
                />
                <EditableInfo 
                  title="Class / Semester" 
                  value={formData.classSemester || student.classSemester}
                  onChange={(value) => handleInputChange('classSemester', value)}
                />
              </>
            ) : (
              <>
                <Info title="University" value={student.universityName} />
                <Info title="Degree" value={student.degree} />
                <Info title="College" value={student.collegeName} />
                <Info title="Department" value={student.department} />
                <Info title="Roll Number" value={student.rollNumber} />
                <Info title="Class / Semester" value={student.classSemester} />
              </>
            )}
          </Grid>
        </ProfileSection>

        {/* Emergency Contact - Editable */}
        <ProfileSection 
          title="Emergency Contact"
          isEditing={editingSection === 'emergency'}
          onEdit={() => handleEditClick('emergency')}
          onCancel={handleCancelEdit}
          onSave={handleSave}
          saving={saving}
        >
          <Grid>
            {editingSection === 'emergency' ? (
              <>
                <EditableInfo 
                  title="Name" 
                  value={formData.emergencyContactName || student.emergencyContactName}
                  onChange={(value) => handleInputChange('emergencyContactName', value)}
                />
                <EditableInfo 
                  title="Relation" 
                  value={formData.emergencyRelation || student.emergencyRelation}
                  onChange={(value) => handleInputChange('emergencyRelation', value)}
                />
                <EditableInfo 
                  title="Contact Number" 
                  value={formData.emergencyContactNumber || student.emergencyContactNumber}
                  onChange={(value) => handleInputChange('emergencyContactNumber', value)}
                />
              </>
            ) : (
              <>
                <Info title="Name" value={student.emergencyContactName} />
                <Info title="Relation" value={student.emergencyRelation} />
                <Info title="Contact Number" value={student.emergencyContactNumber} />
              </>
            )}
          </Grid>
        </ProfileSection>

        {/* Internship Information - Read Only */}
        <ProfileSection title="Internship Details">
          <Grid>
            <Info title="Organization Name" value={student.organizationName} />
            <Info title="Registration No." value={student.organizationRegNo} />
            <Info title="Organization Address" value={student.organizationAddress} />
            <Info title="Organization Contact" value={student.organizationContact} />
            <Info title="Start Date" value={student.internshipStart} />
            <Info title="End Date" value={student.internshipEnd} />
            <Info title="Duration (Hours)" value={String(student.durationHours)} />
          </Grid>
        </ProfileSection>

        {/* Registration Status - Read Only */}
        <ProfileSection title="Registration & Progress">
          <Grid>
            <Info title="Registration Status" value={student.registrationStatus} />
            <Info title="Payment Status" value={student.hasPaid ? "Paid ✅" : "Pending ❌"} />
            <Info title="Attendance (%)" value={`${student.attendance}%`} />
          </Grid>
        </ProfileSection>
      </div>
    </div>
  );
}

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  isEditing?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  saving?: boolean;
}

function ProfileSection({
  title,
  children,
  isEditing = false,
  onEdit,
  onCancel,
  onSave,
  saving = false,
}: ProfileSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 md:p-8 mb-8 shadow-sm hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">📘</span>
          {title}
        </h3>
        {onEdit && !isEditing && (
          <button
            onClick={onEdit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              disabled={saving}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{children}</div>;
}

function Info({ title, value }: { title: string; value?: string | null }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      <h4 className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide">
        {title}
      </h4>
      <p className="text-gray-900 font-semibold text-base break-words">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function EditableInfo({ 
  title, 
  value, 
  onChange 
}: { 
  title: string; 
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-colors">
      <h4 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wide">
        {title}
      </h4>
      <input
        type="text"
        title={title}
        placeholder={`Enter ${title.toLowerCase()}`}
        aria-label={title}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}