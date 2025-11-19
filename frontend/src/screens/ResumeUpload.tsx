import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, FileText, CheckCircle, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"

const ResumeUpload = () => {
  const [resumeUrl, setResumeUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()
  const { user } = useUser()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)

      
      console.log("File selected:", file.name)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleSubmit = async () => {
    if (!uploadedFile && !resumeUrl) {
      alert("Please upload a resume or provide a URL")
      return
    }

    setIsUploading(true)
    
    try {
      if (uploadedFile) {
        const formData = new FormData()
        formData.append('file', uploadedFile)
        
        const responseOfUploadedFile = await axios.post('http://localhost:3000/parser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log("Response from server:", responseOfUploadedFile.data)
        
        if (responseOfUploadedFile.data.success) {
          localStorage.setItem("resumeAnalysis", JSON.stringify(responseOfUploadedFile.data.data))
          localStorage.setItem("hasResume", "true")
          navigate("/browse-jobs")
        }
      }
      
      if (resumeUrl) {
        localStorage.setItem("resumeUrl", resumeUrl)
      }
      
      setIsUploading(false)
      
      // Navigate to dashboard
      navigate("/dashboard")
    } catch (error) {
      console.error("Error uploading resume:", error)
      alert("Failed to upload resume. Please try again.")
      setIsUploading(false)
    }
  }

  const handleSkip = () => {
    // User can skip but will be prompted again for free tier features
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold outline-font mb-2">
            Welcome, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600 outline-font">
            Let's get started by uploading your resume
          </p>
        </div>

        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="outline-font text-lg mb-2">
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>{uploadedFile.name}</span>
                  </div>
                ) : (
                  <span className="text-blue-600 hover:text-blue-700">
                    Click to upload your resume (PDF)
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 outline-font">
                Supported format: PDF (Max 10MB)
              </p>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 outline-font">OR</span>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 outline-font mb-2">
              Paste your resume URL
            </label>
            <Input
              type="url"
              placeholder="https://drive.google.com/your-resume.pdf"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="outline-font"
            />
            <p className="text-xs text-gray-500 outline-font mt-1">
              You can use Google Drive, Dropbox, or any public URL
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 outline-font"
            >
              Skip for now
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isUploading || (!uploadedFile && !resumeUrl)}
              className="flex-1 outline-font flex items-center gap-2"
            >
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold outline-font mb-3">Why upload your resume?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span className="outline-font">Auto-fill job applications with your information</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span className="outline-font">Get personalized job recommendations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span className="outline-font">AI-powered resume analysis and improvements</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default ResumeUpload
