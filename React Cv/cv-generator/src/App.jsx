import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Edit3,
  Palette,
  Trash2,
  Save,
  Eye,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";

const CVGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    summary: "",
    education: [
      {
        degree: "",
        university: "",
        graduationYear: "",
        gpa: "",
        details: "",
      },
    ],
    skills: [
      {
        category: "Frontend",
        skills: ["HTML5", "CSS3", "JavaScript", "React.js"],
      },
      {
        category: "Styling",
        skills: ["SASS", "Tailwind CSS", "Bootstrap", "Responsive Design"],
      },
      {
        category: "Tools",
        skills: ["Git/GitHub", "VS Code", "npm", "Chrome DevTools"],
      },
      {
        category: "Additional",
        skills: ["REST APIs", "TypeScript", "JSON", "Figma"],
      },
    ],
    certifications: [
      { name: "JavaScript Fundamentals", source: "freeCodeCamp" },
    ],
    achievements: ["Volunteer web developer for local non-profit organization"],
    keyStrengths: [
      "Strong problem-solving and analytical thinking",
      "Excellent communication and team collaboration",
      "Self-motivated learner with growth mindset",
      "Attention to detail and quality-focused approach",
      "Creative design sense and user experience awareness",
      "Adaptable and eager for new challenges",
    ],
    references: [
      {
        name: "",
        title: "",
        company: "",
        phone: "",
        email: "",
      },
    ],
  });

  const [customization, setCustomization] = useState({
    primaryColor: "#667eea",
    accentColor: "#764ba2",
    textColor: "#333333",
    backgroundColor: "#ffffff",
    fontSize: 11,
    lineHeight: 1.4,
    layout: "1fr 1fr",
  });

  const [editMode, setEditMode] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const cvRef = useRef();

  // Default key strengths based on job category
  const defaultStrengths = {
    developer: [
      "Strong problem-solving and debugging skills",
      "Excellent coding practices and clean code principles",
      "Experience with version control and collaboration",
      "Continuous learning mindset for new technologies",
      "Detail-oriented with focus on code quality",
      "Ability to work independently and in team environments",
    ],
    designer: [
      "Creative problem-solving and innovative thinking",
      "Strong visual design and aesthetic sense",
      "User-centered design approach",
      "Proficient in design tools and software",
      "Excellent communication of design concepts",
      "Adaptable to different design requirements",
    ],
    manager: [
      "Strong leadership and team management skills",
      "Excellent strategic planning and execution",
      "Effective communication across all levels",
      "Data-driven decision making approach",
      "Proven track record of delivering results",
      "Ability to mentor and develop team members",
    ],
    analyst: [
      "Strong analytical and critical thinking skills",
      "Excellent data interpretation and visualization",
      "Detail-oriented with high accuracy standards",
      "Effective problem identification and solution design",
      "Strong research and investigation abilities",
      "Clear communication of complex findings",
    ],
    default: [
      "Strong problem-solving and analytical thinking",
      "Excellent communication and interpersonal skills",
      "Self-motivated learner with growth mindset",
      "Attention to detail and quality-focused approach",
      "Adaptable and eager for new challenges",
      "Proven ability to work effectively in teams",
    ],
  };

  // Auto-generate key strengths based on job title
  useEffect(() => {
    if (formData.jobTitle && formData.keyStrengths.length === 0) {
      const jobLower = formData.jobTitle.toLowerCase();
      let category = "default";

      if (
        jobLower.includes("develop") ||
        jobLower.includes("engineer") ||
        jobLower.includes("program")
      ) {
        category = "developer";
      } else if (
        jobLower.includes("design") ||
        jobLower.includes("ui") ||
        jobLower.includes("ux")
      ) {
        category = "designer";
      } else if (
        jobLower.includes("manager") ||
        jobLower.includes("lead") ||
        jobLower.includes("director")
      ) {
        category = "manager";
      } else if (
        jobLower.includes("analyst") ||
        jobLower.includes("data") ||
        jobLower.includes("research")
      ) {
        category = "analyst";
      }

      setFormData((prev) => ({
        ...prev,
        keyStrengths: defaultStrengths[category],
      }));
    }
  }, [formData.jobTitle]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    if (field === "skills") {
      newSkills[index].skills = value.split(",").map((s) => s.trim());
    } else {
      newSkills[index][field] = value;
    }
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const addSkillCategory = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: "", skills: [] }],
    }));
  };

  const removeSkillCategory = (index) => {
    if (formData.skills.length > 1) {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          university: "",
          graduationYear: "",
          gpa: "",
          details: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      setFormData((prev) => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index),
      }));
    }
  };

  const handleCertificationChange = (index, field, value) => {
    const newCerts = [...formData.certifications];
    newCerts[index][field] = value;
    setFormData((prev) => ({ ...prev, certifications: newCerts }));
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", source: "" }],
    }));
  };

  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const removeAchievement = (index) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleKeyStrengthChange = (index, value) => {
    const newStrengths = [...formData.keyStrengths];
    newStrengths[index] = value;
    setFormData((prev) => ({ ...prev, keyStrengths: newStrengths }));
  };

  const addKeyStrength = () => {
    setFormData((prev) => ({
      ...prev,
      keyStrengths: [...prev.keyStrengths, ""],
    }));
  };

  const removeKeyStrength = (index) => {
    if (formData.keyStrengths.length > 1) {
      setFormData((prev) => ({
        ...prev,
        keyStrengths: prev.keyStrengths.filter((_, i) => i !== index),
      }));
    }
  };

  const handleReferenceChange = (index, field, value) => {
    const newReferences = [...formData.references];
    newReferences[index][field] = value;
    setFormData((prev) => ({ ...prev, references: newReferences }));
  };

  const addReference = () => {
    setFormData((prev) => ({
      ...prev,
      references: [
        ...prev.references,
        { name: "", title: "", company: "", phone: "", email: "" },
      ],
    }));
  };

  const removeReference = (index) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const generateCV = () => {
    setIsGenerated(true);
  };

  const loadSampleData = () => {
    setFormData({
      ...formData,
      fullName: "Alex Johnson",
      jobTitle: "Frontend Developer",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      github: "github.com/alexjohnson",
      linkedin: "linkedin.com/in/alexjohnson",
      summary:
        "Passionate Frontend Developer with strong foundation in modern web technologies. Recent graduate with hands-on experience building responsive applications through personal projects.",
      education: [
        {
          degree: "Bachelor of Computer Science",
          university: "Daffodil International University",
          graduationYear: "Present",
          gpa: "3.8",
          details:
            "Relevant coursework: Web Development, Software Engineering, Database Management, Data Structures",
        },
      ],
      certifications: [
        {
          name: "JavaScript Algorithms and Data Structures",
          source: "freeCodeCamp",
        },
        { name: "React - The Complete Guide", source: "Udemy" },
      ],
      achievements: [
        "Participated in 24-hour hackathon and won Best UI/UX Design",
        "Contributed to open-source projects with 100+ GitHub commits",
        "Mentored 5+ junior students in web development fundamentals",
      ],
      references: [
        {
          name: "Dr. Sarah Wilson",
          title: "Professor of Computer Science",
          company: "University of Technology",
          phone: "+1 (555) 987-6543",
          email: "sarah.wilson@university.edu",
        },
        {
          name: "Michael Chen",
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          phone: "+1 (555) 456-7890",
          email: "michael.chen@techsolutions.com",
        },
      ],
    });
    setTimeout(() => setIsGenerated(true), 100);
  };

  const downloadPDF = () => {
    if (!isGenerated) {
      alert("Please generate your CV first!");
      return;
    }

    const printStyles = `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
          line-height: 1.3;
          font-size: ${customization.fontSize - 1}pt;
          background: white;
        }

        @media print {
          body {
            margin: 0 !important;
            padding: 6mm !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print { display: none !important; }

          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        @page {
          margin: 6mm;
          size: A4;
        }

        .cv-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          box-shadow: none;
          border-radius: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          page-break-inside: avoid;
        }

        .cv-header {
          background: ${customization.primaryColor} !important;
          background: linear-gradient(135deg, ${customization.primaryColor}, ${
      customization.accentColor
    }) !important;
          color: white !important;
          padding: 15px 20px;
          margin-bottom: 12px;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          page-break-inside: avoid;
        }

        .cv-header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 100%;
          height: 200%;
          background: rgba(255,255,255,0.1) !important;
          transform: rotate(15deg);
          pointer-events: none;
        }

        .cv-name {
          font-size: 20pt;
          font-weight: 700;
          margin-bottom: 3px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          position: relative;
          z-index: 2;
          color: white !important;
        }

        .cv-title {
          font-size: 12pt;
          font-weight: 300;
          margin-bottom: 10px;
          opacity: 0.95;
          position: relative;
          z-index: 2;
          color: white !important;
        }

        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 8pt;
          position: relative;
          z-index: 2;
        }

        .contact-item {
          background: rgba(255,255,255,0.1) !important;
          padding: 2px 6px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          color: white !important;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .cv-body {
          padding: 0 20px 15px;
          height: calc(100% - 120px);
          overflow: hidden;
        }

        .section-title {
          color: ${customization.primaryColor} !important;
          font-size: 10pt;
          font-weight: 600;
          margin-bottom: 6px;
          padding-bottom: 2px;
          border-bottom: 1.5px solid ${customization.primaryColor} !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          page-break-after: avoid;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -1.5px;
          left: 0;
          width: 25%;
          height: 1.5px;
          background: ${customization.accentColor} !important;
        }

        .summary-section {
          margin-bottom: 12px;
          page-break-inside: avoid;
        }

        .summary-box {
          background: ${customization.primaryColor}08 !important;
          padding: 8px;
          border-radius: 4px;
          border-left: 3px solid ${customization.primaryColor} !important;
          font-size: 9pt;
          line-height: 1.3;
          text-align: justify;
        }

        .two-column {
          display: grid;
          grid-template-columns: ${
            customization.layout === "1fr" ? "1fr" : customization.layout
          };
          gap: 15px;
          align-items: start;
          height: calc(100% - 80px);
        }

        .column-section {
          margin-bottom: 12px;
          page-break-inside: avoid;
        }

        .skills-grid {
          display: grid;
          font-weight: bold;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .skill-category {
          background: ${customization.primaryColor}05 !important;
          border: 1px solid ${customization.primaryColor}20 !important;
          border-radius: 4px;
          padding: 6px;
          page-break-inside: avoid;
        }

        .skill-category h4 {
          color: ${customization.primaryColor} !important;
          margin-bottom: 4px;
          font-weight: 600;
          font-size: 8pt;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
        }

        .skill-tag {
          background: ${customization.primaryColor} !important;
          background: linear-gradient(135deg, ${customization.primaryColor}, ${
      customization.accentColor
    }) !important;
          color: white !important;
          padding: 1px 4px;
          border-radius: 6px;
          font-size: 7pt;
          font-weight: 500;
          display: inline-block;
        }

        .education-item {
          border-left: 2px solid ${customization.primaryColor}30 !important;
          padding-left: 10px;
          margin-bottom: 8px;
          position: relative;
          page-break-inside: avoid;
        }

        .education-item::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 2px;
          width: 6px;
          height: 6px;
          background: ${customization.primaryColor} !important;
          border-radius: 50%;
        }

        .education-title {
          font-weight: 600;
          font-size: 9pt;
          margin-bottom: 2px;
          color: #333 !important;
        }

        .education-subtitle {
          font-weight: 500;
          color: ${customization.primaryColor} !important;
          margin-bottom: 2px;
          font-size: 8pt;
        }

        .education-duration {
          font-size: 7pt;
          color: #666 !important;
          margin-bottom: 4px;
          font-style: italic;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4px;
        }

        .cert-item {
          background: ${customization.primaryColor}05 !important;
          border-left: 2px solid ${customization.primaryColor} !important;
          padding: 4px;
          border-radius: 3px;
          page-break-inside: avoid;
        }

        .cert-name {
          font-weight: 600;
          margin-bottom: 1px;
          font-size: 8pt;
          color: #333 !important;
        }

        .cert-source {
          color: ${customization.primaryColor} !important;
          font-size: 7pt;
        }

        .achievement-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3px;
        }

        .achievement-item {
          margin-bottom: 3px;
          padding-left: 10px;
          position: relative;
          font-size: 8pt;
          line-height: 1.2;
          color: #555 !important;
          page-break-inside: avoid;
        }

        .achievement-item::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #28a745 !important;
          font-weight: bold;
          font-size: 7pt;
        }

        .references-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px;
        }

        .reference-item {
          background: ${customization.primaryColor}05 !important;
          border: 1px solid ${customization.primaryColor}15 !important;
          border-radius: 4px;
          padding: 6px;
          border-left: 2px solid ${customization.primaryColor} !important;
          page-break-inside: avoid;
        }

        .reference-name {
          font-weight: 600;
          margin-bottom: 1px;
          font-size: 8pt;
          color: #333 !important;
        }

        .reference-title {
          color: ${customization.primaryColor} !important;
          font-size: 7pt;
          font-weight: 500;
          margin-bottom: 1px;
        }

        .reference-company {
          font-size: 7pt;
          color: #666 !important;
          margin-bottom: 2px;
        }

        .reference-contact {
          font-size: 7pt;
          color: #555 !important;
          line-height: 1.1;
        }

        .two-column > div:first-child .column-section:last-child {
          margin-bottom: 0;
        }

        .two-column > div:last-child .column-section:last-child {
          margin-bottom: 0;
        }

        .skills-grid .skill-category:nth-child(n+5) {
          display: none;
        }

        .achievement-list .achievement-item:nth-child(n+6) {
          display: none;
        }

        .references-grid .reference-item:nth-child(n+3) {
          display: none;
        }
      </style>
    `;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${formData.fullName}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${printStyles}
        </head>
        <body>
          <div class="cv-container">
            <div class="cv-header">
              <h1 class="cv-name">${formData.fullName}</h1>
              <h2 class="cv-title">${formData.jobTitle}</h2>
              <div class="contact-info">
                <div class="contact-item"><span>📧</span> ${
                  formData.email
                }</div>
                <div class="contact-item"><span>📱</span> ${
                  formData.phone
                }</div>
                <div class="contact-item"><span>📍</span> ${
                  formData.location
                }</div>
                ${
                  formData.github
                    ? `<div class="contact-item"><span>🔗</span> ${formData.github}</div>`
                    : ""
                }
                ${
                  formData.linkedin
                    ? `<div class="contact-item"><span>💼</span> ${formData.linkedin}</div>`
                    : ""
                }
              </div>
            </div>

            <div class="cv-body">
              <div class="summary-section">
                <h3 class="section-title">Professional Summary</h3>
                <div class="summary-box">
                  <p>${formData.summary}</p>
                </div>
              </div>

              <div class="two-column">
                <div>
                  <div class="column-section">
                    <h3 class="section-title">Technical Skills</h3>
                    <div class="skills-grid">
                      ${formData.skills
                        .filter(
                          (skill) => skill.category && skill.skills.length > 0
                        )
                        .map(
                          (skill) => `
                        <div class="skill-category">
                          <h4>${skill.category}</h4>
                          <div class="skill-tags">
                            ${skill.skills
                              .map((s) => `<span class="skill-tag">${s}</span>`)
                              .join("")}
                          </div>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>

                  ${
                    formData.certifications.filter(
                      (cert) => cert.name && cert.source
                    ).length > 0
                      ? `
                    <div class="column-section">
                      <h3 class="section-title">Certifications</h3>
                      <div class="cert-grid">
                        ${formData.certifications
                          .filter((cert) => cert.name && cert.source)
                          .map(
                            (cert) => `
                          <div class="cert-item">
                            <div class="cert-name">${cert.name}</div>
                            <div class="cert-source">${cert.source}</div>
                          </div>
                        `
                          )
                          .join("")}
                      </div>
                    </div>
                  `
                      : ""
                  }

                  ${
                    formData.references.filter((ref) => ref.name && ref.email)
                      .length > 0
                      ? `
                    <div class="column-section">
                      <h3 class="section-title">References</h3>
                      <div class="references-grid">
                        ${formData.references
                          .filter((ref) => ref.name && ref.email)
                          .map(
                            (ref) => `
                          <div class="reference-item">
                            <div class="reference-name">${ref.name}</div>
                            <div class="reference-title">${ref.title}</div>
                            <div class="reference-company">${ref.company}</div>
                            <div class="reference-contact">
                              ${ref.email}<br>
                              ${ref.phone}
                            </div>
                          </div>
                        `
                          )
                          .join("")}
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>

                <div>
                  <div class="column-section">
                    <h3 class="section-title">Education</h3>
                    ${formData.education
                      .filter((edu) => edu.degree && edu.university)
                      .map(
                        (edu) => `
                      <div class="education-item">
                        <h4 class="education-title">${edu.degree}</h4>
                        <div class="education-subtitle">${edu.university}</div>
                        <div class="education-duration">
                          ${edu.graduationYear}${
                          edu.gpa ? ` • GPA: ${edu.gpa}` : ""
                        }
                        </div>
                        ${
                          edu.details
                            ? `
                          <div style="font-size: 9pt; margin-top: 6px;">
                            ${edu.details
                              .split("\n")
                              .filter((detail) => detail.trim())
                              .map(
                                (detail) =>
                                  `<div style="margin-bottom: 2px;">• ${detail}</div>`
                              )
                              .join("")}
                          </div>
                        `
                            : ""
                        }
                      </div>
                    `
                      )
                      .join("")}
                  </div>

                  ${
                    formData.achievements.filter((achievement) => achievement)
                      .length > 0
                      ? `
                    <div class="column-section">
                      <h3 class="section-title">Experience & Achievements</h3>
                      <div class="achievement-list">
                        ${formData.achievements
                          .filter((achievement) => achievement)
                          .map(
                            (achievement) => `
                          <div class="achievement-item">${achievement}</div>
                        `
                          )
                          .join("")}
                      </div>
                    </div>
                  `
                      : ""
                  }

                  ${
                    formData.keyStrengths.filter((strength) => strength)
                      .length > 0
                      ? `
                    <div class="column-section">
                      <h3 class="section-title">Key Strengths</h3>
                      <div class="achievement-list">
                        ${formData.keyStrengths
                          .filter((strength) => strength)
                          .map(
                            (strength) => `
                          <div class="achievement-item">${strength}</div>
                        `
                          )
                          .join("")}
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=794,height=1123");
    printWindow.document.write(printContent);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();

        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 1000);
    };
  };

  const resetCustomization = () => {
    setCustomization({
      primaryColor: "#667eea",
      accentColor: "#764ba2",
      textColor: "#333333",
      backgroundColor: "#ffffff",
      fontSize: 11,
      lineHeight: 1.4,
      layout: "1fr 1fr",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700">
      <div className="container mx-auto p-5 max-w-7xl">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-3 text-shadow-lg">
            Professional CV Builder
          </h1>
          <p className="text-lg opacity-95 font-light">
            Create, customize, and download your perfect resume with advanced
            editing capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 max-h-screen overflow-y-auto">
              {/* Sample Data Button */}
              <button
                onClick={loadSampleData}
                className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Load Sample Data
              </button>

              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                  />
                  <input
                    type="text"
                    placeholder="Job Title *"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                    <input
                      type="tel"
                      placeholder="Phone *"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Location *"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                    <input
                      type="url"
                      placeholder="GitHub Profile"
                      value={formData.github}
                      onChange={(e) =>
                        handleInputChange("github", e.target.value)
                      }
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                  </div>
                  <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    value={formData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Professional Summary
                </h3>
                <textarea
                  placeholder="Write a compelling 2-3 sentence summary..."
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  rows="4"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90 resize-none"
                />
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Technical Skills
                </h3>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Category"
                      value={skill.category}
                      onChange={(e) =>
                        handleSkillChange(index, "category", e.target.value)
                      }
                      className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                    <input
                      type="text"
                      placeholder="Skills (comma separated)"
                      value={skill.skills.join(", ")}
                      onChange={(e) =>
                        handleSkillChange(index, "skills", e.target.value)
                      }
                      className="flex-2 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                    <button
                      onClick={() => removeSkillCategory(index)}
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSkillCategory}
                  className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Skill Category
                </button>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Education
                </h3>
                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-4 mb-4 bg-gray-50/50"
                  >
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Degree *"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                      <input
                        type="text"
                        placeholder="University *"
                        value={edu.university}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "university",
                            e.target.value
                          )
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Graduation Year *"
                        value={edu.graduationYear}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "graduationYear",
                            e.target.value
                          )
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                      <input
                        type="text"
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) =>
                          handleEducationChange(index, "gpa", e.target.value)
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                    </div>
                    <textarea
                      placeholder="Additional Details (coursework, achievements, etc.)"
                      value={edu.details}
                      onChange={(e) =>
                        handleEducationChange(index, "details", e.target.value)
                      }
                      rows="3"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors mb-3 bg-white/90 resize-none"
                    />
                    <button
                      onClick={() => removeEducation(index)}
                      className="w-full p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
                    >
                      Remove Education
                    </button>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Education
                </button>
              </div>

              {/* Key Strengths */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Key Strengths
                </h3>
                {formData.keyStrengths.map((strength, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Key strength or skill"
                      value={strength}
                      onChange={(e) =>
                        handleKeyStrengthChange(index, e.target.value)
                      }
                      className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                    <button
                      onClick={() => removeKeyStrength(index)}
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addKeyStrength}
                  className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Key Strength
                </button>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Certifications
                </h3>
                {formData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-4 mb-4 bg-gray-50/50"
                  >
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) =>
                          handleCertificationChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                      <input
                        type="text"
                        placeholder="Source"
                        value={cert.source}
                        onChange={(e) =>
                          handleCertificationChange(
                            index,
                            "source",
                            e.target.value
                          )
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                    </div>
                    <button
                      onClick={() => removeCertification(index)}
                      className="w-full p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
                    >
                      Remove Certification
                    </button>
                  </div>
                ))}
                <button
                  onClick={addCertification}
                  className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Certification
                </button>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  Experience & Achievements
                </h3>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Achievement or experience"
                      value={achievement}
                      onChange={(e) =>
                        handleAchievementChange(index, e.target.value)
                      }
                      className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                    />
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addAchievement}
                  className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Achievement
                </button>
              </div>

              {/* References */}
              <div className="mb-6">
                <h3 className="text-blue-600 text-lg font-semibold mb-4 border-b-2 border-blue-600 pb-2">
                  References
                </h3>
                {formData.references.map((reference, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-4 mb-4 bg-gray-50/50"
                  >
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={reference.name}
                      onChange={(e) =>
                        handleReferenceChange(index, "name", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors mb-3 bg-white/90"
                    />
                    <input
                      type="text"
                      placeholder="Job Title *"
                      value={reference.title}
                      onChange={(e) =>
                        handleReferenceChange(index, "title", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors mb-3 bg-white/90"
                    />
                    <input
                      type="text"
                      placeholder="Company/Organization *"
                      value={reference.company}
                      onChange={(e) =>
                        handleReferenceChange(index, "company", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors mb-3 bg-white/90"
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="email"
                        placeholder="Email *"
                        value={reference.email}
                        onChange={(e) =>
                          handleReferenceChange(index, "email", e.target.value)
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={reference.phone}
                        onChange={(e) =>
                          handleReferenceChange(index, "phone", e.target.value)
                        }
                        className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90"
                      />
                    </div>
                    <button
                      onClick={() => removeReference(index)}
                      className="w-full p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
                    >
                      Remove Reference
                    </button>
                  </div>
                ))}
                <button
                  onClick={addReference}
                  className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Reference
                </button>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCV}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Generate My CV
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {/* Preview Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <h3 className="text-xl font-semibold">CV Preview</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowCustomization(!showCustomization)}
                      className={`px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all ${
                        showCustomization ? "bg-white/40" : ""
                      }`}
                    >
                      <Palette className="w-4 h-4 inline mr-2" />
                      Customize
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="px-4 py-2 bg-white/90 text-blue-600 rounded-lg hover:bg-white transition-all font-semibold"
                    >
                      <Download className="w-4 h-4 inline mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Customization Panel */}
              {showCustomization && (
                <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 p-5">
                  <h4 className="text-blue-600 font-semibold mb-4">
                    Customize Your CV
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Primary Color
                      </label>
                      <input
                        type="color"
                        value={customization.primaryColor}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Accent Color
                      </label>
                      <input
                        type="color"
                        value={customization.accentColor}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            accentColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Text Color
                      </label>
                      <input
                        type="color"
                        value={customization.textColor}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            textColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Background
                      </label>
                      <input
                        type="color"
                        value={customization.backgroundColor}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            backgroundColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Font Size: {customization.fontSize}pt
                        </label>
                        <input
                          type="range"
                          min="9"
                          max="14"
                          value={customization.fontSize}
                          onChange={(e) =>
                            setCustomization((prev) => ({
                              ...prev,
                              fontSize: parseInt(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Line Height: {customization.lineHeight}
                        </label>
                        <input
                          type="range"
                          min="1.2"
                          max="1.8"
                          step="0.1"
                          value={customization.lineHeight}
                          onChange={(e) =>
                            setCustomization((prev) => ({
                              ...prev,
                              lineHeight: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                    <button
                      onClick={resetCustomization}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 inline mr-2" />
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* CV Preview */}
              <div className="p-6 max-h-screen overflow-y-auto">
                {isGenerated ? (
                  <div
                    ref={cvRef}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    style={{
                      backgroundColor: customization.backgroundColor,
                      fontSize: `${customization.fontSize}pt`,
                      lineHeight: customization.lineHeight,
                      color: customization.textColor,
                    }}
                  >
                    {/* CV Header */}
                    <div
                      className="text-white p-8 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.accentColor})`,
                      }}
                    >
                      <div className="absolute -top-1/2 -right-1/5 w-full h-full bg-white/10 transform rotate-12"></div>
                      <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2 text-shadow">
                          {formData.fullName}
                        </h1>
                        <h2 className="text-xl font-light mb-4 opacity-95">
                          {formData.jobTitle}
                        </h2>
                        <div className="flex flex-wrap gap-5 text-sm">
                          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            <span>📧</span> {formData.email}
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            <span>📱</span> {formData.phone}
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            <span>📍</span> {formData.location}
                          </div>
                          {formData.github && (
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                              <span>🔗</span> {formData.github}
                            </div>
                          )}
                          {formData.linkedin && (
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                              <span>💼</span> {formData.linkedin}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CV Body */}
                    <div className="p-8">
                      {/* Summary */}
                      <div className="mb-6">
                        <h3
                          className="text-lg font-semibold mb-3 border-b-2 pb-1 uppercase tracking-wide"
                          style={{
                            color: customization.primaryColor,
                            borderColor: customization.primaryColor,
                          }}
                        >
                          Professional Summary
                        </h3>
                        <div
                          className="p-4 rounded-lg border-l-4"
                          style={{
                            backgroundColor: `${customization.primaryColor}05`,
                            borderColor: customization.primaryColor,
                          }}
                        >
                          <p className="text-justify leading-relaxed">
                            {formData.summary}
                          </p>
                        </div>
                      </div>

                      {/* Two Column Layout */}
                      <div
                        className="grid gap-8"
                        style={{ gridTemplateColumns: customization.layout }}
                      >
                        <div>
                          {/* Skills */}
                          <div className="mb-6">
                            <h3
                              className="text-lg font-semibold mb-4 border-b-2 pb-1 uppercase tracking-wide"
                              style={{
                                color: customization.primaryColor,
                                borderColor: customization.primaryColor,
                              }}
                            >
                              Technical Skills
                            </h3>
                            <div className="grid gap-4">
                              {formData.skills
                                .filter(
                                  (skill) =>
                                    skill.category && skill.skills.length > 0
                                )
                                .map((skill, index) => (
                                  <div
                                    key={index}
                                    className="p-4 rounded-lg border border-gray-100"
                                    style={{
                                      backgroundColor: `${customization.primaryColor}05`,
                                    }}
                                  >
                                    <h4
                                      className="font-semibold mb-2"
                                      style={{
                                        color: customization.primaryColor,
                                      }}
                                    >
                                      {skill.category}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {skill.skills.map((s, skillIndex) => (
                                        <span
                                          key={skillIndex}
                                          className="px-3 py-1 text-white rounded-full text-sm font-medium shadow-sm"
                                          style={{
                                            background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.accentColor})`,
                                          }}
                                        >
                                          {s}
                                        </span>
                                      ))}
                                      </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Certifications */}
                          {formData.certifications.filter(
                            (cert) => cert.name && cert.source
                          ).length > 0 && (
                            <div className="mb-6">
                              <h3
                                className="text-lg font-semibold mb-4 border-b-2 pb-1 uppercase tracking-wide"
                                style={{
                                  color: customization.primaryColor,
                                  borderColor: customization.primaryColor,
                                }}
                              >
                                Certifications
                              </h3>
                              <div className="grid gap-3">
                                {formData.certifications
                                  .filter((cert) => cert.name && cert.source)
                                  .map((cert, index) => (
                                    <div
                                      key={index}
                                      className="p-3 rounded-lg border-l-4"
                                      style={{
                                        backgroundColor: `${customization.primaryColor}05`,
                                        borderColor: customization.primaryColor,
                                      }}
                                    >
                                      <div className="font-semibold">
                                        {cert.name}
                                      </div>
                                      <div
                                        className="text-sm"
                                        style={{
                                          color: customization.primaryColor,
                                        }}
                                      >
                                        {cert.source}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* References */}
                          {formData.references.filter(
                            (ref) => ref.name && ref.email
                          ).length > 0 && (
                            <div className="mb-6">
                              <h3
                                className="text-lg font-semibold mb-4 border-b-2 pb-1 uppercase tracking-wide"
                                style={{
                                  color: customization.primaryColor,
                                  borderColor: customization.primaryColor,
                                }}
                              >
                                References
                              </h3>
                              <div className="grid gap-4">
                                {formData.references
                                  .filter((ref) => ref.name && ref.email)
                                  .map((ref, index) => (
                                    <div
                                      key={index}
                                      className="p-4 rounded-lg border border-gray-100 border-l-4"
                                      style={{
                                        backgroundColor: `${customization.primaryColor}05`,
                                        borderLeftColor:
                                          customization.primaryColor,
                                      }}
                                    >
                                      <h4 className="font-semibold text-lg">
                                        {ref.name}
                                      </h4>
                                      <div
                                        className="font-medium"
                                        style={{
                                          color: customization.primaryColor,
                                        }}
                                      >
                                        {ref.title}
                                      </div>
                                      <div className="text-sm text-gray-600 mb-2">
                                        {ref.company}
                                      </div>
                                      <div className="text-sm">
                                        <div>📧 {ref.email}</div>
                                        {ref.phone && <div>📱 {ref.phone}</div>}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          {/* Education */}
                          <div className="mb-6">
                            <h3
                              className="text-lg font-semibold mb-4 border-b-2 pb-1 uppercase tracking-wide"
                              style={{
                                color: customization.primaryColor,
                                borderColor: customization.primaryColor,
                              }}
                            >
                              Education
                            </h3>
                            <div className="space-y-4">
                              {formData.education
                                .filter((edu) => edu.degree && edu.university)
                                .map((edu, index) => (
                                  <div
                                    key={index}
                                    className="pl-4 border-l-4 border-gray-200 relative"
                                  >
                                    <div
                                      className="absolute w-3 h-3 rounded-full -left-2 top-1"
                                      style={{
                                        backgroundColor:
                                          customization.primaryColor,
                                      }}
                                    ></div>
                                    <h4 className="font-semibold text-lg">
                                      {edu.degree}
                                    </h4>
                                    <div
                                      className="font-medium"
                                      style={{
                                        color: customization.primaryColor,
                                      }}
                                    >
                                      {edu.university}
                                    </div>
                                    <div className="text-sm text-gray-500 mb-2">
                                      {edu.graduationYear}
                                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                                    </div>
                                    {edu.details && (
                                      <div className="text-sm leading-relaxed">
                                        {edu.details
                                          .split("\n")
                                          .filter((detail) => detail.trim())
                                          .map((detail, detailIndex) => (
                                            <p
                                              key={detailIndex}
                                              className="mb-1"
                                            >
                                              • {detail}
                                            </p>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          {formData.achievements.filter(
                            (achievement) => achievement
                          ).length > 0 && (
                            <div className="mb-6">
                              <h3
                                className="text-lg font-semibold mb-4 border-b-2 pb-1 uppercase tracking-wide"
                                style={{
                                  color: customization.primaryColor,
                                  borderColor: customization.primaryColor,
                                }}
                              >
                                Experience & Achievements
                              </h3>
                              <div className="space-y-2">
                                {formData.achievements
                                  .filter((achievement) => achievement)
                                  .map((achievement, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="text-green-500 font-bold mt-1">
                                        ✓
                                      </span>
                                      <span className="text-sm leading-relaxed">
                                        {achievement}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Key Strengths */}
                          {formData.keyStrengths.filter((strength) => strength)
                            .length > 0 && (
                            <div className="mb-6">
                              <h3
                                className="text-lg font-semibold mb-4 border-b-2 pb-1 uppercase tracking-wide"
                                style={{
                                  color: customization.primaryColor,
                                  borderColor: customization.primaryColor,
                                }}
                              >
                                Key Strengths
                              </h3>
                              <div className="grid grid-cols-1 gap-2">
                                {formData.keyStrengths
                                  .filter((strength) => strength)
                                  .map((strength, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="text-green-500 font-bold mt-1">
                                        ✓
                                      </span>
                                      <span className="text-sm leading-relaxed">
                                        {strength}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl p-12">
                      <h3 className="text-blue-600 text-xl font-semibold mb-3">
                        Fill the form to see your CV preview
                      </h3>
                      <p className="text-gray-600">
                        Your professional CV will appear here once you complete
                        the form and click "Generate My CV"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
