/* eslint-disable @typescript-eslint/no-explicit-any */
// app/types/student.ts
export interface Student {
  _id?: string;
  fullName: string;
  gender: string;
  parentName: string;
  contactNumber: string;
  email: string;
  universityName: string;
  collegeName: string;
  degree: string;
  department: string;
  rollNumber: string;
  classSemester: string;
  organizationName: string;
  organizationRegNo: string;
  organizationAddress: string;
  organizationContact: string;
  internshipStart: string | { $date: { $numberLong: string } };
  internshipEnd: string | { $date: { $numberLong: string } };
  durationHours: number;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyRelation: string;
  registrationStatus: string;
  hasPaid: boolean;
  payment?: {
    orderId: string;
    paymentId: string;
    amount: number;
    status: string;
  };
  attendance: number;
  assessmentScore: number;
  internshipTopic?: string;
  topicProgress?: Array<{
    pagesRead: any[];
    [key: string]: any;
  }>;
  createdAt: string | { $date: { $numberLong: string } };
}

export interface Filters {
  search: string;
  sortBy: string;
  paymentFilter: string;
  genderFilter: string;
  collegeFilter: string;
  universityFilter: string;
  degreeFilter: string;
  departmentFilter: string;
  semesterFilter: string;
  topicFilter: string;
  dateFilter: { from: string; to: string };
}

export interface UniqueValues {
  colleges: string[];
  universities: string[];
  degrees: string[];
  departments: string[];
  semesters: string[];
  topics: any;
}