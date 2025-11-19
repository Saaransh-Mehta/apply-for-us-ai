import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Briefcase, DollarSign, Clock, Bookmark, ExternalLink, Upload, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

interface Job {
  id: number
  title: string
  company_name: string
  candidate_required_location: string
  job_type: string
  salary: string
  publication_date: string
  tags: string[]
  url: string
  category: string
  company_logo?: string
}

const BrowseJobs = () => {
  const [hasResume, setHasResume] = useState(false)
  const [showResumePrompt, setShowResumePrompt] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [userSkills, setUserSkills] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const resumeAnalysisStr = localStorage.getItem("resumeAnalysis")
    
    if (!resumeAnalysisStr) {
      setShowResumePrompt(true)
      setHasResume(false)
      return
    }
    
    try {
      const resumeAnalysis = JSON.parse(resumeAnalysisStr)
      setHasResume(true)
      
      // Extract skills from AI analysis
      const aiAnalysis = resumeAnalysis.aiAnalysis
      let extractedSkills: string[] = []
      
      if (aiAnalysis && aiAnalysis.skills) {
        extractedSkills = [
          ...(aiAnalysis.skills.technical || []),
          ...(aiAnalysis.skills.tools || []),
          ...(aiAnalysis.skills.languages || [])
        ]
        setUserSkills(extractedSkills)
      }
      
      // Check if user is pro
      const userTier = localStorage.getItem("userTier") || "free"
      setIsPro(userTier === "pro")
      
      // Fetch jobs based on user's skills
      fetchJobsBasedOnSkills(extractedSkills)
    } catch (error) {
      console.error("Error parsing resume analysis:", error)
      setShowResumePrompt(true)
      setHasResume(false)
    }
  }, [])

  const fetchJobsBasedOnSkills = async (skills: string[]) => {
    setIsLoading(true)
    try {
     
      const primarySkill = skills[0] || "developer"
      
      const response = await axios.get(`https://remotive.com/api/remote-jobs?search=${primarySkill}`)
      const fetchedJobs = response.data.jobs || []
      
      // Limit jobs based on user tier: free = 3, pro = 5
      const jobLimit = isPro ? 5 : 3
      const limitedJobs = fetchedJobs.slice(0, jobLimit)
      
      setJobs(limitedJobs)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadResume = () => {
    navigate("/resume-upload")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (showResumePrompt && !hasResume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold outline-font mb-2">
            Resume Required
          </h2>
          <p className="text-gray-600 outline-font mb-6">
            To browse job opportunities, please upload your resume first. This helps us match you with the best positions.
          </p>
          <div className="space-y-3">
            <Button onClick={handleUploadResume} className="w-full outline-font">
              Upload Resume
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")} 
              className="w-full outline-font"
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold outline-font mb-2">AI-Matched Jobs</h1>
              <p className="text-gray-600 outline-font mb-3">
                Jobs curated based on your skills and experience
              </p>
              {userSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 outline-font">Matching skills:</span>
                  {userSkills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="outline-font text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {userSkills.length > 5 && (
                    <Badge variant="secondary" className="outline-font text-xs">
                      +{userSkills.length - 5} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <Button variant="outline" onClick={() => navigate("/dashboard")} className="outline-font">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold outline-font mb-1 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                {isPro ? "AI Agent Auto-Apply Enabled" : "Free Tier - Browse Only"}
              </h3>
              <p className="text-sm text-gray-600 outline-font">
                {isPro 
                  ? "Our AI agent will automatically apply to these jobs on your behalf using your resume and cover letter."
                  : "You can browse and view jobs. Upgrade to Pro to enable AI auto-apply feature."
                }
              </p>
              <p className="text-sm text-gray-600 outline-font mt-1">
                Showing {jobs.length} AI-matched opportunities {!isPro && <span className="font-medium">(Free tier: 3 jobs)</span>}
              </p>
            </div>
            {!isPro && (
              <Button 
                onClick={() => navigate("/pricing")} 
                className="outline-font bg-blue-700 hover:bg-blue-600 flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 outline-font mt-4">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 outline-font">No jobs found. Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {job.company_logo && (
                          <img 
                            src={job.company_logo} 
                            alt={job.company_name} 
                            className="w-12 h-12 rounded object-contain"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-bold outline-font mb-1 hover:text-blue-600 cursor-pointer">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 outline-font">{job.company_name}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="outline-font">{job.candidate_required_location || "Remote"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="outline-font">{job.job_type || "Full-time"}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="outline-font">{job.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="outline-font">{formatDate(job.publication_date)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.category && (
                        <Badge variant="secondary" className="outline-font">
                          {job.category}
                        </Badge>
                      )}
                      {job.tags && job.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="outline-font">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => window.open(job.url, '_blank')}
                        className="outline-font flex items-center gap-2"
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      {isPro ? (
                        <Button 
                          className="outline-font bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            // Store job info for AI application
                            localStorage.setItem("selectedJob", JSON.stringify(job))
                            alert("AI Agent will apply to this job automatically!")
                            // TODO: Trigger backend AI agent to apply
                          }}
                        >
                          AI Auto-Apply
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="outline-font"
                          disabled
                          onClick={() => navigate("/pricing")}
                        >
                          Apply (Pro Only)
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseJobs
