/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/cash-payments/page.tsx
"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface CashPayment {
  studentId: string;
  studentName: string;
  email: string;
  rollNumber: string;
  organizationRegNo?: string;
  contactNumber: string;
  amount: number;
  orderId: string;
  paymentId?: string;
  status: "pending" | "paid" | "failed";
  createdAt: string;
  approvedAt?: string;
}

export default function CashPaymentsAdmin() {
  const [cashPayments, setCashPayments] = useState<CashPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">("all");
  const [stats, setStats] = useState({
    totalPending: 0,
    totalApproved: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    fetchCashPayments();
  }, []);

  const fetchCashPayments = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await api.get("/payments/cash-payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCashPayments(response.data.payments);
        updateStats(response.data.payments);
      }
    } catch (error: any) {
      console.error("Failed to fetch cash payments:", error);
      alert(error.response?.data?.error || "Failed to load cash payments");
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (payments: CashPayment[]) => {
    const pending = payments.filter(p => p.status === "pending");
    const approved = payments.filter(p => p.status === "paid");
    
    setStats({
      totalPending: pending.length,
      totalApproved: approved.length,
      totalAmount: payments.reduce((sum: number, payment: CashPayment) => sum + (payment.amount / 100), 0),
    });
  };

  const handleApprove = async (studentId: string) => {
    try {
      setActionLoading(studentId);
      const token = getToken();
      
      const response = await api.post(
        "/payments/approve-cash-payment",
        {
          studentId,
          action: "approve",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const paymentId = response.data.paymentId;
        alert(`Payment approved successfully!\n\nPayment ID: ${paymentId}\n\nPlease provide this Payment ID to the student.`);
        fetchCashPayments(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Approval failed:", error);
      alert(error.response?.data?.error || "Failed to approve payment");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (studentId: string) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    try {
      setActionLoading(studentId);
      const token = getToken();
      
      const response = await api.post(
        "/payments/approve-cash-payment",
        {
          studentId,
          action: "reject",
          rejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Payment rejected successfully!");
        setShowRejectModal(null);
        setRejectionReason("");
        fetchCashPayments(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Rejection failed:", error);
      alert(error.response?.data?.error || "Failed to reject payment");
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (studentId: string) => {
    setShowRejectModal(studentId);
    setRejectionReason("");
  };

  const closeRejectModal = () => {
    setShowRejectModal(null);
    setRejectionReason("");
  };

  const filteredPayments = cashPayments.filter(payment => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return payment.status === "pending";
    if (activeTab === "approved") return payment.status === "paid";
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case "paid":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case "failed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cash Payments Management</h1>
          <p className="text-gray-600 mt-2">Manage all cash payments from students</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
                <p className="text-2xl font-semibold text-gray-900">{cashPayments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalPending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Approved</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApproved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="text-2xl font-semibold text-gray-900">₹{stats.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Payments
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "approved"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Approved
              </button>
            </nav>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === "all" && "All Cash Payments"}
              {activeTab === "pending" && "Pending Cash Payments"}
              {activeTab === "approved" && "Approved Cash Payments"}
            </h2>
          </div>

          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "pending" ? "No pending payments at the moment." : 
                 activeTab === "approved" ? "No approved payments yet." : "No cash payments found."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount & Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.studentId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.rollNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.email}
                          </div>
                          {payment.organizationRegNo && (
                            <div className="text-sm text-gray-500">
                              Org: {payment.organizationRegNo}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.contactNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">₹{payment.amount/100}</div>
                        <div className="mt-1">
                          {getStatusBadge(payment.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {payment.paymentId ? (
                          <div>
                            <div className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                              {payment.paymentId}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Provide this to student
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(payment.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payment.status === "pending" ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleApprove(payment.studentId)}
                              disabled={actionLoading === payment.studentId}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                              {actionLoading === payment.studentId ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Approving...
                                </>
                              ) : (
                                "Approve"
                              )}
                            </button>
                            <button
                              onClick={() => openRejectModal(payment.studentId)}
                              disabled={actionLoading === payment.studentId}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">
                            {payment.status === "paid" ? "Approved" : "Rejected"}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900">Reject Payment</h3>
                <div className="mt-2">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">
                    Reason for rejection
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Provide a reason for rejecting this payment..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={closeRejectModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReject(showRejectModal)}
                    disabled={!rejectionReason.trim() || actionLoading === showRejectModal}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {actionLoading === showRejectModal ? "Rejecting..." : "Confirm Reject"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}