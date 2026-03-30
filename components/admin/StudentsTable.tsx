/* eslint-disable @typescript-eslint/no-unused-vars */
// app/components/admin/StudentsTable.tsx
import React from "react";
import { User, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { Student } from "@/app/types/student";

interface StudentsTableProps {
  students: Student[];
  loading: boolean;
  formatDate: (date: string | { $date: { $numberLong: string } } | undefined | null) => string;
}

export default function StudentsTable({ students, loading, formatDate }: StudentsTableProps) {
  
  // Get payment status
  const getPaymentStatus = (student: Student) => {
    if (student.payment?.status === 'paid') {
      return { text: 'Paid', color: 'bg-green-100 text-green-800 border border-green-300' };
    }
    if (student.hasPaid) {
      return { text: 'Paid', color: 'bg-green-100 text-green-800 border border-green-300' };
    }
    return { text: 'Pending', color: 'bg-red-100 text-red-800 border border-red-300' };
  };

  // Calculate marks percentage
  const getMarksPercentage = (student: Student) => {
    if (!student.topicProgress || student.topicProgress.length === 0) return 'N/A';
    
    // Calculate average of assessment scores
    const scores = student.topicProgress
      .filter(topic => topic.assessmentScore !== undefined && topic.assessmentScore !== null)
      .map(topic => topic.assessmentScore!);
    
    if (scores.length === 0) return 'N/A';
    
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return `${Math.round(average)}%`;
  };

  // Get internship period
  const getInternshipPeriod = (student: Student) => {
    const start = formatDate(student.internshipStart);
    const end = formatDate(student.internshipEnd);
    
    if (start === 'N/A' && end === 'N/A') return 'N/A';
    return `${start} - ${end}`;
  };

  // Export to Excel with only specified columns
  const exportToExcel = () => {
    const dataToExport = students.map((student, index) => ({
      'Sr. No.': index + 1,
      'Name': student.fullName,
      'Gender': student.gender,
      'College Name': student.collegeName,
      'Department': student.department,
      'Roll No': student.rollNumber,
      'Org Reg No': student.organizationRegNo || 'N/A',
      'Internship Topic': student.internshipTopic || 'N/A',
      'Marks (%)': getMarksPercentage(student),
      'Contact Number': student.contactNumber,
      'Internship Period': getInternshipPeriod(student)
    }));

    const sheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Students");
    XLSX.writeFile(wb, "students_list.xlsx");
  };

  // Table columns - ONLY SPECIFIED FIELDS
  const columns = [
    { key: 'index', label: 'Sr. No.', width: 'w-16' },
    { key: 'fullName', label: 'Name', width: 'w-48' },
    { key: 'gender', label: 'Gender', width: 'w-24' },
    { key: 'collegeName', label: 'College Name', width: 'w-48' },
    { key: 'department', label: 'Department', width: 'w-48' },
    { key: 'rollNumber', label: 'Roll No', width: 'w-32' },
    { key: 'organizationRegNo', label: 'Org Reg No', width: 'w-32' },
    { key: 'internshipTopic', label: 'Internship Topic', width: 'w-48' },
    { key: 'marks', label: 'Marks (%)', width: 'w-32' },
    { key: 'contactNumber', label: 'Contact Number', width: 'w-32' },
    { key: 'internshipPeriod', label: 'Internship Period', width: 'w-64' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-600 bg-white rounded-2xl border-2 border-blue-200">
        <Loader2 className="animate-spin mr-3 w-8 h-8 text-blue-600" /> 
        <span className="text-xl font-semibold">Loading students data...</span>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600 bg-white rounded-2xl border-2 border-blue-200">
        <User className="w-20 h-20 mx-auto mb-4 text-gray-400" />
        <h3 className="text-2xl font-bold mb-3">No students found</h3>
        <p className="text-lg">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {students.length} students
        </div>
        <Button
          onClick={exportToExcel}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" /> Export Current View
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-blue-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap ${column.width}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {students.map((student, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-blue-50 transition-all duration-300 group border-b border-gray-100"
              >
                {/* Serial Number */}
                <td className="px-4 py-4 text-sm font-bold text-blue-700 whitespace-nowrap">
                  #{index + 1}
                </td>

                {/* Name */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-bold text-gray-900">{student.fullName}</div>
                  <div className="text-xs text-gray-500 mt-1">{student.email}</div>
                </td>

                {/* Gender */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <Badge className={student.gender === 'Male' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-pink-100 text-pink-800 border border-pink-300'}>
                    {student.gender}
                  </Badge>
                </td>

                {/* College Name */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.collegeName}
                </td>

                {/* Department */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.department}
                </td>

                {/* Roll Number */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap font-mono">
                  {student.rollNumber}
                </td>

                {/* Org Reg No */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap font-mono">
                  {student.organizationRegNo || 'N/A'}
                </td>

                {/* Internship Topic */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.internshipTopic || 'N/A'}
                </td>

                {/* Marks (%) */}
                <td className="px-4 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                  {getMarksPercentage(student)}
                </td>

                {/* Contact Number */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap font-mono">
                  {student.contactNumber}
                </td>

                {/* Internship Period */}
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {getInternshipPeriod(student)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}