/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/students/page.tsx
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2, Users, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Student, UniqueValues } from "@/app/types/student";
import StudentsFilters from "@/components/admin/StudentsFilters";
import StudentsTable from "@/components/admin/StudentsTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Default empty unique values
const defaultUniqueValues: UniqueValues = {
  colleges: [],
  universities: [],
  degrees: [],
  departments: [],
  semesters: [],
  topics: []
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "organizationRegNo",
    paymentFilter: "all",
    genderFilter: "all",
    collegeFilter: "all",
    universityFilter: "all",
    degreeFilter: "all",
    departmentFilter: "all",
    semesterFilter: "all",
    topicFilter: "all",
    dateFilter: { from: "", to: "" }
  });

  // Count pending payment students
  const pendingPaymentCount = useMemo(() => {
    return students.filter(s => 
      s.payment?.status === 'pending' || 
      (!s.payment?.status && !s.hasPaid)
    ).length;
  }, [students]);

  // Format date helper
  const isMongoDate = (
    value: string | { $date: { $numberLong: string } }
  ): value is { $date: { $numberLong: string } } => {
    return typeof value === "object" && value !== null && "$date" in value;
  };

  const formatDate = (date: string | { $date: { $numberLong: string } } | undefined | null): string => {
    if (!date) return "N/A";
    if (isMongoDate(date)) {
      const timestamp = Number(date.$date.$numberLong);
      if (!Number.isNaN(timestamp)) {
        return new Date(timestamp).toLocaleDateString("en-IN");
      }
      return "Invalid Date";
    }

    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? "Invalid Date"
      : parsedDate.toLocaleDateString("en-IN");
  };

  // Memoized data processing with proper initialization
  const { filteredStudents, uniqueValues } = useMemo(() => {
    if (!students.length) {
      return { 
        filteredStudents: [], 
        uniqueValues: defaultUniqueValues 
      };
    }

    let data = [...students];

    // Search filter
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      data = data.filter((s) =>
        Object.values(s).some(val => 
          String(val).toLowerCase().includes(searchTerm)
        )
      );
    }

    // Date filter
    if (filters.dateFilter.from || filters.dateFilter.to) {
      data = data.filter((s) => {
        const date = new Date(formatDate(s.createdAt));
        if (filters.dateFilter.from && date < new Date(filters.dateFilter.from)) return false;
        if (filters.dateFilter.to && date > new Date(filters.dateFilter.to)) return false;
        return true;
      });
    }

    // Payment filter
    if (filters.paymentFilter !== "all") {
      data = data.filter((s) => {
        if (filters.paymentFilter === "paid") return s.hasPaid || s.payment?.status === 'paid';
        if (filters.paymentFilter === "pending") return !s.hasPaid && s.payment?.status !== 'paid';
        return true;
      });
    }

    // Gender filter
    if (filters.genderFilter !== "all") {
      data = data.filter((s) => s.gender === filters.genderFilter);
    }

    // College filter
    if (filters.collegeFilter !== "all") {
      data = data.filter((s) => s.collegeName === filters.collegeFilter);
    }

    // University filter
    if (filters.universityFilter !== "all") {
      data = data.filter((s) => s.universityName === filters.universityFilter);
    }

    // Degree filter
    if (filters.degreeFilter !== "all") {
      data = data.filter((s) => s.degree === filters.degreeFilter);
    }

    // Department filter
    if (filters.departmentFilter !== "all") {
      data = data.filter((s) => s.department === filters.departmentFilter);
    }

    // Semester filter
    if (filters.semesterFilter !== "all") {
      data = data.filter((s) => s.classSemester === filters.semesterFilter);
    }

    // Topic filter
    if (filters.topicFilter !== "all") {
      data = data.filter((s) => s.internshipTopic === filters.topicFilter);
    }

    // Sort data
    data.sort((a, b) => {
      if (filters.sortBy === "organizationRegNo") return (a.organizationRegNo || '').localeCompare(b.organizationRegNo || '');
      if (filters.sortBy === "fullName") return a.fullName?.localeCompare(b.fullName);
      if (filters.sortBy === "createdAt") {
        return new Date(formatDate(b.createdAt)).getTime() - new Date(formatDate(a.createdAt)).getTime();
      }
      if (filters.sortBy === "payment") {
        const aPaid = a.hasPaid || a.payment?.status === 'paid';
        const bPaid = b.hasPaid || b.payment?.status === 'paid';
        return aPaid === bPaid ? 0 : aPaid ? -1 : 1;
      }
      return 0;
    });

    // Get unique values for filters
    const uniqueValues: UniqueValues = {
      colleges: Array.from(new Set(students.map(s => s.collegeName))).filter(Boolean),
      universities: Array.from(new Set(students.map(s => s.universityName))).filter(Boolean),
      degrees: Array.from(new Set(students.map(s => s.degree))).filter(Boolean),
      departments: Array.from(new Set(students.map(s => s.department))).filter(Boolean),
      semesters: Array.from(new Set(students.map(s => s.classSemester))).filter(Boolean),
      topics: Array.from(new Set(students.map(s => s.internshipTopic))).filter(Boolean),
    };

    return { filteredStudents: data, uniqueValues };
  }, [students, filters]);

  // Fetch students with error handling
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/students");
      const data = res.data?.students?.map((s: any) => {
        const { _id, passwordHash, updatedAt, __v, ...rest } = s;
        return rest;
      }) || [];
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete pending payment students
  const deletePendingStudents = async () => {
    try {
      setDeleteLoading(true);
      const response = await api.delete("/admin/students", {
        data: { confirm: "DELETE_PENDING_STUDENTS" }
      });
      
      if (response.data.ok) {
        alert(`✅ Successfully deleted ${response.data.deletedCount} students with pending payment`);
        // Refresh the list
        fetchStudents();
      } else {
        alert("Failed to delete pending students");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(error.response?.data?.error || "Failed to delete pending students");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: "",
      sortBy: "organizationRegNo",
      paymentFilter: "all",
      genderFilter: "all",
      collegeFilter: "all",
      universityFilter: "all",
      degreeFilter: "all",
      departmentFilter: "all",
      semesterFilter: "all",
      topicFilter: "all",
      dateFilter: { from: "", to: "" }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-[95rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl border border-slate-200 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
              <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5">
                <div>
                  <CardTitle className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    Students Management Dashboard
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-blue-100 text-lg">
                    <span>📊 Total Students: <span className="font-bold text-white">{students.length}</span></span>
                    <span>👁️ Showing: <span className="font-bold text-white">{filteredStudents.length}</span></span>
                    {pendingPaymentCount > 0 && (
                      <span className="bg-red-500/20 px-3 py-1 rounded-full">
                        ⚠️ Pending Payments: <span className="font-bold text-white">{pendingPaymentCount}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={fetchStudents}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white border border-green-500 transition-all duration-300"
                  >
                    <Loader2 className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> 
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  
                  {pendingPaymentCount > 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 text-white border border-red-500 transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Pending Payments
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            Delete Pending Payment Students
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600">
                            <div className="space-y-2">
                              <p className="font-semibold">
                                This action will permanently delete {pendingPaymentCount} student(s) with pending payment status.
                              </p>
                              <p className="text-sm">
                                • This cannot be undone<br/>
                                • All data for these students will be lost<br/>
                                • Only students with payment.status = 'pending' will be deleted
                              </p>
                              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 font-bold">Type "DELETE_PENDING_STUDENTS" to confirm:</p>
                                <p className="text-xs text-red-600 mt-1">This is a safety measure to prevent accidental deletion</p>
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deletePendingStudents}
                            disabled={deleteLoading}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            {deleteLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete {pendingPaymentCount} Student(s)
                              </>
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="mt-6 p-6">
              <StudentsFilters
                filters={filters}
                uniqueValues={uniqueValues}
                onFilterChange={handleFilterChange}
                onClearFilters={clearAllFilters}
                studentCount={filteredStudents.length}
                totalCount={students.length}
              />

              <StudentsTable
                students={filteredStudents}
                loading={loading}
                formatDate={formatDate}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}