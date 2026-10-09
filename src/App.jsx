import ResumeBuilder from "./ResumeBuilder";
import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Palette,
  Download,
  ShieldCheck,
  Zap,
  LayoutTemplate,
  Menu,
  X,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowLeft,
  Search,
  Copy,
  Trash2,
} from "lucide-react";

/* =========================
   NAVBAR
========================= */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">R</span>
          Resume<span>AI</span>
        </Link>

        <div className={`nav-links ${open ? "mobile-open" : ""}`}>
          <a href="#features" onClick={() => setOpen(false)}>
            Features
          </a>
          <a href="#templates" onClick={() => setOpen(false)}>
            Templates
          </a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>
            How It Works
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>

          <div className="nav-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="primary-btn small">
              Get Started
            </Link>
          </div>
        </div>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

/* =========================
   HERO
========================= */

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-circle circle-one"></div>
      <div className="hero-bg-circle circle-two"></div>

      <div className="hero-content">
        <div className="badge">
          <Sparkles size={15} />
          AI-Powered Resume Builder
        </div>

        <h1>
          Build a Resume That
          <span> Gets You Noticed.</span>
        </h1>

        <p>
          Create a professional, ATS-friendly resume in minutes.
          Choose a beautiful template, add your experience and let
          AI help you make your resume stronger.
        </p>

        <div className="hero-buttons">
          <Link to="/signup" className="primary-btn hero-btn">
            Create My Resume
            <ArrowRight size={18} />
          </Link>

          <a href="#templates" className="secondary-btn">
            Explore Templates
          </a>
        </div>

        <div className="hero-trust">
          <div>
            <CheckCircle2 size={17} />
            Free to start
          </div>
          <div>
            <CheckCircle2 size={17} />
            ATS-friendly
          </div>
          <div>
            <CheckCircle2 size={17} />
            No design skills needed
          </div>
        </div>
      </div>

      <div className="hero-preview">
        <div className="resume-window">
          <div className="window-top">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="window-title">Resume Preview</div>
          </div>

          <div className="fake-resume">
            <div className="resume-header">
              <div className="fake-avatar">K</div>
              <div>
                <div className="fake-name">Your Name</div>
                <div className="fake-role">Software Developer</div>
              </div>
            </div>

            <div className="fake-contact">
              your.email@example.com • India
            </div>

            <div className="fake-line"></div>

            <div className="fake-section-title">PROFILE</div>
            <div className="fake-text long"></div>
            <div className="fake-text"></div>

            <div className="fake-section-title">EDUCATION</div>
            <div className="fake-job">
              <div className="fake-text medium"></div>
              <div className="fake-text small"></div>
              <div className="fake-text long"></div>
            </div>

            <div className="fake-section-title">SKILLS</div>
            <div className="fake-skills">
              <span>React</span>
              <span>JavaScript</span>
              <span>Java</span>
              <span>UI/UX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   FEATURES
========================= */

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Writing",
    text: "Generate professional summaries and improve your resume content.",
  },
  {
    icon: LayoutTemplate,
    title: "Beautiful Templates",
    text: "Choose from modern, classic and minimal resume templates.",
  },
  {
    icon: Zap,
    title: "Live Preview",
    text: "See your resume update instantly while editing.",
  },
  {
    icon: Palette,
    title: "Customize Your Style",
    text: "Create a resume that reflects your professional personality.",
  },
  {
    icon: Download,
    title: "PDF Ready",
    text: "Print or save your finished resume as a PDF.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Friendly",
    text: "Create clean and readable resumes for job applications.",
  },
];

function Features() {
  return (
    <section className="section" id="features">
      <div className="section-heading">
        <div className="section-badge">POWERFUL FEATURES</div>

        <h2>
          Everything You Need to Build
          <span> Your Best Resume</span>
        </h2>

        <p>
          Create, customize and download a professional resume
          using simple and powerful tools.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">
                <Icon size={23} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================
   TEMPLATES
========================= */

function TemplateCard({ type, title }) {
  return (
    <div className="template-card">
      <div className={`template-paper ${type}`}>
        <div className="paper-name"></div>
        <div className="paper-role"></div>
        <div className="paper-section"></div>
        <div className="paper-line"></div>
        <div className="paper-line"></div>
        <div className="paper-section"></div>
        <div className="paper-line"></div>
        <div className="paper-line"></div>
        <div className="paper-line short"></div>
      </div>

      <div className="template-info">
        <div>
          <h3>{title}</h3>
          <p>Professional resume template</p>
        </div>
        <span className="template-arrow">
          <ArrowRight size={18} />
        </span>
      </div>
    </div>
  );
}

function Templates() {
  return (
    <section className="section templates-section" id="templates">
      <div className="section-heading">
        <div className="section-badge">RESUME TEMPLATES</div>

        <h2>
          Designed to Make You
          <span> Stand Out</span>
        </h2>

        <p>
          Choose a professionally designed template for your career.
        </p>
      </div>

      <div className="template-grid">
        <TemplateCard type="modern-paper" title="Modern" />
        <TemplateCard type="classic-paper" title="Classic" />
        <TemplateCard type="minimal-paper" title="Minimal" />
      </div>
    </section>
  );
}

/* =========================
   HOW IT WORKS
========================= */

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Enter Your Details",
      text: "Add your education, experience, skills and projects.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "Improve Your Content",
      text: "Use writing suggestions to improve your resume.",
    },
    {
      number: "03",
      icon: Palette,
      title: "Choose Your Style",
      text: "Select a template and personalize your resume.",
    },
    {
      number: "04",
      icon: Download,
      title: "Download & Apply",
      text: "Save your resume as a PDF and apply for jobs.",
    },
  ];

  return (
    <section className="section how-section" id="how-it-works">
      <div className="section-heading">
        <div className="section-badge">HOW IT WORKS</div>
        <h2>
          Your Resume in
          <span> 4 Simple Steps</span>
        </h2>
      </div>

      <div className="steps-grid">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">
                <Icon size={24} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================
   CTA
========================= */

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <div className="cta-icon">
          <Sparkles size={25} />
        </div>

        <h2>Ready to Build Your Next Resume?</h2>

        <p>
          Create a professional resume that represents your skills,
          experience and potential.
        </p>

        <Link to="/signup" className="primary-btn hero-btn">
          Start Building Free
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer id="contact">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">R</span>
            Resume<span>AI</span>
          </Link>
          <p>Build better resumes. Get noticed faster.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="mailto:support@resumeai.com">
              support@resumeai.com
            </a>
            <a href="mailto:support@resumeai.com">Help Center</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ResumeAI. All rights reserved.</span>
        <span>Made with ❤️ for job seekers.</span>
      </div>
    </footer>
  );
}

/* =========================
   LANDING PAGE
========================= */

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}

/* =========================
   AUTH LAYOUT
========================= */

function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="logo">
          <span className="logo-icon">R</span>
          Resume<span>AI</span>
        </Link>

        <div className="auth-left-content">
          <div className="auth-big-icon">
            <Sparkles size={30} />
          </div>

          <h1>
            Build a Resume
            <span> You're Proud Of.</span>
          </h1>

          <p>
            Create professional, modern and ATS-friendly resumes
            with the power of AI.
          </p>

          <div className="auth-points">
            <div>
              <CheckCircle2 size={18} />
              Professional templates
            </div>
            <div>
              <CheckCircle2 size={18} />
              AI-powered suggestions
            </div>
            <div>
              <CheckCircle2 size={18} />
              Easy PDF export
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
}

/* =========================
   REUSABLE INPUT
========================= */

function Input({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);

  const actualType =
    type === "password"
      ? show
        ? "text"
        : "password"
      : type;

  return (
    <div className="auth-input-wrapper">
      <Icon size={18} />

      <input
        type={actualType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />

      {type === "password" && (
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShow(!show)}
          aria-label="Toggle password visibility"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

/* =========================
   LOGIN
========================= */

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    localStorage.setItem("resumeai_logged", "true");

    const existingUser = JSON.parse(
      localStorage.getItem("resumeai_user") || "{}"
    );

    localStorage.setItem(
      "resumeai_user",
      JSON.stringify({
        name: existingUser.name || email.split("@")[0],
        email,
      })
    );

    navigate("/dashboard");
  }

  return (
    <AuthLayout>
      <div className="auth-box">
        <Link to="/" className="mobile-auth-logo">
          <span className="logo-icon">R</span>
          Resume<span>AI</span>
        </Link>

        <div className="auth-heading">
          <h2>Welcome Back 👋</h2>
          <p>Sign in to continue building your resume.</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <Input
            icon={Mail}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-label">
            <label>Password</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Input
            icon={Lock}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-submit" type="submit">
            Login
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

/* =========================
   SIGNUP
========================= */

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    localStorage.setItem(
      "resumeai_user",
      JSON.stringify({ name, email })
    );

    localStorage.setItem("resumeai_logged", "true");

    navigate("/dashboard");
  }

  return (
    <AuthLayout>
      <div className="auth-box">
        <Link to="/" className="mobile-auth-logo">
          <span className="logo-icon">R</span>
          Resume<span>AI</span>
        </Link>

        <div className="auth-heading">
          <h2>Create Your Account ✨</h2>
          <p>Start building your professional resume today.</p>
        </div>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <Input
            icon={User}
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>
          <Input
            icon={Mail}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <Input
            icon={Lock}
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="terms">
            <input type="checkbox" required />
            <span>I agree to the Terms & Privacy Policy</span>
          </div>

          <button className="auth-submit" type="submit">
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

/* =========================
   FORGOT PASSWORD
========================= */

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <AuthLayout>
      <div className="auth-box">
        <Link to="/login" className="back-link">
          <ArrowLeft size={17} />
          Back to Login
        </Link>

        {!sent ? (
          <>
            <div className="auth-heading">
              <div className="forgot-icon">
                <Lock size={25} />
              </div>
              <h2>Forgot Password?</h2>
              <p>Enter your email to continue with password recovery.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Email Address</label>
              <Input
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="auth-submit" type="submit">
                Continue
                <ArrowRight size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="success-box">
            <div className="success-icon">
              <CheckCircle2 size={35} />
            </div>

            <h2>Request Received</h2>
            <p>
              This is a demo feature. No password reset email has
              actually been sent to <strong>{email}</strong>.
            </p>

            <Link to="/login" className="auth-submit">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
/* =========================
   DASHBOARD
========================= */

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("resumeai_user") || "{}"
  );

  const [search, setSearch] = useState("");

  const [resumes, setResumes] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("resumeai_resumes") || "[]"
      );
    } catch {
      return [];
    }
  });

  // Save resumes in state and localStorage
  function saveResumes(data) {
    setResumes(data);

    localStorage.setItem(
      "resumeai_resumes",
      JSON.stringify(data)
    );
  }

  // Create a new resume and open the builder
  function createResume() {
    const newResume = {
      id: Date.now().toString(),
      title: "My Resume",
      name: user.name || "",
      role: "",
      email: user.email || "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
      summary: "",

      education: [
        {
          id: 1,
          degree: "",
          college: "",
          year: "",
          score: "",
        },
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

      projects: [
        {
          id: 1,
          name: "",
          description: "",
          technologies: "",
        },
      ],

      skills: "",
      certifications: "",
      achievements: "",

      template: "modern",
      createdAt: new Date().toISOString(),
      updated: new Date().toLocaleDateString(),
    };

    const updatedResumes = [newResume, ...resumes];

    saveResumes(updatedResumes);

    navigate(`/builder/${newResume.id}`);
  }

  // Open an existing resume
  function editResume(id) {
    navigate(`/builder/${id}`);
  }

  // Delete a resume
  function deleteResume(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    const updatedResumes = resumes.filter(
      (resume) => String(resume.id) !== String(id)
    );

    saveResumes(updatedResumes);
  }

  // Duplicate a resume
  function duplicateResume(resume) {
    const copy = {
      ...resume,
      id: Date.now().toString(),
      title: `${resume.title || "My Resume"} Copy`,
      createdAt: new Date().toISOString(),
      updated: new Date().toLocaleDateString(),
    };

    saveResumes([copy, ...resumes]);

    alert("Resume duplicated successfully! 💗");
  }

  // Logout
  function logout() {
    localStorage.removeItem("resumeai_logged");
    navigate("/login");
  }

  // Search resumes
  const filteredResumes = resumes.filter((resume) => {
    const title = resume.title || "Untitled Resume";
    const name = resume.name || resume.personal?.name || "";

    const query = search.toLowerCase();

    return (
      title.toLowerCase().includes(query) ||
      name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <Link to="/" className="dashboard-logo">
          <span className="logo-icon">R</span>
          Resume<span>AI</span>
        </Link>

        <div className="sidebar-menu">

          <div className="sidebar-item active">
            <LayoutTemplate size={18} />
            Dashboard
          </div>

          <button
            type="button"
            className="sidebar-item"
            onClick={createResume}
          >
            <FileText size={18} />
            Create Resume
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() =>
              alert(
                `Name: ${user.name || "User"}\nEmail: ${user.email || "Not set"
                }`
              )
            }
          >
            <User size={18} />
            Profile
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() =>
              alert(
                "Your resumes are currently saved in this browser."
              )
            }
          >
            <ShieldCheck size={18} />
            Settings
          </button>

        </div>

        <div className="sidebar-bottom">

          <div className="sidebar-user">
            <div className="user-avatar">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.name || "User"}</strong>
              <small>{user.email || ""}</small>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            <ArrowLeft size={17} />
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN DASHBOARD */}
      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <p className="dashboard-welcome">
              Welcome back 👋
            </p>

            <h1>Your Resume Dashboard</h1>

            <p>
              Create, edit and manage your professional resumes.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={createResume}
          >
            <FileText size={17} />
            Create Resume
          </button>
        </header>

        {/* STATISTICS */}
        <div className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon purple">
              <FileText size={21} />
            </div>

            <div>
              <span>Total Resumes</span>
              <strong>{resumes.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Saved Resumes</span>
              <strong>{resumes.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <Sparkles size={21} />
            </div>

            <div>
              <span>Resume Templates</span>
              <strong>3</strong>
            </div>
          </div>

        </div>

        {/* RESUME SECTION */}
        <section className="resume-section">

          <div className="resume-section-header">

            <div>
              <h2>My Resumes</h2>
              <p>
                Manage your resume drafts from one place.
              </p>
            </div>

            <div className="resume-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search resumes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          {/* EMPTY STATE */}
          {filteredResumes.length === 0 ? (

            <div className="empty-resumes">

              <div className="empty-icon">
                <FileText size={30} />
              </div>

              <h3>
                {search ? "No matching resumes" : "No resumes yet"}
              </h3>

              <p>
                {search
                  ? "Try searching with a different title or name."
                  : "Create your first resume and start building your professional profile."}
              </p>

              {!search && (
                <button
                  className="primary-btn"
                  onClick={createResume}
                >
                  <FileText size={17} />
                  Create Your First Resume
                </button>
              )}

            </div>

          ) : (

            /* RESUME CARDS */
            <div className="resume-grid">

              {filteredResumes.map((resume) => (

                <div className="resume-card" key={resume.id}>

                  <div className="resume-thumbnail">

                    <div className="mini-paper">

                      <div className="mini-name"></div>
                      <div className="mini-role"></div>

                      <div className="mini-heading"></div>
                      <div className="mini-line"></div>
                      <div className="mini-line"></div>
                      <div className="mini-line short"></div>

                      <div className="mini-heading"></div>
                      <div className="mini-line"></div>
                      <div className="mini-line"></div>

                    </div>

                  </div>

                  <div className="resume-card-body">

                    <div className="resume-card-info">
                      <h3>
                        {resume.title || "Untitled Resume"}
                      </h3>

                      <p>
                        {resume.name || resume.personal?.name || "Add your name"}
                      </p>

                      <p>
                        Updated {resume.updated || "Recently"}
                      </p>
                    </div>

                    <div className="resume-actions">

                      {/* EDIT / VIEW */}
                      <button
                        type="button"
                        title="Edit resume"
                        onClick={() => editResume(resume.id)}
                      >
                        <Eye size={16} />
                      </button>

                      {/* DUPLICATE */}
                      <button
                        type="button"
                        title="Duplicate resume"
                        onClick={() => duplicateResume(resume)}
                      >
                        <Copy size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        title="Delete resume"
                        className="delete-action"
                        onClick={() => deleteResume(resume.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                    {/* EDIT BUTTON */}
                    <button
                      type="button"
                      className="primary-btn small resume-edit-btn"
                      onClick={() => editResume(resume.id)}
                    >
                      Edit Resume
                      <ArrowRight size={15} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}
/* =========================
   MAIN APP
========================= */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/builder/:id"
        element={<ResumeBuilder />}
      />

      <Route
        path="*"
        element={
          <div style={{ padding: "60px", textAlign: "center" }}>
            <h1>Page not found</h1>
            <Link to="/">Return Home</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;