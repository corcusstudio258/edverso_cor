/* eslint-disable react/no-unescaped-entities */
// components/CertificateView.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

interface CertificateData {
  student: {
    fullName: string;
    rollNumber: string;
    gender: string;
    degree: string;
    department: string;
    classSemester: string;
    collegeName: string;
    universityName: string;
    internshipStart: string;
    internshipEnd: string;
    durationHours: number;
    attendance: number;
    internshipTopic: string;
  };
  currentTopicProgress: {
    grade: string;
    certificateIssued: boolean;
  };
}

interface CertificateViewProps {
  certificateData: CertificateData;
}

export default function CertificateView({ certificateData }: CertificateViewProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  
  // Generate a deterministic, unique certificate ID based on student data
  const certificateId = useMemo(() => {
    // Combine student's rollNumber and college name to create a unique base
    const baseString = `${certificateData.student.rollNumber}-${certificateData.student.collegeName}-${certificateData.student.internshipStart}`;
    
    // Create a simple hash function to generate consistent hash from string
    const hashCode = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash);
    };
    
    // Generate a unique but consistent ID
    const hash = hashCode(baseString);
    const paddedHash = hash.toString().padStart(9, '0').slice(0, 9);
    
    // Format: BSS-{collegeAbbreviation}-{studentRoll}-{hash}
    const collegeAbbrev = certificateData.student.collegeName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3);
    
    return `BSS-${collegeAbbrev}-${certificateData.student.rollNumber}-${paddedHash}`;
  }, [certificateData.student.rollNumber, certificateData.student.collegeName, certificateData.student.internshipStart]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Use a timeout to ensure state update is processed
    setTimeout(() => {
      const certificateElement = certificateRef.current;
      if (certificateElement) {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          // Get the actual computed styles
          const computedStyles = window.getComputedStyle(certificateElement);
          const backgroundColor = computedStyles.backgroundColor;
          
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Certificate - ${certificateData.student.fullName}</title>
                <meta charset="UTF-8">
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
                <style>
                  * { 
                    margin: 0; 
                    padding: 0; 
                    box-sizing: border-box;
                  }
                  
                  body { 
                    font-family: 'Inter', sans-serif;
                    background: ${backgroundColor};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                  
                  .certificate-container {
                    width: 210mm;
                    min-height: 297mm;
                    background: 
                      linear-gradient(135deg, #fefefe 0%, #faf5e6 100%),
                      repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(139, 69, 19, 0.03) 10px,
                        rgba(139, 69, 19, 0.03) 20px
                      );
                    border: 20px solid transparent;
                    border-image: linear-gradient(45deg, #8B4513, #D2691E, #A0522D, #8B4513);
                    border-image-slice: 1;
                    position: relative;
                    box-shadow: 
                      0 25px 60px rgba(139, 69, 19, 0.3),
                      inset 0 0 100px rgba(139, 69, 19, 0.1);
                    padding: 40px;
                    position: relative;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                  
                  .watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-45deg);
                    font-size: 90px;
                    font-weight: bold;
                    color: rgba(139, 80, 19, 0.05);
                    white-space: nowrap;
                    font-family: 'Playfair Display', serif;
                    z-index: 1;
                    pointer-events: none;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                  }
                  
                  .border-pattern {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 2px solid rgba(139, 69, 19, 0.3);
                    pointer-events: none;
                    z-index: 1;
                  }
                  
                  .certificate-content {
                    position: relative;
                    z-index: 2;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                  }
                  
                  .header {
                    text-align: center;
                    margin-bottom: 1px;
                  }
                  
                  .logo-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 2px;
                  }
                  
                  .logo {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 3px solid #8B4513;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: #8B4513;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
                  }
                  
                  .organization-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 28px;
                    font-weight: bold;
                    color: #8B4513;
                    margin-bottom: 5px;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                  }
                  
                  .organization-subtitle {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 5px;
                    letter-spacing: 0.5px;
                  }
                  
                  .certificate-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 36px;
                    font-weight: bold;
                    color: #2c5530;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin: 30px 0;
                    position: relative;
                    text-align: center;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                  }
                  
                  .certificate-title::before,
                  .certificate-title::after {
                    content: "✧";
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #8B4513;
                    font-size: 24px;
                  }
                  
                  .certificate-title::before {
                    left: calc(50% - 150px);
                  }
                  
                  .certificate-title::after {
                    right: calc(50% - 150px);
                  }
                  
                  .content {
                    text-align: center;
                    line-height: 1.6;
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 10px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                  }
                  
                  .student-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 24px;
                    font-weight: bold;
                    color: #8B4513;
                    text-decoration: underline;
                    text-underline-offset: 5px;
                    letter-spacing: 1px;
                  }
                  
                  .grade-container {
                    margin: 10px 0;
                    padding: 10px 30px;
                    background: linear-gradient(135deg, #2c5530, #4a7c59);
                    color: white;
                    border-radius: 15px;
                    display: inline-block;
                    margin-left: auto;
                    margin-right: auto;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    border: 2px solid #8B4513;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                  
                  .grade-text {
                    font-size: 24px;
                    font-weight: bold;
                    font-family: 'Playfair Display', serif;
                    letter-spacing: 2px;
                  }
                  .grade-wish{
                  margin-bottom:8px;
                  }
                  
                  .footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-top:10px;
                  }
                  
                  .signature-section {
                    text-align: center;
                    position: relative;
                  }
                  
                  .signature-image {
                    width: 180px;
                    height: 80px;
                    object-fit: contain;
                    margin-bottom: 5px;
                    filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));
                  }
                  
                  .stamp-image {
                    width: 120px;
                    height: 120px;
                    object-fit: contain;
                    position: absolute;
                    top: -30px;
                    right: -10px;
                    opacity: 0.9;
                    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.4));
                  }
                  
                  .signature-text {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 5px;
                    font-size: 16px;
                  }
                  
                  .seal-text {
                    font-size: 12px;
                    color: #666;
                    letter-spacing: 0.5px;
                  }
                  
                  .qr-section {
                    text-align: center;
                  }
                  
                  .qr-container {
                    background: white;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    display: inline-block;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                  }
                  
                  .verification-text {
                    font-size: 10px;
                    color: #666;
                    margin-top: 5px;
                    letter-spacing: 0.5px;
                  }
                  
                  .date-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                  }
                  
                  .date-text {
                    color: #333;
                    font-weight: bold;
                  }
                  
                  .certificate-id {
                    font-size: 12px;
                    color: #666;
                    font-family: monospace;
                    letter-spacing: 1px;
                  }
                  
                  @media print {
                    body {
                      margin: 0 !important;
                      padding: 0 !important;
                      background: transparent !important;
                      -webkit-print-color-adjust: exact !important;
                      print-color-adjust: exact !important;
                      color-adjust: exact !important;
                    }
                    
                    .certificate-container {
                      box-shadow: none !important;
                      margin: 0 !important;
                      border: 20px solid transparent !important;
                      border-image: linear-gradient(45deg, #8B4513, #D2691E, #A0522D, #8B4513) !important;
                      border-image-slice: 1 !important;
                      width: 100% !important;
                      min-height: 100vh !important;
                      page-break-after: avoid;
                      page-break-inside: avoid;
                    }
                    
                    @page {
                      size: A4 portrait;
                      margin: 0;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="certificate-container">
                  ${certificateElement.innerHTML}
                </div>
                <script>
                  // Force print after content loads
                  setTimeout(() => {
                    window.print();
                    setTimeout(() => {
                      window.close();
                    }, 100);
                  }, 500);
                </script>
              </body>
            </html>
          `);
          
          printWindow.document.close();
        }
      }

    }, 100);
    setIsPrinting(false);
  };

  const getGenderPronoun = (gender: string) => {
    switch (gender?.toLowerCase()) {
      case 'female': return 'her';
      case 'male': return 'him';
      default: return 'them';
    }
  };

  const generateQRCodeUrl = () => {
    const verificationData = {
      certificateId: certificateId,
      studentId: certificateData.student.rollNumber,
      name: certificateData.student.fullName,
      grade: certificateData.currentTopicProgress.grade
    };
    
    const encodedData = btoa(JSON.stringify(verificationData));
    return `${window.location.origin}/verify-certificate?data=${encodedData}`;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  const start = new Date(certificateData.student.internshipStart);
  const end = new Date(start);
end.setDate(start.getDate() + 10);
const formattedEnd = end.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100 flex items-center justify-center px-4 py-10 print:bg-white print:p-0">
      <div className="max-w-4xl w-full print:max-w-none print:w-auto">
        {/* Celebration Header - Hidden during print */}
        <div className="text-center mb-8 print:hidden">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl">🎓</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Congratulations!
          </h1>
          <p className="text-gray-600 text-lg">
            You've successfully completed your internship
          </p>
        </div>

        {/* Certificate Container */}
        <div 
          ref={certificateRef}
          id="certificate-content"
          className="certificate-container print:shadow-none print:border-20 print:mx-auto"
        >
          {/* Watermark */}
          <div className="watermark">
            BALAJEE SEWA SANSTHAN
          </div>

          {/* Border Pattern */}
          <div className="border-pattern"></div>

          <div className="certificate-content">
            {/* Header with Logo */}
            <div className="header">
              <div className="logo-container">
                <div className="logo">
                  <Image
                    src="/balajilogo.jpg" 
                    alt="BALAJEE SEWA SANSTHAN Logo" 
                    className="w-full h-full rounded-full object-cover"
                    width={100}
                    height={100}
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-lg font-bold">BSS</span>';
                        parent.className = 'logo flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-400';
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="organization-name">
                BALAJEE SEWA SANSTHAN
              </div>
              <div className="organization-subtitle">
                (Registered under Society Registration Act, 1860)
              </div>
              <div className="organization-subtitle">
                18, Lane NO. 1, Krishna Market Marg,
                Near Gupta Store, Shubhash Nagar, <br/>
                Clement Town, Dehradun, Uttarakhand - 248002
              </div>
            </div>

            {/* Certificate Title */}
            <div className="certificate-title">
              Internship Completion Certificate
            </div>

            {/* Certificate Content */}
            <div className="content">
              <p className="mb-6">
                This is to certify that <span className="student-name">{certificateData.student.fullName}</span>, 
                University Roll No. <strong>{certificateData.student.rollNumber}</strong>, 
                a student of <strong>{certificateData.student.department}</strong>, {certificateData.student.classSemester}, from <strong>{certificateData.student.collegeName}</strong>, 
                has successfully completed 60 hours of internship on topic <strong>{certificateData.student.internshipTopic}</strong> with BALAJEE SEWA SANSTHAN, 
                Dehradun from <strong>{certificateData.student.internshipStart}</strong> to <strong>{formattedEnd}</strong>.
              </p>

              <p className="mb-6">
                During the internship period, the student exhibited a high level of sincerity, discipline, 
                and dedication towards assigned tasks and participated actively in all learning and field activities.
              </p>

              <p className="mb-6">
                The intern has maintained <strong>{certificateData.student.attendance}%</strong> attendance 
                throughout the internship and has been awarded the following grade for overall performance:
              </p>

              <div className="grade-container">
                <div className="grade-text">
                  Grade: {certificateData.currentTopicProgress.grade}
                </div>
              </div>

              <p className="mt-6 mb-3 grade-wish">
                We wish {getGenderPronoun(certificateData.student.gender)} all the best for future academic and professional endeavors.
              </p>
            </div>

            {/* Footer with Signature and QR Code */}
            <div className="footer">
              <div className="signature-section">
                {/* Signature Image */}
                <Image
                  src="/sign.png"
                  alt="Authorized Signature"
                  width={180}
                  height={80}
                  className="signature-image"
                  onError={(e) => {
                    // Fallback to line if signature image fails to load
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const line = document.createElement('div');
                      line.className = 'signature-line';
                      parent.insertBefore(line, parent.querySelector('.signature-text'));
                    }
                  }}
                />
                
                {/* Stamp Image */}
                <Image
                  src="/stamp.png"
                  alt="Official Stamp"
                  width={120}
                  height={120}
                  className="stamp-image"
                  onError={(e) => {
                    // Hide stamp if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="seal-text">Place- Barh, Patna</div>
                
                <div className="signature-text">Authorized Signatory</div>
                <div className="seal-text">(Seal & Signature)</div>
                <div className="seal-text">BALAJEE SEWA SANSTHAN</div>
                <div className="seal-text">Dehradun, Uttarakhand</div>
              </div>

              <div className="qr-section">
                <div className="qr-container">
                  <QRCodeSVG 
                    value={generateQRCodeUrl()}
                    size={150}
                    level="H"
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#8B4513"
                  />
                </div>
                <div className="verification-text">
                  Scan to verify certificate
                </div>
              </div>
            </div>

            {/* Date and Certificate ID */}
            <div className="date-section">
              <div className="certificate-id">
                Certificate ID: {certificateId}
              </div>
              {/* <div className="date-text">
                Date: {new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div> */}
            </div>
          </div>
        </div>

        {/* Action Buttons - Hidden during print */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-4 rounded-xl font-bold shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg border-2 border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPrinting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Preparing Print...
              </>
            ) : (
              <>
                🖨️ Print Certificate
              </>
            )}
          </button>

          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 text-lg border-2 border-gray-500"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
        
        /* Print-specific styles */
        @media print {
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:bg-white {
            background: white !important;
          }
          
          .print\\:p-0 {
            padding: 0 !important;
          }
          
          .print\\:max-w-none {
            max-width: none !important;
          }
          
          .print\\:w-auto {
            width: auto !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:border-20 {
            border-width: 20px !important;
          }
          
          .print\\:mx-auto {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          #certificate-content {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
        
        .certificate-container {
          width: 100%;
          min-height: 297mm;
          background: 
            linear-gradient(135deg, #fefefe 0%, #faf5e6 100%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.03) 10px,
              rgba(139, 69, 19, 0.03) 20px
            );
          border: 20px solid transparent;
          border-image: linear-gradient(45deg, #8B4513, #D2691E, #A0522D, #8B4513);
          border-image-slice: 1;
          position: relative;
          box-shadow: 
            0 25px 60px rgba(139, 69, 19, 0.3),
            inset 0 0 100px rgba(139, 69, 19, 0.1);
          padding: 40px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 90px;
          font-weight: bold;
          color: rgba(139, 80, 19, 0.05);
          white-space: nowrap;
          font-family: 'Playfair Display', serif;
          z-index: 1;
          pointer-events: none;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .border-pattern {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 2px solid rgba(139, 69, 19, 0.3);
          pointer-events: none;
          z-index: 1;
        }
        
        .certificate-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .logo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid #8B4513;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #8B4513;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
        }
        
        .organization-name {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: bold;
          color: #8B4513;
          margin-bottom: 5px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .organization-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
          letter-spacing: 0.5px;
        }
        
        .certificate-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: bold;
          color: #2c5530;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin: 30px 0;
          position: relative;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .certificate-title::before,
        .certificate-title::after {
          content: "✧";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #8B4513;
          font-size: 24px;
        }
        
        .certificate-title::before {
          left: calc(50% - 150px);
        }
        
        .certificate-title::after {
          right: calc(50% - 150px);
        }
        
        .content {
          text-align: center;
          line-height: 1.8;
          font-size: 18px;
          color: #333;
          margin-bottom: 40px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .student-name {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: bold;
          color: #8B4513;
          text-decoration: underline;
          text-underline-offset: 5px;
          letter-spacing: 1px;
        }
        
        .grade-container {
          margin: 30px 0;
          padding: 10px 30px;
          background: linear-gradient(135deg, #2c5530, #4a7c59);
          color: white;
          border-radius: 15px;
          display: inline-block;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          border: 2px solid #8B4513;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .grade-text {
          font-size: 24px;
          font-weight: bold;
          font-family: 'Playfair Display', serif;
          letter-spacing: 2px;
        }
        
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 60px;
        }
        
        .signature-section {
          text-align: center;
          position: relative;
        }
        
        .signature-image {
          width: 180px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 5px;
          filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));
        }
        
        .stamp-image {
          width: 120px;
          height: 120px;
          object-fit: contain;
          position: absolute;
          top: -30px;
          right: -10px;
          opacity: 0.9;
          filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.4));
        }
        
        .signature-text {
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
          font-size: 16px;
        }
        
        .seal-text {
          font-size: 12px;
          color: #666;
          letter-spacing: 0.5px;
        }
        
        .qr-section {
          text-align: center;
        }
        
        .qr-container {
          background: white;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          display: inline-block;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .verification-text {
          font-size: 10px;
          color: #666;
          margin-top: 5px;
          letter-spacing: 0.5px;
        }
        
        .date-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        
        .date-text {
          color: #333;
          font-weight: bold;
        }
        
        .certificate-id {
          font-size: 12px;
          color: #666;
          font-family: monospace;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}