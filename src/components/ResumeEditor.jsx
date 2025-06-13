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
                let textContent = resumeData.historyContent || "";
                console.log("Final converted text preview:", textContent);

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
