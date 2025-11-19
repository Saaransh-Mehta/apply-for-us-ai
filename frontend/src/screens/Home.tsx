import { useState, useEffect } from "react"
import { motion, useAnimation } from 'framer-motion'
import * as Lucide from 'lucide-react'
import Navbar from "../components/Navbar"
import heroImg from '../assets/heroImg.png'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Home = () => {

  const [email,setEmail] = useState("")



  return (
<>

<div className="home-top sticky top-0 z-50 navbar">
    <Navbar/>      
    </div>

    <div className="hero-section mt-20 flex max-w-7xl mx-auto justify-center items-center ">
      <div className="main-hero flex flex-row justify-between items-center mx-auto">
        <div className="left flex flex-col w-[50%] justify-center mx-auto ">
          <div className="hero-text tracking-tight text-7xl outline-font font-bold leading-tight">
            <h1>
              Put your
              <span className="relative inline-block mx-2">
                carrer
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1729 149"
                  className="absolute left-0 -bottom-2 w-full h-4"
                  preserveAspectRatio="none"
                >
                  <path d="M1689.89 26.59a4479.17 4479.17 0 0 0-89.64-7.41C1354.1.45 1106.56-5.76 859.92 5.93c-227.31-4.25-454.79 8.96-681.36 27.95C121.94 38.9 65.1 40.2 8.38 42.12c-16.57 2.86-5.23 26.39 5.6 14.46 160.76-1.27 331.82-27.38 620.54-34.8A4574.9 4574.9 0 0 0 498.9 36.57C376.43 52.24 253.01 65.21 132.88 94.51c-36.16 8.94-71.67 20.31-106.69 32.95-7.14 4.4-27.74 3.63-24.98 15.62 1.99 7.19 13.63 7.05 18.04 2.59 143.67-54.58 297.49-70.64 448.88-90.24 129.01-16.82 258.61-28.01 388.46-34.27 285.02 6.07 570.13 38.15 848.22 100.65 3.84 1.09 8.24-1.32 9.23-5.24 1.98-7.31-5.66-9.96-11.42-10.6-48.05-10.76-96.18-21.26-144.56-30.43-160.68-28.2-322.86-46.78-485.4-60.19l-2.34-.16c161.55-1.33 323.21 4.35 484.31 15.71 37.11 2.65 125.06 8.85 164.97 13.96a7.58 7.58 0 0 0 8.45-6.41c.94-13.18-23.48-8.77-38.14-11.86Z" fill="#0f172a" />
                </svg>
              </span>
              First
            </h1>
           
          </div>
          <div className="hero-subtext">
            <p className="mt-6 text-lg text-slate-700 outline-font">ApplyForMe helps you land your dream job with AI-powered resume and cover letter optimization, personalized job recommendations, and interview preparation tools.</p>
          </div>
          <div className="cta-actions">
            <div className="email-section mt-8 flex ">
              <input
              type="text"
              onChange={(e)=>setEmail(e.target.value)}
              value={email} 
              placeholder="Enter your work email"
              className="p-4 rounded-l-md border border-gray-300 outline-none w-72 outline-font"/>
              <button className="rounded-r-md bg-blue-700 hover:bg-blue-600 text-white px-6 outline-font">Get Started</button>
            </div>
          </div>
          <div className="cta-figures mt-18 flex flex-col gap-6">
            <div className="figures flex flex-col gap-3">
              <div className="figure-1 flex items-center">

              <span className="font-bold outline-font text-2xl text-slate-900">500+</span>
              <span className="ml-2 text-slate-700 outline-font">Companies using ApplyForMe</span>
              </div>
              <div className="figure-2">
              <span className="font-bold outline-font text-2xl text-slate-900">95%</span>
              <span className="ml-2 text-slate-700 outline-font">of users get interviews within 30 days</span>
              </div>
            </div>
            <div className="rating">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {/* four full black stars */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="currentColor" aria-hidden>
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="currentColor" aria-hidden>
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="currentColor" aria-hidden>
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="currentColor" aria-hidden>
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                  </svg>

                  {/* half filled star using linearGradient */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                    <defs>
                        <linearGradient id="half-gradient" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="50%" stopColor="#e6eef6" />
                          <stop offset="100%" stopColor="#e6eef6" />
                        </linearGradient>
                      </defs>
                      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" fill="url(#half-gradient)" />
                  </svg>
                </div>
                <span className="ml-2 font-semibold outline-font">4.5</span>
              </div>
            </div>

            
          </div>
        </div>
        <div className="right flex justify-center w-[50%] items-center">
          <img src={heroImg} alt="heroImage"/>
      </div>
    </div>
        </div>
    <div className="trusted-by mt-8 max-w-7xl flex justify-center mx-auto px-4">
      <TrustedCompanies />
    </div>
  <div id="whyus" className="feature-section flex flex-col items-center max-w-7xl border border-slate-200 mx-auto mt-10 mb-10 rounded-xl py-12">
      <div  className="features-head flex flex-col gap-5 justify-center items-center w-full text-center">
        <Badge variant={'secondary'} className="p-4 font-normal text-lg outline-font w-32">Features </Badge>
        <h1 className="text-4xl outline-font">Powerful AI features built to accelerate your job search.</h1>
      </div>
      <div className="features-grid max-w-5xl mt-10 w-full grid grid-cols-2 gap-6 p-6 justify-center">
        <div className="card-1">
          <Card className="bg-slate-50">
            <CardHeader>
              <DotLottieReact
              src="https://lottie.host/a660300e-f50a-4df9-966c-04cfb1eb8efa/a4GLPuDpE0.lottie"
              autoplay
              loop
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <h3 className="text-2xl outline-font font-bold mb-2">Instant Profile Builder</h3>
              <CardDescription className="flex justify-center items-center outline-font text-slate-800 text-md mx-auto text-center">
                Upload your resume once — our AI extracts your skills, achievements, and education to create a personalized profile that represents you perfectly. No more manual data entry.
              </CardDescription>
            </CardContent>

          </Card>
          
        </div>
        <div className="card-2">
          <Card className="bg-slate-50">
            <CardHeader>
              <DotLottieReact
              src="https://lottie.host/c5b133fe-6477-49c1-89b0-d8e49078ab91/RyzOfsS4Hf.lottie"
              autoplay
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <h3 className="text-2xl outline-font font-bold mb-2">Personalized Job Matches</h3>
              <CardDescription className="flex justify-center items-center outline-font text-slate-800 text-md mx-auto text-center">
                Say goodbye to endless job searching. Our AI analyzes your profile and preferences to deliver tailored job recommendations that align with your career goals.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

      </div>
      <div className="feature-grid-2 max-w-5xl w-full h-full grid grid-cols-3 gap-3 p-4 justify-center">
        <div className="card-3">
          <Card className="bg-slate-50">
            <CardHeader>
              <DotLottieReact
              src="https://lottie.host/1f3e2f5e-B5b4-4c6e-8f3a-1e2f3d6e4c5b/3Yk1b0Y2vK.lottie"
              autoplay
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <h3 className="text-2xl outline-font font-bold mb-2">Apply Smarter, Together</h3>
              <CardDescription className="flex justify-center items-center outline-font text-slate-800 text-md mx-auto text-center">
                Collaborate with friends or mentors on your job applications. Share your profile and get feedback to improve your chances of landing the job.
                </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="card-4">
          <Card className="bg-slate-50">
            <CardHeader>
              <DotLottieReact
              src="https://lottie.host/3e2f1d4c-5b6a-4c7d-8e9f-0a1b2c3d4e5f/XYzAbcD3Ef.lottie"
              autoplay
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <h3 className="text-2xl outline-font font-bold mb-2">Cover Letter Generator</h3>
              <CardDescription className="flex justify-center items-center outline-font text-slate-800 text-md mx-auto text-center">
                Craft compelling cover letters in minutes. Our AI generates personalized cover letters that highlight your strengths and align with the job description.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="card-5">
          <Card className="bg-slate-50">
            <CardHeader>
              <DotLottieReact
              src="https://lottie.host/4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a/GhIjKlMnOp.lottie"
              autoplay
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <h3 className="text-2xl outline-font font-bold mb-2">Interview Preparation</h3>
              <CardDescription className="flex justify-center items-center outline-font text-slate-800 text-md mx-auto text-center">
                Ace your interviews with AI-generated practice questions and feedback. Build confidence and improve your responses to land the job you want.
              </CardDescription>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>

    {/* Testimonials Section */}
    <div className="testimonials-section max-w-7xl mx-auto mt-20 mb-20 px-4">
      <div className="testimonials-head flex flex-col gap-5 justify-center items-center w-full text-center mb-12">
  <Badge variant={'secondary'} className="p-4 font-normal text-lg outline-font w-40 bg-slate-50">Testimonials</Badge>
        <h1 className="text-4xl outline-font">What our users are saying</h1>
        <p className="text-black/70 outline-font max-w-2xl">
          Join thousands of job seekers who have successfully landed their dream jobs with ApplyForMe
        </p>
      </div>
      <div className="testimonials-grid grid grid-cols-3 gap-6">
        <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-amber-400" fill="currentColor">
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-800 outline-font mb-4">
              "ApplyForMe helped me land my dream job at Google! The AI-powered resume optimization made all the difference. I got 3x more interview calls!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-white font-bold outline-font text-sm">SJ</span>
              </div>
              <div>
                <p className="font-semibold outline-font">Sarah Johnson</p>
                <p className="text-sm text-slate-600 outline-font">Software Engineer at Google</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-amber-400" fill="currentColor">
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-800 outline-font mb-4">
              "The automated job application feature saved me hours every week. I applied to 50+ jobs in just days and got multiple offers. Absolutely worth it!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-white font-bold outline-font text-sm">MC</span>
              </div>
              <div>
                <p className="font-semibold outline-font">Michael Chen</p>
                <p className="text-sm text-slate-600 outline-font">Product Manager at Amazon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-amber-400" fill="currentColor">
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-800 outline-font mb-4">
              "As a career switcher, I was nervous about my chances. ApplyForMe's interview prep and cover letter generator gave me the confidence I needed!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-white font-bold outline-font text-sm">EP</span>
              </div>
              <div>
                <p className="font-semibold outline-font">Emily Parker</p>
                <p className="text-sm text-slate-600 outline-font">UX Designer at Meta</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Why Choose Us Section */}
  <div id="why-choose-us" className="why-choose-section bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="why-choose-head flex flex-col gap-5 justify-center items-center w-full text-center mb-12">
          <Badge variant={'secondary'} className="p-4 font-normal text-lg outline-font w-48 bg-white">Why Choose Us</Badge>
          <h1 className="text-4xl outline-font">Built for job seekers, by job seekers</h1>
          <p className="text-slate-700 outline-font max-w-2xl">
            We understand the challenges of job hunting. That's why we created a platform that puts you first.
          </p>
        </div>
        <div className="why-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Lightning Fast</h3>
              <p className="text-slate-700 outline-font text-sm">
                Apply to jobs 10x faster with our AI-powered automation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Privacy First</h3>
              <p className="text-slate-700 outline-font text-sm">
                Your data is encrypted and never shared with third parties
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">AI-Powered</h3>
              <p className="text-slate-700 outline-font text-sm">
                Advanced AI analyzes and optimizes every application
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Proven Results</h3>
              <p className="text-slate-700 outline-font text-sm">
                95% of users get interviews within 30 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Expert Support</h3>
              <p className="text-slate-700 outline-font text-sm">
                24/7 support from career experts and recruiters
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Precision Match</h3>
              <p className="text-slate-700 outline-font text-sm">
                Smart algorithms match you with perfect opportunities
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Industry Leader</h3>
              <p className="text-slate-700 outline-font text-sm">
                Trusted by 500+ companies and 10,000+ users
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Lucide.Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl outline-font font-bold mb-2">Always Improving</h3>
              <p className="text-slate-700 outline-font text-sm">
                Regular updates with new features and improvements
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    {/* Pro Features Section */}
    <div className="pro-features-section max-w-7xl mx-auto mt-20 mb-20 px-4">
      <div className="pro-head flex flex-col gap-5 justify-center items-center w-full text-center mb-12">
  <Badge className="p-4 font-normal text-lg outline-font w-60 bg-blue-700 text-white">Upgrade to Pro</Badge>
        <h1 className="text-4xl outline-font">Unlock the full power of ApplyForMe</h1>
        <p className="text-slate-700 outline-font max-w-2xl">
          Get unlimited access to all features and land your dream job faster than ever
        </p>
      </div>
      <div className="pro-grid grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Lucide.Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl outline-font font-bold mb-2">Unlimited Applications</h3>
                <p className="text-slate-700 outline-font">
                  Apply to unlimited jobs every month. No restrictions, no limits. Focus on landing the job, not counting applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Lucide.Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl outline-font font-bold mb-2">AI Cover Letters</h3>
                <p className="text-slate-700 outline-font">
                  Generate personalized, compelling cover letters instantly. Each one tailored to the specific job and company.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Lucide.BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl outline-font font-bold mb-2">Advanced Analytics</h3>
                <p className="text-slate-700 outline-font">
                  Track your application success rate, response times, and optimize your strategy with detailed insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Lucide.Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl outline-font font-bold mb-2">Priority Support</h3>
                <p className="text-slate-700 outline-font">
                  Get dedicated support from career experts. Direct access to our team whenever you need help.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Lucide.Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl outline-font font-bold mb-2">Exclusive Job Listings</h3>
                <p className="text-slate-700 outline-font">
                  Access to premium job listings and hidden opportunities not available on public job boards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Lucide.FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl outline-font font-bold mb-2">Resume Review</h3>
                <p className="text-slate-700 outline-font">
                  Monthly resume reviews by professional recruiters. Get expert feedback to improve your chances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="cta-section flex justify-center mt-12">
        <a href="/pricing" className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold outline-font hover:bg-blue-600 transition-all hover:shadow-xl">
          View Pricing Plans →
        </a>
      </div>
    </div>

    {/* Footer CTA */}
    <div className="footer-cta bg-slate-900 text-white py-20 mt-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-5xl outline-font font-bold mb-6">
          Ready to land your dream job?
        </h2>
        <p className="text-xl text-white/80 outline-font mb-8">
          Join thousands of successful job seekers who found their perfect role with ApplyForMe
        </p>
        <div className="flex justify-center gap-4">
          <a href="/register" className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold outline-font hover:shadow-xl transition-all hover:-translate-y-1">
            Get Started Free
          </a>
          <a href="/pricing" className="px-8 py-4 border-2 border-blue-700 text-blue-700 rounded-lg font-semibold outline-font hover:bg-blue-700 hover:text-white transition-all">
            View Pricing
          </a>
        </div>
      </div>
    </div>
</>
  )
}

export default Home

function TrustedCompanies() {
  const controls = useAnimation()

  const companies = [
    { name: 'Google', icon: (Lucide as any).Globe },
    { name: 'Microsoft', icon: (Lucide as any).Monitor },
    { name: 'Amazon', icon: (Lucide as any).Package },
    { name: 'Meta', icon: (Lucide as any).Facebook },
    { name: 'Apple', icon: (Lucide as any).Apple },
    { name: 'Netflix', icon: (Lucide as any).Film },
    { name: 'IBM', icon: (Lucide as any).Server },
    { name: 'Intel', icon: (Lucide as any).Cpu }
  ]

  const startAnim = () => {
    controls.start({
      x: ['0%', '-50%'],
      transition: { x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' } }
    })
  }

  useEffect(() => {
    startAnim()
  }, [])

  return (
    <div className="trusted-by-section mt-8 flex flex-col items-center w-full">
      <h3 className="text-sm  text-slate-600 mb-4 outline-font">Trusted by companies</h3>
      <hr/>
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={controls}
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => startAnim()}
        >
          <div className="flex items-center gap-6">
            {companies.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.name} className="min-w-[120px] shrink-0 flex items-center justify-center px-6 py-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                  {Icon ? <Icon size={28} className="text-slate-700" /> : <span className="font-semibold">{c.name}</span>}
                </div>
              )
            })}
          </div>

          {/* duplicate for seamless loop */}
          <div className="flex items-center gap-6">
            {companies.map((c, i) => {
              const Icon = c.icon
              return (
                <div key={c.name + '-dup-' + i} className="min-w-[120px] shrink-0 flex items-center justify-center px-6 py-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                  {Icon ? <Icon size={28} className="text-slate-700" /> : <span className="font-semibold">{c.name}</span>}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
