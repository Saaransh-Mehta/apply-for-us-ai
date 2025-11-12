import { SignIn } from '@clerk/clerk-react'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 py-20">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div className="left flex flex-col gap-6">
            <h1 className="text-5xl font-bold outline-font leading-tight">Welcome back</h1>
            <p className="text-lg text-black/70 outline-font">Sign in to continue to ApplyForMe. Get access to your saved jobs, personalized recommendations, and AI tools.</p>
            <div className="mt-6">
              <ul className="space-y-3 text-black/70">
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-black rounded-full" />
                  <span className="outline-font">Access saved jobs</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-black rounded-full" />
                  <span className="outline-font">Resume & profile management</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-black rounded-full" />
                  <span className="outline-font">Interview prep dashboard</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="right">
            <div className="max-w-md w-full bg-white border border-gray-100 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 outline-font">Sign in</h2>
              <SignIn redirectUrl="/dashboard" signUpUrl='/register' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
