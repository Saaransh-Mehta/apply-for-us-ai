import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, ExternalLink, Upload } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const BrowseJobs = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasResume, setHasResume] = useState(false)
  const [showResumePrompt, setShowResumePrompt] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user has uploaded resume
    const resumeStatus = localStorage.getItem("hasResume")
    setHasResume(resumeStatus === "true")
    
    // Show resume prompt for free tier users without resume
    if (resumeStatus !== "true") {
      setShowResumePrompt(true)
    }
  }, [])

  // Mock job listings
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 days ago",
      tags: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      posted: "1 week ago",
      tags: ["Node.js", "React", "MongoDB"]
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataFlow Inc",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110k - $150k",
      posted: "3 days ago",
      tags: ["Python", "Django", "PostgreSQL"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Los Angeles, CA",
      type: "Contract",
      salary: "$80k - $100k",
      posted: "5 days ago",
      tags: ["Figma", "UI Design", "Prototyping"]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Services Co",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130k - $170k",
      posted: "1 day ago",
      tags: ["AWS", "Docker", "Kubernetes"]
    },
  ]

  const handleUploadResume = () => {
    navigate("/resume-upload")
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
            <div>
              <h1 className="text-3xl font-bold outline-font mb-2">Browse Jobs</h1>
              <p className="text-gray-600 outline-font">
                Discover opportunities that match your skills
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/dashboard")} className="outline-font">
              Back to Dashboard
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 outline-font"
              />
            </div>
            <Button className="outline-font">Search</Button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 outline-font">
            Showing {jobs.length} opportunities
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="outline-font">
              Filters
            </Button>
            <Button variant="outline" size="sm" className="outline-font">
              Sort by
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold outline-font mb-1 hover:text-blue-600 cursor-pointer">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 outline-font">{job.company}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="outline-font">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="outline-font">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="outline-font">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="outline-font">{job.posted}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="outline-font">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button className="outline-font">
                      View Details
                    </Button>
                    <Button variant="outline" className="outline-font flex items-center gap-2">
                      Apply Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="outline-font">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BrowseJobs
