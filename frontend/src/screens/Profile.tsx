import { useState } from "react"
import { User, Settings, Sparkles, Crown, Upload, Briefcase, GraduationCap, Code, FileText, MapPin, DollarSign, Wand2, LayoutDashboard } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUser } from "@clerk/clerk-react"

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile")
  const { user } = useUser()
  const navigate = useNavigate()
  const [isEditMode, setIsEditMode] = useState(true) // Track edit vs preview mode

  const [profileData, setProfileData] = useState({
    resumeUrl: "",
    summary: "",
    skills: [] as string[],
    experience: [] as any[],
    education: [] as any[],
    projects: [] as any[],
    preferredRole: "",
    preferredLocation: "",
    expectedSalary: "",
  })

  // Temporary states for adding new items
  const [newSkill, setNewSkill] = useState("")
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  })
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    year: "",
  })
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
  })

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((_, i) => i !== index),
    })
  }

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.role) {
      setProfileData({
        ...profileData,
        experience: [...profileData.experience, newExperience],
      })
      setNewExperience({ company: "", role: "", duration: "", description: "" })
    }
  }

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setProfileData({
        ...profileData,
        education: [...profileData.education, newEducation],
      })
      setNewEducation({ institution: "", degree: "", field: "", year: "" })
    }
  }

  const handleAddProject = () => {
    if (newProject.name) {
      setProfileData({
        ...profileData,
        projects: [...profileData.projects, newProject],
      })
      setNewProject({ name: "", description: "", technologies: "", link: "" })
    }
  }

  const handleSaveProfile = async () => {
    // Validate mandatory fields
    if (!profileData.summary || profileData.summary.trim() === "") {
      alert("Professional Summary is required!")
      return
    }
    if (profileData.skills.length === 0) {
      alert("Please add at least one skill!")
      return
    }
    if (!profileData.preferredRole || profileData.preferredRole.trim() === "") {
      alert("Preferred Role is required!")
      return
    }
    if (!profileData.preferredLocation || profileData.preferredLocation.trim() === "") {
      alert("Preferred Location is required!")
      return
    }
    if (!profileData.expectedSalary || profileData.expectedSalary.trim() === "") {
      alert("Expected Salary is required!")
      return
    }
    if (profileData.projects.length === 0) {
      alert("Please add at least one project!")
      return
    }

    // TODO: Implement API call to save profile data
    console.log("Saving profile:", profileData)
    setIsEditMode(false) // Switch to preview mode
    alert("Profile saved successfully!")
  }

  const handleEditProfile = () => {
    setIsEditMode(true) // Switch back to edit mode
  }

  const handleAISummarize = async () => {
    // TODO: Implement AI summarization API call
    // For now, generate a sample summary based on available data
    const skills = profileData.skills.slice(0, 3).join(", ")
    const role = profileData.preferredRole || "professional"
    const sampleSummary = `Experienced ${role} with expertise in ${skills}. Passionate about delivering high-quality solutions and driving innovation. Seeking opportunities to leverage my skills in a dynamic environment.`
    
    setProfileData({
      ...profileData,
      summary: sampleSummary
    })
    alert("AI Summary generated! You can edit it as needed.")
  }

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "profile",
      title: "Profile",
      icon: User,
    },
    {
      id: "settings",
      title: "Account Settings",
      icon: Settings,
    },
  ]

  const upgradeItems = [
    {
      id: "pro",
      title: "Upgrade to Pro",
      icon: Sparkles,
      description: "Unlock advanced features",
    },
    {
      id: "pro-plus",
      title: "Upgrade to Pro Plus",
      icon: Crown,
      description: "Get unlimited access",
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="outline-font">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      onClick={() => {
                        if (item.id === "dashboard") {
                          navigate("/dashboard")
                        } else {
                          setActiveSection(item.id)
                        }
                      }}
                      className="outline-font"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-2" />

          <SidebarGroup>
            <SidebarGroupLabel className="outline-font">Upgrade</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {upgradeItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="outline-font"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold outline-font">
            {menuItems.find((item) => item.id === activeSection)?.title ||
              upgradeItems.find((item) => item.id === activeSection)?.title}
          </h1>
        </header>

        <div className="flex-1 p-6">
          {activeSection === "profile" && (
            <div className="space-y-6 max-w-4xl">
              {/* Edit/Preview Toggle Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold outline-font">
                  {isEditMode ? "Edit Profile" : "Profile Preview"}
                </h2>
                {!isEditMode && (
                  <Button onClick={handleEditProfile} variant="outline" className="outline-font">
                    Edit Profile
                  </Button>
                )}
              </div>

              {isEditMode ? (
                // EDIT MODE - Show all form fields
                <>
              {/* Basic Info */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold outline-font mb-4 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium outline-font text-gray-700">Full Name</label>
                    <p className="mt-1 text-lg outline-font">{user?.fullName || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium outline-font text-gray-700">Email</label>
                    <p className="mt-1 text-lg outline-font">{user?.primaryEmailAddress?.emailAddress || "N/A"}</p>
                  </div>
                </div>
              </Card>

              {/* Resume Upload */}
              <Card className="p-6">
                <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Resume
                </h3>
                <div className="space-y-3">
                  <Input
                    type="url"
                    placeholder="Resume URL or upload link"
                    value={profileData.resumeUrl}
                    onChange={(e) => setProfileData({ ...profileData, resumeUrl: e.target.value })}
                    className="outline-font"
                  />
                  <p className="text-sm text-gray-500 outline-font">Upload your resume or provide a URL</p>
                </div>
              </Card>

              {/* Summary */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold outline-font flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Professional Summary <span className="text-red-500">*</span>
                  </h3>
                  <Button
                    onClick={handleAISummarize}
                    variant="outline"
                    size="sm"
                    className="outline-font flex items-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    AI Summarize
                  </Button>
                </div>
                <textarea
                  placeholder="Write a brief professional summary about yourself..."
                  value={profileData.summary}
                  onChange={(e) => setProfileData({ ...profileData, summary: e.target.value })}
                  className="w-full min-h-32 p-3 border rounded-md outline-font resize-y"
                />
              </Card>

              {/* Skills */}
              <Card className="p-6">
                <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Skills <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g., React, Python)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      className="outline-font"
                    />
                    <Button onClick={handleAddSkill} className="outline-font">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm outline-font flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => handleRemoveSkill(index)} className="hover:text-red-600">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Experience */}
              <Card className="p-6">
                <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Company"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Role/Position"
                      value={newExperience.role}
                      onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Duration (e.g., 2020-2023)"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Description"
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      className="outline-font"
                    />
                  </div>
                  <Button onClick={handleAddExperience} variant="outline" className="outline-font">
                    Add Experience
                  </Button>
                  <div className="space-y-3 mt-4">
                    {profileData.experience.map((exp, index) => (
                      <div key={index} className="p-3 border rounded-md bg-gray-50">
                        <p className="font-semibold outline-font">{exp.role} at {exp.company}</p>
                        <p className="text-sm text-gray-600 outline-font">{exp.duration}</p>
                        <p className="text-sm outline-font mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Education */}
              <Card className="p-6">
                <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Degree"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Field of Study"
                      value={newEducation.field}
                      onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Year"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      className="outline-font"
                    />
                  </div>
                  <Button onClick={handleAddEducation} variant="outline" className="outline-font">
                    Add Education
                  </Button>
                  <div className="space-y-3 mt-4">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="p-3 border rounded-md bg-gray-50">
                        <p className="font-semibold outline-font">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-gray-600 outline-font">{edu.institution}</p>
                        <p className="text-sm text-gray-500 outline-font">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Projects */}
              <Card className="p-6">
                <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Projects <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Technologies Used"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      className="outline-font"
                    />
                    <Input
                      placeholder="Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="outline-font col-span-2"
                    />
                    <Input
                      placeholder="Project Link (optional)"
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      className="outline-font col-span-2"
                    />
                  </div>
                  <Button onClick={handleAddProject} variant="outline" className="outline-font">
                    Add Project
                  </Button>
                  <div className="space-y-3 mt-4">
                    {profileData.projects.map((project, index) => (
                      <div key={index} className="p-3 border rounded-md bg-gray-50">
                        <p className="font-semibold outline-font">{project.name}</p>
                        <p className="text-sm text-gray-600 outline-font">{project.technologies}</p>
                        <p className="text-sm outline-font mt-1">{project.description}</p>
                        {project.link && (
                          <a href={project.link} className="text-sm text-blue-600 outline-font hover:underline" target="_blank" rel="noopener noreferrer">
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Job Preferences */}
              <Card className="p-6">
                <h3 className="text-xl font-bold outline-font mb-4">Job Preferences <span className="text-red-500">*</span></h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium outline-font text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Preferred Role <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Software Engineer, Product Manager"
                      value={profileData.preferredRole}
                      onChange={(e) => setProfileData({ ...profileData, preferredRole: e.target.value })}
                      className="outline-font mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium outline-font text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Preferred Location <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., San Francisco, Remote"
                      value={profileData.preferredLocation}
                      onChange={(e) => setProfileData({ ...profileData, preferredLocation: e.target.value })}
                      className="outline-font mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium outline-font text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Expected Salary (Annual) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 100000"
                      value={profileData.expectedSalary}
                      onChange={(e) => setProfileData({ ...profileData, expectedSalary: e.target.value })}
                      className="outline-font mt-1"
                    />
                  </div>
                </div>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="outline-font">Cancel</Button>
                <Button onClick={handleSaveProfile} className="outline-font">Save Profile</Button>
              </div>
              </>
              ) : (
                // PREVIEW MODE - Show read-only profile data
                <>
                  {/* Basic Info Preview */}
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold outline-font mb-4 flex items-center gap-2">
                      <User className="w-6 h-6" />
                      Basic Information
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium outline-font text-gray-700">Full Name</label>
                        <p className="mt-1 text-lg outline-font">{user?.fullName || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium outline-font text-gray-700">Email</label>
                        <p className="mt-1 text-lg outline-font">{user?.primaryEmailAddress?.emailAddress || "N/A"}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Resume Preview */}
                  {profileData.resumeUrl && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-3 flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Resume
                      </h3>
                      <a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline outline-font">
                        View Resume →
                      </a>
                    </Card>
                  )}

                  {/* Summary Preview */}
                  {profileData.summary && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Professional Summary
                      </h3>
                      <p className="text-gray-700 outline-font">{profileData.summary}</p>
                    </Card>
                  )}

                  {/* Skills Preview */}
                  {profileData.skills.length > 0 && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-3 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm outline-font">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Experience Preview */}
                  {profileData.experience.length > 0 && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Work Experience
                      </h3>
                      <div className="space-y-4">
                        {profileData.experience.map((exp, index) => (
                          <div key={index} className="pb-4 border-b last:border-0">
                            <p className="font-bold text-lg outline-font">{exp.role}</p>
                            <p className="text-gray-600 outline-font">{exp.company}</p>
                            <p className="text-sm text-gray-500 outline-font mb-2">{exp.duration}</p>
                            <p className="text-gray-700 outline-font">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Education Preview */}
                  {profileData.education.length > 0 && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Education
                      </h3>
                      <div className="space-y-4">
                        {profileData.education.map((edu, index) => (
                          <div key={index} className="pb-4 border-b last:border-0">
                            <p className="font-bold text-lg outline-font">{edu.degree} in {edu.field}</p>
                            <p className="text-gray-600 outline-font">{edu.institution}</p>
                            <p className="text-sm text-gray-500 outline-font">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Projects Preview */}
                  {profileData.projects.length > 0 && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Projects
                      </h3>
                      <div className="space-y-4">
                        {profileData.projects.map((project, index) => (
                          <div key={index} className="pb-4 border-b last:border-0">
                            <p className="font-bold text-lg outline-font">{project.name}</p>
                            <p className="text-sm text-gray-600 outline-font mb-2">{project.technologies}</p>
                            <p className="text-gray-700 outline-font mb-2">{project.description}</p>
                            {project.link && (
                              <a href={project.link} className="text-blue-600 hover:underline outline-font text-sm" target="_blank" rel="noopener noreferrer">
                                View Project →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Job Preferences Preview */}
                  {(profileData.preferredRole || profileData.preferredLocation || profileData.expectedSalary) && (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold outline-font mb-4">Job Preferences</h3>
                      <div className="space-y-3">
                        {profileData.preferredRole && (
                          <div>
                            <label className="text-sm font-medium outline-font text-gray-700 flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              Preferred Role
                            </label>
                            <p className="mt-1 text-gray-700 outline-font">{profileData.preferredRole}</p>
                          </div>
                        )}
                        {profileData.preferredLocation && (
                          <div>
                            <label className="text-sm font-medium outline-font text-gray-700 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Preferred Location
                            </label>
                            <p className="mt-1 text-gray-700 outline-font">{profileData.preferredLocation}</p>
                          </div>
                        )}
                        {profileData.expectedSalary && (
                          <div>
                            <label className="text-sm font-medium outline-font text-gray-700 flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              Expected Salary
                            </label>
                            <p className="mt-1 text-gray-700 outline-font">${parseInt(profileData.expectedSalary).toLocaleString()}/year</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {activeSection === "settings" && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold outline-font mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold outline-font mb-2">Email Notifications</h3>
                  <p className="text-sm text-gray-600 outline-font mb-3">
                    Manage your email notification preferences
                  </p>
                  <Button variant="outline" className="outline-font">Configure Notifications</Button>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold outline-font mb-2">Privacy Settings</h3>
                  <p className="text-sm text-gray-600 outline-font mb-3">
                    Control your privacy and data preferences
                  </p>
                  <Button variant="outline" className="outline-font">Manage Privacy</Button>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold outline-font mb-2 text-red-600">Danger Zone</h3>
                  <p className="text-sm text-gray-600 outline-font mb-3">
                    Delete your account and all associated data
                  </p>
                  <Button variant="destructive" className="outline-font">Delete Account</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === "pro" && (
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Sparkles className="w-12 h-12 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold outline-font mb-2">Upgrade to Pro</h2>
                  <p className="text-gray-600 outline-font">Unlock advanced features and boost your job search</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="outline-font">5 Resume Limit</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="outline-font">Advanced AI Summary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="outline-font">Job Application Automation (50/month)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="outline-font">AI Cover Letter Generator</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="outline-font">Application Logs & Status Tracking</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold outline-font">$24</span>
                <span className="text-gray-500 outline-font">/month</span>
              </div>
              <Button className="w-full outline-font">Upgrade to Pro</Button>
            </Card>
          )}

          {activeSection === "pro-plus" && (
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Crown className="w-12 h-12 text-yellow-600" />
                <div>
                  <h2 className="text-2xl font-bold outline-font mb-2">Upgrade to Pro Plus</h2>
                  <p className="text-gray-600 outline-font">Get unlimited access to all premium features</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">Unlimited Resumes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">Premium AI Summary & Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">Unlimited Job Application Automation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">AI Cover Letter Generator (Unlimited)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">Advanced Application Logs & Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">Priority Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span className="outline-font">Dedicated Account Manager</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold outline-font">$49</span>
                <span className="text-gray-500 outline-font">/month</span>
              </div>
              <Button className="w-full outline-font">Upgrade to Pro Plus</Button>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Profile
