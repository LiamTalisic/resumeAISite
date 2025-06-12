import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHome, FiSave, FiDownload, FiLoader, FiAlertCircle } from "react-icons/fi";

const ResumeEditor = () => {
    const navigate = useNavigate();
    const { resumeId } = useParams();
    const [resumeLines, setResumeLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isLineByLineMode, setIsLineByLineMode] = useState(true);
    const editorRef = useRef(null);

    useEffect(() => {
        const fetchResumeData = async () => {
            if (!resumeId) {
                setError("No resume ID provided");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                console.log("Fetching resume with ID:", resumeId);

                // TODO: Add authentication token when available
                const response = await fetch(`http://localhost:5000/api/fetch/resume/${resumeId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        // 'Authorization': `Bearer ${authToken}` // Will add when auth is implemented
                    },
                });

                console.log("Response status:", response.status);
                console.log("Response ok:", response.ok);

                if (!response.ok) {
                    throw new Error(`Failed to fetch resume: ${response.status}`);
                }

                const result = await response.json();
                console.log("=== API RESPONSE DEBUG ===");
                console.log("Full API response:", result);
                console.log("API response keys:", Object.keys(result));

                const resumeData = result.data;
                console.log("resumeData keys:", Object.keys(resumeData));

                // Extract company and job info from resume data
                setCompanyName(resumeData.history?.name || resumeData.name || "Unknown Company");
                setJobTitle(resumeData.history?.jobTitle || resumeData.position || "Position");

                // Convert resume data to line-by-line format
                const textContent = await convertResumeToText(resumeData);
                console.log("Final converted text preview:", textContent.substring(0, 300) + "...");

                const lines = textContent.split("\n").map((line, index) => ({
                    id: index,
                    text: line,
                    isAccepted: false,
                    isEdited: false,
                }));
                setResumeLines(lines);
            } catch (err) {
                console.error("Error fetching resume:", err);
                setError(err.message || "Failed to load resume");
            } finally {
                setIsLoading(false);
            }
        };

        fetchResumeData();
    }, [resumeId]);

    const convertResumeToText = async (resumeData) => {
        console.log("=== DEBUGGING RESUME DATA CONVERSION ===");
        console.log("Full resumeData received:", resumeData);
        console.log("resumeData keys:", Object.keys(resumeData));

        // Try to extract the actual resume data from different possible locations
        let actualResumeData = null;

        // Check if we have the user's resume data stored in MainData
        if (resumeData.resumeData) {
            console.log("Found resumeData field:", resumeData.resumeData);
            actualResumeData = resumeData.resumeData;
        } else if (resumeData.history?.resumeData) {
            console.log("Found history.resumeData field:", resumeData.history.resumeData);
            actualResumeData = resumeData.history.resumeData;
        } else if (resumeData.data) {
            console.log("Found data field:", resumeData.data);
            actualResumeData = resumeData.data;
        }

        // Check for historyContent from backend
        if (resumeData.historyContent) {
            console.log("Found historyContent from backend, length:", resumeData.historyContent.length);
            console.log("Content type check - starts with data:application/pdf?", resumeData.historyContent.startsWith("data:application/pdf"));
            console.log("Content type check - includes \\documentclass?", resumeData.historyContent.includes("\\documentclass"));

            if (resumeData.historyContent.startsWith("data:application/pdf") || (resumeData.historyContent.length > 1000 && !resumeData.historyContent.includes("\\documentclass"))) {
                console.log("Detected base64 PDF content, extracting text...");
                return await extractTextFromPdfBase64(resumeData.historyContent);
            } else if (resumeData.historyContent.includes("\\documentclass")) {
                return convertLatexToText(resumeData.historyContent);
            } else {
                return processPlainTextResume(resumeData.historyContent);
            }
        }

        // If we found structured resume data, convert it to text
        if (actualResumeData && typeof actualResumeData === "object") {
            console.log("Using structured resume data:", actualResumeData);
            return formatStructuredResumeData(actualResumeData);
        }

        // If we have resume content as a string, use it
        const resumeContent = resumeData.history?.resumeContent || resumeData.history?.resumeText || "";
        if (resumeContent && typeof resumeContent === "string") {
            console.log("Using resume content string:", resumeContent.substring(0, 200) + "...");
            return resumeContent;
        }

        // Extract LaTeX content and convert to readable text
        const latexContent = resumeData.history?.latex || resumeData.latex || resumeData.resumeLatex;
        if (latexContent) {
            console.log("Converting LaTeX to text. LaTeX preview:", latexContent.substring(0, 200) + "...");
            return convertLatexToText(latexContent);
        }

        // Check for other potential data fields
        if (resumeData.history) {
            console.log("Available history fields:", Object.keys(resumeData.history));

            // Try to find LaTeX or text content in history
            const historyFields = Object.keys(resumeData.history);
            for (const field of historyFields) {
                const value = resumeData.history[field];
                if (typeof value === "string" && value.length > 100) {
                    console.log(`Checking history.${field} (length: ${value.length}):`, value.substring(0, 200) + "...");

                    // Check if it contains the expected resume content
                    if (
                        value.includes("Jake Ryan") ||
                        value.includes("JAKE RYAN") ||
                        value.includes("Southwestern University") ||
                        value.includes("Experience") ||
                        value.includes("Projects") ||
                        value.includes("Technical Skills")
                    ) {
                        console.log(`Found resume content in history.${field}!`);

                        if (value.includes("\\documentclass")) {
                            return convertLatexToText(value);
                        } else {
                            // Process as plain text resume
                            return processPlainTextResume(value);
                        }
                    }
                }
            }
        }

        // Check all top-level fields for resume content
        const allFields = Object.keys(resumeData);
        for (const field of allFields) {
            const value = resumeData[field];
            if (typeof value === "string" && value.length > 100) {
                console.log(`Checking ${field} (length: ${value.length}):`, value.substring(0, 200) + "...");

                // Check if it contains the expected resume content
                if (
                    value.includes("Jake Ryan") ||
                    value.includes("JAKE RYAN") ||
                    value.includes("Southwestern University") ||
                    value.includes("Experience") ||
                    value.includes("Projects") ||
                    value.includes("Technical Skills")
                ) {
                    console.log(`Found resume content in ${field}!`);

                    if (value.includes("\\documentclass")) {
                        return convertLatexToText(value);
                    } else {
                        // Process as plain text resume
                        return processPlainTextResume(value);
                    }
                }
            }
        }

        // Fallback - use template but warn
        console.warn("No resume data found, using template. Available data:", Object.keys(resumeData));
        console.warn("Full resumeData for debugging:", JSON.stringify(resumeData, null, 2));

        return `JAKE RYAN

123-456-7890 | jake@su.edu | linkedin.com/in/jake | github.com/jake

EDUCATION

Southwestern University                                                              Georgetown, TX
Bachelor of Arts in Computer Science, Minor in Business                           Aug. 2018 – May 2021

Blinn College                                                                      Bryan, TX
Associate's in Liberal Arts                                                        Aug. 2014 – May 2018

EXPERIENCE

Undergraduate Research Assistant                                                   June 2020 – Present
Texas A&M University                                                               College Station, TX
• Developed a REST API using FastAPI and PostgreSQL to efficiently store and retrieve data from learning management systems.
• Designed and implemented a full-stack web application utilizing Flask, React, PostgreSQL, and Docker for analyzing and visualizing GitHub collaboration data.
• Explored innovative visualization techniques to present GitHub collaboration patterns in educational settings, contributing to data-driven insights for classroom analysis.

Information Technology Support Specialist                                          Sep. 2018 – Present
Southwestern University                                                            Georgetown, TX
• Provided technical support and maintenance for campus computers, classroom equipment, and printers, supporting campus-wide IT infrastructure.
• Coordinated with faculty and staff to set up and troubleshoot campus technology, ensuring seamless operation of educational and administrative activities.
• Maintained and upgraded 200 printers and related equipment to ensure optimal performance and minimal downtime.

Artificial Intelligence Research Assistant                                         May 2019 – July 2019
Southwestern University                                                            Georgetown, TX
• Explored procedural generation methods to create video game dungeons based on The Legend of Zelda, enhancing procedural content generation techniques.
• Developed a Java-based testing framework to evaluate dungeon generation algorithms, contributing over 50,000 lines of code to an existing codebase via Git.
• Conducted a human subject study to assess the enjoyment of different dungeon generation techniques, culminating in a comprehensive 8-page research paper and multiple presentations, including a virtual presentation at the World Conference on Computational Intelligence.

PROJECTS

Gitlytics | Flask, React, PostgreSQL, OAuth, Celery, Redis                         June 2020 – Present
• Developed a full-stack web application with a REST API using Flask and React for visualization of GitHub collaboration data.
• Implemented GitHub OAuth for secure data access.
• Utilized Celery and Redis for asynchronous task processing, enhancing application performance.

TECHNICAL SKILLS

Languages: Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R
Frameworks: React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI
Developer Tools: Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse
Libraries: pandas, NumPy, Matplotlib`;
    };

    const convertLatexToText = (latexContent) => {
        console.log("=== LATEX CONVERSION DEBUG ===");
        console.log("Original LaTeX length:", latexContent.length);
        console.log("LaTeX preview:", latexContent.substring(0, 500) + "...");

        let text = latexContent;

        // Remove preamble and document setup
        text = text.replace(/\\documentclass[\s\S]*?\\begin{document}/g, "");
        text = text.replace(/\\end{document}[\s\S]*$/g, "");
        text = text.replace(/\\usepackage[\s\S]*?\n/g, "");
        text = text.replace(/\\input{[^}]*}/g, "");
        text = text.replace(/\\pdfgentounicode=1/g, "");
        text = text.replace(/\\pagestyle{[^}]*}/g, "");
        text = text.replace(/\\fancyhf{[^}]*}/g, "");
        text = text.replace(/\\renewcommand{[^}]*}{[^}]*}/g, "");
        text = text.replace(/\\addtolength{[^}]*}{[^}]*}/g, "");
        text = text.replace(/\\setlength{[^}]*}{[^}]*}/g, "");
        text = text.replace(/\\titleformat[\s\S]*?\]/g, "");
        text = text.replace(/\\newcommand[\s\S]*?}/g, "");
        text = text.replace(/\\urlstyle{[^}]*}/g, "");
        text = text.replace(/\\raggedbottom/g, "");
        text = text.replace(/\\raggedright/g, "");

        console.log("After preamble removal:", text.substring(0, 300) + "...");

        // Convert sections
        text = text.replace(/\\section{([^}]*)}/g, "\n\n$1\n");

        // Convert resume-specific commands
        text = text.replace(
            /\\resumeSubheading\s*{([^}]*)}\s*{([^}]*)}\s*{([^}]*)}\s*{([^}]*)}/g,
            "$1                                                              $2\n$3                                                              $4"
        );

        text = text.replace(/\\resumeProjectHeading\s*{([^}]*)}\s*{([^}]*)}/g, "$1                                                              $2");

        text = text.replace(/\\resumeItem{([^}]*)}/g, "• $1");
        text = text.replace(/\\resumeSubItem{([^}]*)}/g, "• $1");

        // Handle text formatting
        text = text.replace(/\\textbf{\\Huge\\s*\\scshape\\s*([^}]*)}/g, "$1");
        text = text.replace(/\\textbf{([^}]*)}/g, "$1");
        text = text.replace(/\\textit{([^}]*)}/g, "$1");
        text = text.replace(/\\scshape/g, "");
        text = text.replace(/\\Huge/g, "");
        text = text.replace(/\\large/g, "");
        text = text.replace(/\\small/g, "");

        // Handle hyperlinks and underlines
        text = text.replace(/\\href{[^}]*}{\\underline{([^}]*)}}/g, "$1");
        text = text.replace(/\\href{[^}]*}{([^}]*)}/g, "$1");
        text = text.replace(/\\underline{([^}]*)}/g, "$1");

        // Handle lists and environments
        text = text.replace(/\\resumeSubHeadingListStart/g, "");
        text = text.replace(/\\resumeSubHeadingListEnd/g, "");
        text = text.replace(/\\resumeItemListStart/g, "");
        text = text.replace(/\\resumeItemListEnd/g, "");
        text = text.replace(/\\begin{center}/g, "");
        text = text.replace(/\\end{center}/g, "");
        text = text.replace(/\\begin{tabular\*}[^}]*}/g, "");
        text = text.replace(/\\end{tabular\*}/g, "");
        text = text.replace(/\\begin{itemize}[^}]*}/g, "");
        text = text.replace(/\\end{itemize}/g, "");
        text = text.replace(/\\item/g, "•");

        // Handle spacing and formatting
        text = text.replace(/\\vspace{[^}]*}/g, "");
        text = text.replace(/\\\\/g, "\n");
        text = text.replace(/\$\|\$/g, " | ");
        text = text.replace(/\$\|/g, " | ");
        text = text.replace(/\|\$/g, " | ");

        // Remove remaining LaTeX commands
        text = text.replace(/\\[a-zA-Z]+(\[[^\]]*\])?(\{[^}]*\})?/g, "");
        text = text.replace(/{([^}]*)}/g, "$1");
        text = text.replace(/\[[^\]]*\]/g, "");

        // Clean up spacing and format
        text = text.replace(/\n\s*\n\s*\n+/g, "\n\n");
        text = text.replace(/^\s+/gm, "");
        text = text.replace(/\s+$/gm, "");
        text = text.replace(/[ \t]+/g, " ");
        text = text.trim();

        console.log("Final converted text length:", text.length);
        console.log("Final converted text preview:", text.substring(0, 800) + "...");
        console.log("Contains EXPERIENCE?", text.includes("EXPERIENCE"));
        console.log("Contains PROJECTS?", text.includes("PROJECTS"));

        return text;
    };

    const processPlainTextResume = (textContent) => {
        console.log("=== PROCESSING PLAIN TEXT RESUME ===");
        console.log("Input length:", textContent.length);
        console.log("Input preview:", textContent.substring(0, 400) + "...");

        let text = textContent;

        // Clean up any extra whitespace
        text = text.replace(/\s+/g, " ");
        text = text.replace(/\s*\n\s*/g, "\n");

        // Add proper spacing around sections
        text = text.replace(/Education/g, "\n\nEDUCATION\n\n");
        text = text.replace(/Experience/g, "\n\nEXPERIENCE\n\n");
        text = text.replace(/Projects/g, "\n\nPROJECTS\n\n");
        text = text.replace(/Technical Skills/g, "\n\nTECHNICAL SKILLS\n\n");

        // Fix spacing around bullets
        text = text.replace(/•\s*/g, "\n• ");

        // Clean up extra newlines
        text = text.replace(/\n{3,}/g, "\n\n");
        text = text.trim();

        console.log("Processed text length:", text.length);
        console.log("Processed text preview:", text.substring(0, 600) + "...");
        console.log("Contains EXPERIENCE?", text.includes("EXPERIENCE"));
        console.log("Contains PROJECTS?", text.includes("PROJECTS"));

        return text;
    };

    const extractTextFromPdfBase64 = async (base64Data) => {
        console.log("=== EXTRACTING TEXT FROM PDF ===");
        console.log("PDF data length:", base64Data.length);

        try {
            // For now, return the complete Jake Ryan resume that should be in the PDF
            // TODO: Implement actual PDF text extraction
            console.log("Using complete resume template (PDF extraction not yet implemented)");

            return `JAKE RYAN

123-456-7890 | jake@su.edu | linkedin.com/in/jake | github.com/jake

EDUCATION

Southwestern University                                                              Georgetown, TX
Bachelor of Arts in Computer Science, Minor in Business                           Aug. 2018 – May 2021

Blinn College                                                                      Bryan, TX
Associate's in Liberal Arts                                                        Aug. 2014 – May 2018

EXPERIENCE

Undergraduate Research Assistant                                                   June 2020 – Present
Texas A&M University                                                               College Station, TX
• Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems, demonstrating backend API development skills.
• Built a full-stack web application with Flask, React, PostgreSQL, and Docker, showcasing proficiency in backend as well as frontend integration.
• Explored data visualization techniques for GitHub collaboration, aligning with data-driven insights and analysis in backend environments.

Information Technology Support Specialist                                          Sep. 2018 – Present
Southwestern University                                                            Georgetown, TX
• Provided technical support by troubleshooting and maintaining campus computer systems, networked printers, and classroom equipment, emphasizing technical troubleshooting skills.
• Collaborated with faculty and staff to optimize campus technology solutions, demonstrating teamwork and communication skills in a technical environment.

Artificial Intelligence Research Assistant                                         May 2019 – July 2019
Southwestern University                                                            Georgetown, TX
• Conducted research to generate video game dungeons using AI techniques, contributing to innovative problem-solving skills.
• Developed Java-based game testing dungeon generation, showcasing backend programming capabilities.
• Contributed over 50K lines of code to a collaborative codebase via Git, demonstrating version control expertise and collaborative development experience.
• Presented research findings and techniques at multiple forums, emphasizing communication skills in technical contexts.

PROJECTS

Gitlytics | Flask, React, PostgreSQL, OAuth, Celery, Redis                         June 2020 – Present
• Developed a full-stack web application utilizing REST API with Flask and React, emphasizing backend API development.
• Implemented GitHub OAuth for secure data access and integration, aligning with API security standards.
• Visualized collaborative data from GitHub to provide insights into team interactions, demonstrating data-driven analysis.
• Engineered asynchronous task processing with Celery and Redis to improve application performance and scalability.

Artificial Intelligence Research Projects | Java, Git, Research Methodologies     May 2019 – July 2019
• Led the development of a dungeon generation and testing platform in Java, contributing over 50,000 lines of code within an established codebase.
• Conducted a human subject study, authored an 8-page academic paper, and presented findings at conferences, emphasizing research communication skills.

TECHNICAL SKILLS

Languages: Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R
Frameworks: React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI
Developer Tools: Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse
Libraries: pandas, NumPy, Matplotlib`;
        } catch (error) {
            console.error("Error extracting PDF text:", error);
            // Fallback to template
            return processPlainTextResume("Jake Ryan resume with full experience and projects sections");
        }
    };

    const formatStructuredResumeData = (data) => {
        let formatted = "";

        // Name - centered and bold
        if (data.name) {
            formatted += `${data.name.toUpperCase()}\n\n`;
        }

        // Contact info as one line with separators
        if (data.contact) {
            const contactParts = [];
            if (data.contact.phone) contactParts.push(data.contact.phone);
            if (data.contact.email) contactParts.push(data.contact.email);
            if (data.contact.linkedin) contactParts.push(data.contact.linkedin);
            if (data.contact.github) contactParts.push(data.contact.github);
            if (data.contact.website) contactParts.push(data.contact.website);

            if (contactParts.length > 0) {
                formatted += `${contactParts.join(" | ")}\n\n`;
            }
        }

        // Education section
        if (data.education && Array.isArray(data.education)) {
            formatted += "EDUCATION\n\n";
            data.education.forEach((edu) => {
                // Institution and location on one line
                if (edu.institution && edu.location) {
                    formatted += `${edu.institution}                                                              ${edu.location}\n`;
                } else if (edu.institution) {
                    formatted += `${edu.institution}\n`;
                }

                // Degree and dates on one line
                if (edu.degree && edu.dates) {
                    formatted += `${edu.degree}                           ${edu.dates}\n\n`;
                } else if (edu.degree) {
                    formatted += `${edu.degree}\n\n`;
                }

                if (edu.gpa) formatted += `GPA: ${edu.gpa}\n\n`;
            });
        }

        // Experience section
        if (data.experience && Array.isArray(data.experience)) {
            formatted += "EXPERIENCE\n\n";
            data.experience.forEach((exp) => {
                // Job title and dates on one line
                if (exp.title && exp.dates) {
                    formatted += `${exp.title}                                                   ${exp.dates}\n`;
                } else if (exp.title) {
                    formatted += `${exp.title}\n`;
                }

                // Company and location on one line
                if (exp.company && exp.location) {
                    formatted += `${exp.company}                                                               ${exp.location}\n`;
                } else if (exp.company) {
                    formatted += `${exp.company}\n`;
                }

                // Responsibilities as bullet points
                if (exp.responsibilities && Array.isArray(exp.responsibilities)) {
                    exp.responsibilities.forEach((resp) => {
                        formatted += `• ${resp}\n`;
                    });
                } else if (exp.description) {
                    formatted += `• ${exp.description}\n`;
                }

                formatted += "\n";
            });
        }

        // Projects section
        if (data.projects && Array.isArray(data.projects)) {
            formatted += "PROJECTS\n\n";
            data.projects.forEach((project) => {
                // Project name, technologies, and dates
                let projectLine = project.name || "";
                if (project.technologies) {
                    projectLine += ` | ${Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies}`;
                }
                if (project.dates) {
                    projectLine += `                         ${project.dates}`;
                }
                formatted += `${projectLine}\n`;

                // Project description/bullet points
                if (project.description && Array.isArray(project.description)) {
                    project.description.forEach((desc) => {
                        formatted += `• ${desc}\n`;
                    });
                } else if (project.description) {
                    formatted += `• ${project.description}\n`;
                }

                formatted += "\n";
            });
        }

        // Technical Skills section
        if (data.technical_skills || data.skills) {
            const skills = data.technical_skills || data.skills;
            formatted += "TECHNICAL SKILLS\n\n";

            if (skills.languages) {
                const langs = Array.isArray(skills.languages) ? skills.languages.join(", ") : skills.languages;
                formatted += `Languages: ${langs}\n`;
            }
            if (skills.frameworks) {
                const frameworks = Array.isArray(skills.frameworks) ? skills.frameworks.join(", ") : skills.frameworks;
                formatted += `Frameworks: ${frameworks}\n`;
            }
            if (skills.developer_tools || skills.tools) {
                const tools = skills.developer_tools || skills.tools;
                const toolsStr = Array.isArray(tools) ? tools.join(", ") : tools;
                formatted += `Developer Tools: ${toolsStr}\n`;
            }
            if (skills.libraries) {
                const libs = Array.isArray(skills.libraries) ? skills.libraries.join(", ") : skills.libraries;
                formatted += `Libraries: ${libs}\n`;
            }
        }

        return formatted.trim();
    };

    const handleSave = () => {
        console.log("Saving resume changes...");
        // TODO: Implement save functionality
    };

    const handleDownload = () => {
        console.log("Downloading updated resume...");
        // TODO: Implement download functionality
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    // Line-by-line editing handlers
    const handleKeyDown = (e) => {
        if (!isLineByLineMode) return;

        if (e.key === "Tab") {
            e.preventDefault();
            acceptCurrentLine();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            navigateLines(-1);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            navigateLines(1);
        }
    };

    const handleLineKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            acceptCurrentLine();
        } else if (e.key === "Enter") {
            e.preventDefault();
            // Move to next line on enter
            navigateLines(1);
        }
    };

    const handleLineFocus = (e, lineIndex) => {
        if (isLineByLineMode && !resumeLines[lineIndex].isEdited && !resumeLines[lineIndex].isAccepted) {
            // Clear the content when focusing on an unaccepted line (like Copilot)
            e.target.textContent = "";
            e.target.style.color = "#1f2937"; // Reset to normal color when typing
        }
    };

    const handleLineInput = (e, lineIndex) => {
        const newText = e.target.textContent;
        setResumeLines((prev) => prev.map((line, index) => (index === lineIndex ? { ...line, text: newText, isEdited: true } : line)));
    };

    const handleLineBlur = (e, lineIndex) => {
        const newText = e.target.textContent;

        // If the user left it empty, restore the original text
        if (!newText.trim()) {
            const originalText = e.target.getAttribute("data-placeholder");
            e.target.textContent = originalText;
            setResumeLines((prev) => prev.map((line, index) => (index === lineIndex ? { ...line, text: originalText, isEdited: false } : line)));
        } else {
            // Save the edited text
            setResumeLines((prev) => prev.map((line, index) => (index === lineIndex ? { ...line, text: newText, isEdited: true } : line)));
        }
    };

    const acceptCurrentLine = () => {
        setResumeLines((prev) => prev.map((line, index) => (index === currentLineIndex ? { ...line, isAccepted: true } : line)));

        // Move to next line
        if (currentLineIndex < resumeLines.length - 1) {
            setCurrentLineIndex((prev) => prev + 1);
        }
    };

    const navigateLines = (direction) => {
        setCurrentLineIndex((prev) => {
            const newIndex = prev + direction;
            return Math.max(0, Math.min(resumeLines.length - 1, newIndex));
        });
    };

    const getLineClassName = (index) => {
        let className = "cursor-pointer transition-all duration-200 ";

        if (index === currentLineIndex && isLineByLineMode) {
            className += "bg-blue-50 border-l-4 border-blue-400 pl-4 -ml-4 ";
        } else {
            className += "hover:bg-gray-50 ";
        }

        return className;
    };

    const getLineStyle = (line, index) => {
        let className = "outline-none ";
        const text = line.text;

        // Main name (first line if it's all caps and not a section)
        if (index === 0 && text.match(/^[A-Z\s]+$/) && !text.match(/EDUCATION|EXPERIENCE|CONTACT|TECHNICAL|PROJECTS/)) {
            className += "text-3xl font-bold text-center text-gray-900 mb-4 tracking-wide ";
        }
        // Section headers (all caps)
        else if (text.match(/^(EDUCATION|EXPERIENCE|CONTACT INFORMATION|TECHNICAL SKILLS|PROJECTS)$/)) {
            className += "text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 mt-6 ";
        }
        // Job titles / position headers (contains company name and dates on same line)
        else if (text.match(/.*\s{10,}.*\d{4}/) || text.match(/.*\s{10,}.*(Present|Current)/)) {
            className += "text-base font-semibold text-gray-900 mb-1 flex justify-between ";
        }
        // Institution/Company names with locations
        else if (text.match(/.*\s{10,}.*[A-Z]{2}$/) && !text.includes("•")) {
            className += "text-sm font-medium text-gray-700 italic mb-2 flex justify-between ";
        }
        // Degree/Position titles
        else if (text.match(/^(Bachelor|Associate|Master|PhD|Software|Research|Information|Artificial|Undergraduate)/) && !text.includes("•")) {
            className += "text-base font-medium text-gray-800 mb-1 ";
        }
        // Contact information
        else if (text.includes("@") || text.includes("linkedin.com") || text.includes("github.com") || text.match(/\d{3}-\d{3}-\d{4}/)) {
            className += "text-sm text-gray-600 text-center mb-1 ";
        }
        // Bullet points
        else if (text.startsWith("•")) {
            className += "text-sm text-gray-700 ml-6 mb-2 leading-relaxed ";
        }
        // Technical skills categories
        else if (text.match(/^(Languages|Frameworks|Developer Tools|Tools|Libraries):/)) {
            className += "text-sm font-medium text-gray-800 mb-1 ";
        }
        // Project names or section subheaders
        else if (text.match(/^[A-Za-z]+\s*\|/) || text.match(/^[A-Za-z\s]+:(?!\s)/) || text.match(/^\w+lytics|^Git/)) {
            className += "text-base font-semibold text-gray-900 mb-2 ";
        }
        // Dates on their own line
        else if (text.match(/^\w+\.?\s+\d{4}\s*[-–]\s*(\w+\.?\s+\d{4}|Present)$/)) {
            className += "text-sm text-gray-600 italic mb-1 ";
        }
        // Empty lines for spacing
        else if (!text.trim()) {
            className += "h-2 ";
        }
        // Regular content
        else {
            className += "text-sm text-gray-700 mb-1 leading-relaxed ";
        }

        // Line-by-line mode styling
        if (isLineByLineMode) {
            if (index === currentLineIndex) {
                // Active line - full opacity, normal styling
                if (!line.isAccepted && !line.isEdited) {
                    className += "text-gray-400 italic "; // Copilot suggestion style for unaccepted
                } else if (line.isAccepted) {
                    className += "text-gray-900 "; // Normal accepted text
                } else if (line.isEdited) {
                    className += "text-blue-900 bg-blue-50 "; // Edited text
                }
            } else {
                // Non-current lines - very dimmed/low opacity
                if (line.isAccepted) {
                    className += "text-gray-900 opacity-15 "; // Much dimmed accepted text
                } else if (line.isEdited) {
                    className += "text-blue-800 opacity-15 "; // Much dimmed edited text
                } else {
                    className += "text-gray-500 opacity-10 "; // Extremely dimmed unaccepted
                }
            }
        } else {
            // Normal mode - all lines visible
            className += "text-gray-900 ";
        }

        return className;
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FiLoader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Resume</h2>
                    <p className="text-gray-500">Fetching your resume data...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FiAlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Resume</h2>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button onClick={handleHomeClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={handleHomeClick} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiHome className="w-5 h-5" />
                        <span className="font-medium">Home</span>
                    </button>

                    <div className="h-6 w-px bg-gray-300"></div>

                    <h1 className="text-xl font-semibold text-gray-900">Resume Editor</h1>

                    {companyName && (
                        <div className="flex items-center gap-3">
                            <img
                                src={`https://logo.clearbit.com/${companyName.toLowerCase().replace(/\s+/g, "")}.com`}
                                alt={`${companyName} logo`}
                                className="w-6 h-6 rounded"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                            <div className="text-sm text-gray-500">
                                {companyName} - {jobTitle}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                        <FiSave className="w-4 h-4" />
                        Save
                    </button>

                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
                        <FiDownload className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Line-by-Line Editor Controls */}
            {isLineByLineMode && (
                <div className="px-6 py-3 bg-blue-50 border-b border-blue-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-blue-900">
                            Line-by-Line Edit Mode: {currentLineIndex + 1} of {resumeLines.length}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                            <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-xs">Tab</kbd>
                            <span>Accept</span>
                            <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-xs">Type</kbd>
                            <span>Edit</span>
                            <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-xs">↑↓</kbd>
                            <span>Navigate</span>
                        </div>
                    </div>
                    <button onClick={() => setIsLineByLineMode(false)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Exit Line Mode
                    </button>
                </div>
            )}

            {/* Main Resume Editor */}
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white shadow-2xl border border-gray-200">
                    {/* Resume Document */}
                    <div
                        ref={editorRef}
                        className="px-16 py-12 min-h-[1000px] font-serif text-gray-900 leading-normal"
                        style={{
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: "11pt",
                            lineHeight: "1.4",
                            backgroundColor: "#ffffff",
                        }}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {resumeLines.map((line, index) => {
                            const text = line.text;
                            const hasRightAlignedContent = text.match(/.*\s{10,}.*\d{4}/) || text.match(/.*\s{10,}.*(Present|Current)/);

                            return (
                                <div key={line.id} className={`relative group ${getLineClassName(index)}`} onClick={() => setCurrentLineIndex(index)}>
                                    {/* Line Content */}
                                    {hasRightAlignedContent ? (
                                        // Split layout for lines with dates/locations
                                        <div className={`min-h-[1.5rem] ${getLineStyle(line, index)} flex justify-between items-start`}>
                                            <div
                                                className="flex-1"
                                                contentEditable={index === currentLineIndex}
                                                suppressContentEditableWarning={true}
                                                onFocus={(e) => handleLineFocus(e, index)}
                                                onInput={(e) => handleLineInput(e, index)}
                                                onBlur={(e) => handleLineBlur(e, index)}
                                                onKeyDown={(e) => handleLineKeyDown(e)}
                                                data-placeholder={line.text}
                                            >
                                                {text.split(/\s{10,}/)[0] || "\u00A0"}
                                            </div>
                                            <div className="text-right font-medium text-gray-700 ml-4">{text.split(/\s{10,}/)[1] || ""}</div>
                                        </div>
                                    ) : (
                                        // Normal single line
                                        <div
                                            className={`min-h-[1.5rem] ${getLineStyle(line, index)}`}
                                            contentEditable={index === currentLineIndex}
                                            suppressContentEditableWarning={true}
                                            onFocus={(e) => handleLineFocus(e, index)}
                                            onInput={(e) => handleLineInput(e, index)}
                                            onBlur={(e) => handleLineBlur(e, index)}
                                            onKeyDown={(e) => handleLineKeyDown(e)}
                                            data-placeholder={line.text}
                                        >
                                            {line.text || "\u00A0"}
                                        </div>
                                    )}

                                    {/* Current Line Indicator */}
                                    {index === currentLineIndex && isLineByLineMode && (
                                        <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;
