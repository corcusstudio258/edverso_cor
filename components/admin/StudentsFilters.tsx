// app/components/admin/StudentsFilters.tsx
import React from "react";
import { Filter, Search, SortAsc, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filters, UniqueValues } from "@/app/types/student";

interface StudentsFiltersProps {
  filters: Filters;
  uniqueValues: UniqueValues;
  onFilterChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
  studentCount: number;
  totalCount: number;
}

const internshipTopics = [
  "Healthcare",
  "Financial Literacy", 
  "Digital Literacy",
  "Skill Development",
  "Community Development",
  "Politics and Government",
  "Entrepreneurship"
];

// Default empty unique values
const defaultUniqueValues: UniqueValues = {
  colleges: [],
  universities: [],
  degrees: [],
  departments: [],
  semesters: [],
  topics: []
};

export default function StudentsFilters({
  filters,
  uniqueValues = defaultUniqueValues,
  onFilterChange,
  onClearFilters,
  studentCount,
  totalCount
}: StudentsFiltersProps) {
  
  const exportToExcel = () => {
    // This will be implemented in the table component
    console.log("Export to Excel");
  };

  // Safe array access with fallbacks
  const safeColleges = uniqueValues?.colleges || [];
  const safeDepartments = uniqueValues?.departments || [];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-8 border border-blue-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">
          Advanced Filters & Search ({studentCount} of {totalCount} students)
        </h3>
      </div>
      
      {/* First Row Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-blue-500 w-5 h-5" />
          <Input
            placeholder="Search all fields..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full h-12 pl-10 bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 placeholder-gray-500 font-medium rounded-xl"
          />
        </div>

        {/* Sort By */}
        <div className="relative">
          <SortAsc className="absolute left-3 top-3 text-blue-500 w-5 h-5 z-10" />
          <select
            title="Sort By"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className="w-full appearance-none h-12 pl-10 pr-4 border-2 border-blue-200 rounded-xl text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sm"
          >
            <option value="organizationRegNo">🏢 Organization Reg No</option>
            <option value="createdAt">🆕 Newest First</option>
            <option value="fullName">👤 Name A-Z</option>
            <option value="payment">💰 Payment Status</option>
          </select>
        </div>

        {/* Payment Filter */}
        <Select value={filters.paymentFilter} onValueChange={(value) => onFilterChange({ paymentFilter: value })}>
          <SelectTrigger className="bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 font-medium h-12 rounded-xl">
            <SelectValue placeholder="💰 Payment Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-blue-200 text-gray-800">
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">✅ Paid</SelectItem>
            <SelectItem value="pending">⏳ Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Gender Filter */}
        <Select value={filters.genderFilter} onValueChange={(value) => onFilterChange({ genderFilter: value })}>
          <SelectTrigger className="bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 font-medium h-12 rounded-xl">
            <SelectValue placeholder="👤 Gender" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-blue-200 text-gray-800">
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">👨 Male</SelectItem>
            <SelectItem value="Female">👩 Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Second Row Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* College Filter */}
        <Select value={filters.collegeFilter} onValueChange={(value) => onFilterChange({ collegeFilter: value })}>
          <SelectTrigger className="bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 font-medium h-12 rounded-xl">
            <SelectValue placeholder="🏫 College" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-blue-200 text-gray-800 max-h-60">
            <SelectItem value="all">All Colleges</SelectItem>
            {safeColleges.map((college) => (
              <SelectItem key={college} value={college}>{college}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Department Filter */}
        <Select value={filters.departmentFilter} onValueChange={(value) => onFilterChange({ departmentFilter: value })}>
          <SelectTrigger className="bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 font-medium h-12 rounded-xl">
            <SelectValue placeholder="📚 Department" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-blue-200 text-gray-800 max-h-60">
            <SelectItem value="all">All Departments</SelectItem>
            {safeDepartments.map((department) => (
              <SelectItem key={department} value={department}>{department}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Internship Topic Filter */}
        <Select value={filters.topicFilter} onValueChange={(value) => onFilterChange({ topicFilter: value })}>
          <SelectTrigger className="bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 font-medium h-12 rounded-xl">
            <SelectValue placeholder="📊 Internship Topic" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-blue-200 text-gray-800">
            <SelectItem value="all">All Topics</SelectItem>
            {internshipTopics.map(topic => (
              <SelectItem key={topic} value={topic}>{topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Third Row - Date Filters and Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Date From */}
        <div className="flex items-center bg-white p-2 h-12 rounded-xl border-2 border-blue-200 w-full">
          <label className="text-sm font-bold text-gray-700 whitespace-nowrap">From:</label>
          <Input
            type="date"
            value={filters.dateFilter.from}
            onChange={(e) => onFilterChange({ 
              dateFilter: { ...filters.dateFilter, from: e.target.value } 
            })}
            className="border-0 focus:ring-0 text-gray-800 font-small"
          />
        </div>

        {/* Date To */}
        <div className="flex items-center bg-white p-2 h-12 rounded-xl border-2 border-blue-200 w-full">
          <label className="text-sm font-bold text-gray-700 whitespace-nowrap">To:</label>
          <Input
            type="date"
            value={filters.dateFilter.to}
            onChange={(e) => onFilterChange({ 
              dateFilter: { ...filters.dateFilter, to: e.target.value } 
            })}
            className="border-0 focus:ring-0 text-gray-800 font-small"
          />
        </div>

        {/* Export Button */}
        <Button
          onClick={exportToExcel}
          className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 font-bold rounded-xl transition-all duration-300"
        >
          <Download className="w-4 h-4 mr-2" /> Export Excel
        </Button>

        {/* Clear Filters Button */}
        <Button
          onClick={onClearFilters}
          className="h-12 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 font-bold rounded-xl transition-all duration-300"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}