import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Download,
    Save,
    Sparkles,
    User,
    GraduationCap,
    BriefcaseBusiness,
    Code,
    FileText,
    Plus,
    Trash2,
    Eye,
} from "lucide-react";

const STORAGE_KEY = "resumeai_resumes";

const emptyResume = {
    title: "My Resume",
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
    education: [
        { id: 1, degree: "", college: "", year: "", score: "" },
    ],
    experience: [
        {
            id: 1,
            company: "",
            position: "",
            duration: "",
            description: "",
        },
    ],
    skills: "",
    projects: [
        {
            id: 1,
            name: "",
            description: "",
            technologies: "",
        },
    ],
    certifications: "",
    achievements: "",
};

// Load a saved resume
function getSavedResume(id) {
    try {
        const resumes = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        const found = resumes.find(
            (resume) => String(resume.id) === String(id)
        );

        if (found) {
            return {
                ...emptyResume,
                ...found,
                education: found.education || emptyResume.education,
                experience: found.experience || emptyResume.experience,
                projects: found.projects || emptyResume.projects,
            };
        }
    } catch (error) {
        console.error("Could not load resume:", error);
    }

    return {
        ...emptyResume,
        education: [...emptyResume.education],
        experience: [...emptyResume.experience],
        projects: [...emptyResume.projects],
    };
}

export default function ResumeBuilder() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [resume, setResume] = useState(() => getSavedResume(id));
    const [activeTab, setActiveTab] = useState("personal");
    const [saved, setSaved] = useState(false);
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [generatingProjectId, setGeneratingProjectId] = useState(null);

    useEffect(() => {
        setResume(getSavedResume(id));
        setSaved(false);
    }, [id]);

    // Update a normal resume field
    function updateField(field, value) {
        setResume((previous) => ({
            ...previous,
            [field]: value,
        }));

        setSaved(false);
    }

    // Update education, experience or project fields
    function updateArray(section, itemId, field, value) {
        setResume((previous) => ({
            ...previous,
            [section]: previous[section].map((item) =>
                item.id === itemId
                    ? { ...item, [field]: value }
                    : item
            ),
        }));

        setSaved(false);
    }

    // Add a new entry
    function addItem(section, item) {
        setResume((previous) => ({
            ...previous,
            [section]: [
                ...previous[section],
                {
                    ...item,
                    id: Date.now() + Math.random(),
                },
            ],
        }));

        setSaved(false);
    }

    // Remove an entry
    function removeItem(section, itemId) {
        setResume((previous) => ({
            ...previous,
            [section]: previous[section].filter(
                (item) => item.id !== itemId
            ),
        }));

        setSaved(false);
    }

    // Generate a professional summary from resume details.
    // This is a template-based generator, not a live AI API.
    function generateSummary() {
        setIsGeneratingSummary(true);

        try {
            const role =
                resume.role.trim() || "motivated professional";

            const skills = (resume.skills || "")
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            const projects = (resume.projects || [])
                .filter((project) => project.name?.trim())
                .map((project) => project.name.trim());

            const experience = (resume.experience || [])
                .filter(
                    (item) =>
                        item.position?.trim() || item.company?.trim()
                )
                .map((item) =>
                    [item.position, item.company]
                        .filter(Boolean)
                        .join(" at ")
                );

            const education = (resume.education || [])
                .filter(
                    (item) => item.degree?.trim() || item.college?.trim()
                )
                .map((item) =>
                    [item.degree, item.college]
                        .filter(Boolean)
                        .join(" from ")
                );

            const skillText = skills.length
                ? skills.slice(0, 5).join(", ")
                : "problem-solving, communication, and teamwork";

            const educationText = education.length
                ? ` Academic background includes ${education[0]}.`
                : "";

            const experienceText = experience.length
                ? ` Experience includes ${experience
                    .slice(0, 2)
                    .join(" and ")}.`
                : "";

            const projectText = projects.length
                ? ` Projects include ${projects
                    .slice(0, 2)
                    .join(" and ")}.`
                : "";

            const summary =
                `Motivated ${role} with skills in ${skillText}.` +
                educationText +
                experienceText +
                projectText +
                " Passionate about solving problems, learning new technologies, and contributing to meaningful projects.";

            updateField("summary", summary);
        } catch (error) {
            console.error("Could not generate summary:", error);
            alert("Unable to generate a summary. Please try again.");
        } finally {
            setIsGeneratingSummary(false);
        }
    }

    // Generate a project description.
    // This is a template-based generator, not a live AI API.
    function generateProjectDescription(item) {
        if (!item.name?.trim()) {
            alert("Please enter a project name first.");
            return;
        }

        setGeneratingProjectId(item.id);

        try {
            const projectName = item.name.trim();

            const technologies = item.technologies
                ?.split(",")
                .map((technology) => technology.trim())
                .filter(Boolean);

            const technologyText = technologies?.length
                ? technologies.join(", ")
                : "modern web technologies";

            const description =
                `Developed ${projectName}, a project built using ${technologyText}. ` +
                `Designed and implemented its core features with a focus on usability, functionality, and performance. ` +
                `Applied software development and problem-solving skills to create a practical solution.`;

            updateArray(
                "projects",
                item.id,
                "description",
                description
            );
        } catch (error) {
            console.error(
                "Could not generate project description:",
                error
            );
            alert("Unable to generate the description. Please try again.");
        } finally {
            setGeneratingProjectId(null);
        }
    }

    // Save resume to localStorage
    function saveResume() {
        try {
            const resumes = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            const updatedResume = {
                ...resume,
                id,
                title: resume.name.trim()
                    ? `${resume.name}'s Resume`
                    : resume.title || "My Resume",
                updatedAt: new Date().toISOString(),
            };

            const exists = resumes.some(
                (item) => String(item.id) === String(id)
            );

            const updatedResumes = exists
                ? resumes.map((item) =>
                    String(item.id) === String(id)
                        ? updatedResume
                        : item
                )
                : [...resumes, updatedResume];

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedResumes)
            );

            setResume(updatedResume);
            setSaved(true);

            setTimeout(() => setSaved(false), 2500);
        } catch (error) {
            console.error("Could not save resume:", error);
            alert("Unable to save resume. Please try again.");
        }
    }

    // Save and open the browser print dialog
    function downloadPDF() {
        saveResume();

        setTimeout(() => {
            window.print();
        }, 300);
    }

    const tabs = [
        { id: "personal", label: "Personal", icon: User },
        { id: "education", label: "Education", icon: GraduationCap },
        {
            id: "experience",
            label: "Experience",
            icon: BriefcaseBusiness,
        },
        { id: "projects", label: "Projects", icon: Code },
        { id: "skills", label: "Skills", icon: Sparkles },
    ];

    return (
        <div className="builder-page">
            {/* Header */}
            <header className="builder-header no-print">
                <button
                    className="builder-back"
                    onClick={() => navigate("/dashboard")}
                    type="button"
                >
                    <ArrowLeft size={18} />
                    Dashboard
                </button>

                <div className="builder-brand">
                    <span className="builder-brand-icon">
                        <FileText size={19} />
                    </span>

                    <span>
                        Resume
                        <span className="builder-brand-highlight">AI</span>
                    </span>
                </div>

                <div className="builder-actions">
                    <button
                        className="builder-save-btn"
                        onClick={saveResume}
                        type="button"
                    >
                        <Save size={16} />
                        {saved ? "Saved!" : "Save"}
                    </button>

                    <button
                        className="builder-download-btn"
                        onClick={downloadPDF}
                        type="button"
                    >
                        <Download size={16} />
                        Download PDF
                    </button>
                </div>
            </header>

            {/* Page heading */}
            <div className="builder-heading no-print">
                <div>
                    <span className="builder-eyebrow">
                        <Sparkles size={14} />
                        YOUR CAREER, BEAUTIFULLY PRESENTED
                    </span>

                    <h1>
                        Build your <span>dream resume.</span>
                    </h1>

                    <p>
                        Add your details and watch your resume come to life.
                    </p>
                </div>

                <div className="builder-live-badge">
                    <span />
                    Live Preview
                </div>
            </div>

            <main className="builder-layout">
                {/* Resume form */}
                <section className="builder-form-panel no-print">
                    <div className="builder-panel-heading">
                        <div>
                            <h2>Resume details</h2>
                            <p>Fill in your information below.</p>
                        </div>

                        <span className="builder-sparkle">
                            <Sparkles size={19} />
                        </span>
                    </div>

                    {/* Tabs */}
                    <div className="builder-tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className={
                                        activeTab === tab.id
                                            ? "builder-tab active"
                                            : "builder-tab"
                                    }
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="builder-form-content">
                        {/* Personal information */}
                        {activeTab === "personal" && (
                            <>
                                <div className="builder-section-title">
                                    <h3>Personal information</h3>
                                    <p>Let employers know who you are.</p>
                                </div>

                                <Field
                                    label="Full name"
                                    value={resume.name}
                                    onChange={(value) =>
                                        updateField("name", value)
                                    }
                                    placeholder="e.g. Your Full Name"
                                />

                                <Field
                                    label="Professional title"
                                    value={resume.role}
                                    onChange={(value) =>
                                        updateField("role", value)
                                    }
                                    placeholder="e.g. Frontend Developer"
                                />

                                <div className="builder-field-grid">
                                    <Field
                                        label="Email"
                                        value={resume.email}
                                        onChange={(value) =>
                                            updateField("email", value)
                                        }
                                        placeholder="you@example.com"
                                        type="email"
                                    />

                                    <Field
                                        label="Phone"
                                        value={resume.phone}
                                        onChange={(value) =>
                                            updateField("phone", value)
                                        }
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <Field
                                    label="Location"
                                    value={resume.location}
                                    onChange={(value) =>
                                        updateField("location", value)
                                    }
                                    placeholder="City, Country"
                                />

                                <Field
                                    label="LinkedIn URL"
                                    value={resume.linkedin}
                                    onChange={(value) =>
                                        updateField("linkedin", value)
                                    }
                                    placeholder="linkedin.com/in/yourname"
                                />

                                <Field
                                    label="GitHub URL"
                                    value={resume.github}
                                    onChange={(value) =>
                                        updateField("github", value)
                                    }
                                    placeholder="github.com/yourname"
                                />

                                <Field
                                    label="Portfolio website"
                                    value={resume.website}
                                    onChange={(value) =>
                                        updateField("website", value)
                                    }
                                    placeholder="yourportfolio.com"
                                />

                                {/* Professional summary generator */}
                                <div className="summary-generator">
                                    <Field
                                        label="Professional summary"
                                        value={resume.summary}
                                        onChange={(value) =>
                                            updateField("summary", value)
                                        }
                                        placeholder="Write a short introduction about your skills, experience and career goals..."
                                        textarea
                                    />

                                    <button
                                        type="button"
                                        className="generate-summary-btn"
                                        onClick={generateSummary}
                                        disabled={isGeneratingSummary}
                                    >
                                        <Sparkles size={16} />
                                        {isGeneratingSummary
                                            ? "Generating summary..."
                                            : "Generate with AI"}
                                    </button>

                                    <p className="summary-generator-hint">
                                        Generate a summary from your resume
                                        details. You can edit the result anytime.
                                    </p>
                                </div>

                                <button
                                    className="builder-next-btn"
                                    type="button"
                                    onClick={() => setActiveTab("education")}
                                >
                                    Continue to Education →
                                </button>
                            </>
                        )}

                        {/* Education */}
                        {activeTab === "education" && (
                            <>
                                <div className="builder-section-title">
                                    <h3>Education</h3>
                                    <p>Add your academic qualifications.</p>
                                </div>

                                {resume.education.map((item, index) => (
                                    <div
                                        className="builder-entry"
                                        key={item.id}
                                    >
                                        <div className="builder-entry-heading">
                                            <strong>
                                                Education {index + 1}
                                            </strong>

                                            {resume.education.length > 1 && (
                                                <button
                                                    className="builder-delete-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(
                                                            "education",
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            )}
                                        </div>

                                        <Field
                                            label="Degree / Course"
                                            value={item.degree}
                                            onChange={(value) =>
                                                updateArray(
                                                    "education",
                                                    item.id,
                                                    "degree",
                                                    value
                                                )
                                            }
                                            placeholder="B.Tech Computer Science"
                                        />

                                        <Field
                                            label="College / University"
                                            value={item.college}
                                            onChange={(value) =>
                                                updateArray(
                                                    "education",
                                                    item.id,
                                                    "college",
                                                    value
                                                )
                                            }
                                            placeholder="Your college name"
                                        />

                                        <div className="builder-field-grid">
                                            <Field
                                                label="Year / Duration"
                                                value={item.year}
                                                onChange={(value) =>
                                                    updateArray(
                                                        "education",
                                                        item.id,
                                                        "year",
                                                        value
                                                    )
                                                }
                                                placeholder="2024–2028"
                                            />

                                            <Field
                                                label="CGPA / Percentage"
                                                value={item.score}
                                                onChange={(value) =>
                                                    updateArray(
                                                        "education",
                                                        item.id,
                                                        "score",
                                                        value
                                                    )
                                                }
                                                placeholder="8.5 CGPA"
                                            />
                                        </div>
                                    </div>
                                ))}

                                <AddButton
                                    onClick={() =>
                                        addItem("education", {
                                            degree: "",
                                            college: "",
                                            year: "",
                                            score: "",
                                        })
                                    }
                                >
                                    Add Education
                                </AddButton>

                                <button
                                    className="builder-next-btn"
                                    type="button"
                                    onClick={() => setActiveTab("experience")}
                                >
                                    Continue to Experience →
                                </button>
                            </>
                        )}

                        {/* Experience */}
                        {activeTab === "experience" && (
                            <>
                                <div className="builder-section-title">
                                    <h3>Experience</h3>
                                    <p>
                                        Add internships, jobs or relevant
                                        experience.
                                    </p>
                                </div>

                                {resume.experience.map((item, index) => (
                                    <div
                                        className="builder-entry"
                                        key={item.id}
                                    >
                                        <div className="builder-entry-heading">
                                            <strong>
                                                Experience {index + 1}
                                            </strong>

                                            {resume.experience.length > 1 && (
                                                <button
                                                    className="builder-delete-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(
                                                            "experience",
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            )}
                                        </div>

                                        <Field
                                            label="Job title"
                                            value={item.position}
                                            onChange={(value) =>
                                                updateArray(
                                                    "experience",
                                                    item.id,
                                                    "position",
                                                    value
                                                )
                                            }
                                            placeholder="Frontend Developer Intern"
                                        />

                                        <Field
                                            label="Company"
                                            value={item.company}
                                            onChange={(value) =>
                                                updateArray(
                                                    "experience",
                                                    item.id,
                                                    "company",
                                                    value
                                                )
                                            }
                                            placeholder="Company name"
                                        />

                                        <Field
                                            label="Duration"
                                            value={item.duration}
                                            onChange={(value) =>
                                                updateArray(
                                                    "experience",
                                                    item.id,
                                                    "duration",
                                                    value
                                                )
                                            }
                                            placeholder="June 2026 – August 2026"
                                        />

                                        <Field
                                            label="Responsibilities and achievements"
                                            value={item.description}
                                            onChange={(value) =>
                                                updateArray(
                                                    "experience",
                                                    item.id,
                                                    "description",
                                                    value
                                                )
                                            }
                                            placeholder="Describe your work and achievements..."
                                            textarea
                                        />
                                    </div>
                                ))}

                                <AddButton
                                    onClick={() =>
                                        addItem("experience", {
                                            company: "",
                                            position: "",
                                            duration: "",
                                            description: "",
                                        })
                                    }
                                >
                                    Add Experience
                                </AddButton>

                                <button
                                    className="builder-next-btn"
                                    type="button"
                                    onClick={() => setActiveTab("projects")}
                                >
                                    Continue to Projects →
                                </button>
                            </>
                        )}

                        {/* Projects */}
                        {activeTab === "projects" && (
                            <>
                                <div className="builder-section-title">
                                    <h3>Projects</h3>
                                    <p>Showcase what you have built.</p>
                                </div>

                                {resume.projects.map((item, index) => (
                                    <div
                                        className="builder-entry"
                                        key={item.id}
                                    >
                                        <div className="builder-entry-heading">
                                            <strong>
                                                Project {index + 1}
                                            </strong>

                                            {resume.projects.length > 1 && (
                                                <button
                                                    className="builder-delete-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(
                                                            "projects",
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            )}
                                        </div>

                                        <Field
                                            label="Project name"
                                            value={item.name}
                                            onChange={(value) =>
                                                updateArray(
                                                    "projects",
                                                    item.id,
                                                    "name",
                                                    value
                                                )
                                            }
                                            placeholder="AI Resume Builder"
                                        />

                                        <Field
                                            label="Technologies used"
                                            value={item.technologies}
                                            onChange={(value) =>
                                                updateArray(
                                                    "projects",
                                                    item.id,
                                                    "technologies",
                                                    value
                                                )
                                            }
                                            placeholder="React, JavaScript, CSS"
                                        />

                                        {/* Project description generator */}
                                        <div className="summary-generator">
                                            <Field
                                                label="Description"
                                                value={item.description}
                                                onChange={(value) =>
                                                    updateArray(
                                                        "projects",
                                                        item.id,
                                                        "description",
                                                        value
                                                    )
                                                }
                                                placeholder="What does your project do?"
                                                textarea
                                            />

                                            <button
                                                type="button"
                                                className="generate-summary-btn"
                                                onClick={() =>
                                                    generateProjectDescription(item)
                                                }
                                                disabled={
                                                    generatingProjectId === item.id
                                                }
                                            >
                                                <Sparkles size={16} />
                                                {generatingProjectId === item.id
                                                    ? "Generating description..."
                                                    : "Generate with AI"}
                                            </button>

                                            <p className="summary-generator-hint">
                                                Create a project description
                                                from your project name and
                                                technologies. Edit it anytime.
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <AddButton
                                    onClick={() =>
                                        addItem("projects", {
                                            name: "",
                                            description: "",
                                            technologies: "",
                                        })
                                    }
                                >
                                    Add Project
                                </AddButton>

                                <button
                                    className="builder-next-btn"
                                    type="button"
                                    onClick={() => setActiveTab("skills")}
                                >
                                    Continue to Skills →
                                </button>
                            </>
                        )}

                        {/* Skills and achievements */}
                        {activeTab === "skills" && (
                            <>
                                <div className="builder-section-title">
                                    <h3>Skills & achievements</h3>
                                    <p>
                                        Highlight what makes you stand out.
                                    </p>
                                </div>

                                <Field
                                    label="Technical and soft skills"
                                    value={resume.skills}
                                    onChange={(value) =>
                                        updateField("skills", value)
                                    }
                                    placeholder="React, JavaScript, Java, Communication, Teamwork"
                                    textarea
                                />

                                <Field
                                    label="Certifications"
                                    value={resume.certifications}
                                    onChange={(value) =>
                                        updateField("certifications", value)
                                    }
                                    placeholder="Certification name, issuer and year"
                                    textarea
                                />

                                <Field
                                    label="Achievements"
                                    value={resume.achievements}
                                    onChange={(value) =>
                                        updateField("achievements", value)
                                    }
                                    placeholder="Awards, hackathons, competitions..."
                                    textarea
                                />

                                <div className="builder-tip">
                                    <Sparkles size={18} />

                                    <div>
                                        <strong>
                                            Make your resume shine!
                                        </strong>
                                        <p>
                                            Use specific achievements and
                                            action words. Keep your information
                                            accurate and relevant.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="builder-next-btn"
                                    type="button"
                                    onClick={saveResume}
                                >
                                    <Save size={16} />
                                    Save My Resume
                                </button>
                            </>
                        )}
                    </div>
                </section>

                {/* Live resume preview */}
                <section className="builder-preview-panel">
                    <div className="preview-toolbar no-print">
                        <div>
                            <Eye size={17} />
                            <span>Live Preview</span>
                        </div>

                        <span className="preview-page-label">
                            A4 DOCUMENT
                        </span>
                    </div>

                    <article className="resume-document">
                        <div className="document-header">
                            <h1>{resume.name || "Your Name"}</h1>

                            <p className="document-role">
                                {resume.role || "Your Professional Title"}
                            </p>

                            <div className="document-contact">
                                {[
                                    resume.email,
                                    resume.phone,
                                    resume.location,
                                ]
                                    .filter(Boolean)
                                    .join("  •  ")}
                            </div>

                            <div className="document-links">
                                {[
                                    resume.linkedin,
                                    resume.github,
                                    resume.website,
                                ]
                                    .filter(Boolean)
                                    .map((link) => (
                                        <span key={link}>{link}</span>
                                    ))}
                            </div>
                        </div>

                        {resume.summary && (
                            <DocumentSection title="Professional Summary">
                                <p>{resume.summary}</p>
                            </DocumentSection>
                        )}

                        <DocumentSection title="Education">
                            {resume.education
                                .filter(
                                    (item) =>
                                        item.degree ||
                                        item.college ||
                                        item.year ||
                                        item.score
                                )
                                .map((item) => (
                                    <div
                                        className="document-entry"
                                        key={item.id}
                                    >
                                        <div className="document-entry-top">
                                            <strong>
                                                {item.degree || "Degree / Course"}
                                            </strong>
                                            <span>{item.year}</span>
                                        </div>

                                        {item.college && <p>{item.college}</p>}

                                        {item.score && (
                                            <p>Score: {item.score}</p>
                                        )}
                                    </div>
                                ))}

                            {!resume.education.some(
                                (item) =>
                                    item.degree ||
                                    item.college ||
                                    item.year ||
                                    item.score
                            ) && (
                                    <p className="document-placeholder">
                                        Your education details will appear here.
                                    </p>
                                )}
                        </DocumentSection>

                        {resume.experience.some(
                            (item) =>
                                item.position ||
                                item.company ||
                                item.description
                        ) && (
                                <DocumentSection title="Experience">
                                    {resume.experience
                                        .filter(
                                            (item) =>
                                                item.position ||
                                                item.company ||
                                                item.description
                                        )
                                        .map((item) => (
                                            <div
                                                className="document-entry"
                                                key={item.id}
                                            >
                                                <div className="document-entry-top">
                                                    <strong>
                                                        {item.position || item.company}
                                                    </strong>
                                                    <span>{item.duration}</span>
                                                </div>

                                                {item.company && <p>{item.company}</p>}

                                                {item.description && (
                                                    <p>{item.description}</p>
                                                )}
                                            </div>
                                        ))}
                                </DocumentSection>
                            )}

                        {resume.projects.some(
                            (item) => item.name || item.description
                        ) && (
                                <DocumentSection title="Projects">
                                    {resume.projects
                                        .filter(
                                            (item) => item.name || item.description
                                        )
                                        .map((item) => (
                                            <div
                                                className="document-entry"
                                                key={item.id}
                                            >
                                                <strong>
                                                    {item.name || "Project"}
                                                </strong>

                                                {item.description && (
                                                    <p>{item.description}</p>
                                                )}

                                                {item.technologies && (
                                                    <p>
                                                        <strong>Technologies: </strong>
                                                        {item.technologies}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                </DocumentSection>
                            )}

                        {resume.skills && (
                            <DocumentSection title="Skills">
                                <p>{resume.skills}</p>
                            </DocumentSection>
                        )}

                        {resume.certifications && (
                            <DocumentSection title="Certifications">
                                <p>{resume.certifications}</p>
                            </DocumentSection>
                        )}

                        {resume.achievements && (
                            <DocumentSection title="Achievements">
                                <p>{resume.achievements}</p>
                            </DocumentSection>
                        )}
                    </article>

                    <div className="preview-note no-print">
                        <Sparkles size={15} />
                        Your preview updates as you type.
                    </div>
                </section>
            </main>
        </div>
    );
}

// Reusable input component
function Field({
    label,
    value,
    onChange,
    placeholder,
    textarea = false,
    type = "text",
}) {
    return (
        <label className="builder-field">
            <span>{label}</span>

            {textarea ? (
                <textarea
                    value={value || ""}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    rows={4}
                />
            ) : (
                <input
                    type={type}
                    value={value || ""}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                />
            )}
        </label>
    );
}

// Reusable add-entry button
function AddButton({ onClick, children }) {
    return (
        <button
            className="builder-add-btn"
            onClick={onClick}
            type="button"
        >
            <Plus size={16} />
            {children}
        </button>
    );
}

// Reusable resume preview section
function DocumentSection({ title, children }) {
    return (
        <section className="document-section">
            <h2>{title}</h2>
            {children}
        </section>
    );
}