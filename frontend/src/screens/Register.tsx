// React import not required explicitly in newer JSX runtimes
import { SignUp } from '@clerk/clerk-react'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 py-20">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div className="left flex flex-col gap-6">
            <h1 className="text-5xl font-bold outline-font leading-tight">
              Create your account
            </h1>
            <p className="text-lg text-black/70 outline-font">
              Join ApplyForMe to get personalized job recommendations, AI-powered resume optimization, and interview prep tools.
            </p>
            <div className="mt-6">
              <ul className="space-y-3 text-black/70">
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-black rounded-full" />
                  <span className="outline-font">AI resume optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-black rounded-full" />
                  <span className="outline-font">Personalized job matches</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-black rounded-full" />
                  <span className="outline-font">Interview prep & tips</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="right">
            <div className="max-w-md w-full bg-white border border-gray-100 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 outline-font">Sign up</h2>
              {/* Clerk SignUp component handles the flow; wrapped to match site styling */}
              <SignUp redirectUrl="/dashboard" signInUrl='/login' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
