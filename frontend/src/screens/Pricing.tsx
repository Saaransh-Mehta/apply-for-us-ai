import { useState } from "react"
import { ArrowLeft, Check, X } from "lucide-react"
import {  useNavigate } from "react-router-dom"
import { UserButton} from '@clerk/clerk-react'
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
const Pricing = () => {
    const [yearly,setYearly] = useState(false)
    const navigate = useNavigate()
    const {isSignedIn,user} = useUser()
    const username = user?.fullName || 'User'

    const handleUpgrade = (tier: string) => {
        // Store tier in localStorage (in real app, would update database)
        localStorage.setItem("userTier", tier)
        alert(`Successfully upgraded to ${tier} tier! (Demo mode - no payment processed)`)
        navigate("/dashboard")
    }


  return (
    <>
      <div className="pricing-section max-w-7xl mx-auto p-4">
        <div className="pricing-top flex justify-between items-center">
            <div className="back-to-home">
                <ArrowLeft onClick={()=>navigate('/')} className="cursor-pointer inline-block mr-2"/>
            </div>
            <div className="user-signed-in">
                {isSignedIn ? <>
                <div className="flex items-center gap-3">

                <UserButton/> {username}
                </div>
                </> : <>
                <div className="flex gap-3">
                    <Button variant={'default'} onClick={()=>navigate('/login')}>Login</Button>

                </div>
                </>}
            </div>
        </div>
        <div className="pricing-section-main mt-24 flex justify-center items-center flex-col">
            <div className="main-head flex flex-col gap-6 justify-center items-center">
                    <h1 className="text-6xl outline-font">Pricing Plans</h1>
                    <p className="outline-font">Smart AI features that helps you to land your jobs faster and efficient </p>
                    <Switch checked={yearly} onCheckedChange={(checked)=>setYearly(!!checked)}/>
                    <span className="outline-font">{yearly ? 'Yearly Billing (20% off)' : 'Monthly Billing'}</span>
            </div>
            <div className="pricing-cards grid grid-cols-3 gap-8 mt-16 w-full max-w-6xl">
                {/* Free Tier */}
                <Card className="p-8 border-2 border-gray-200 rounded-xl flex flex-col">
                    <div className="tier-header mb-6">
                        <h2 className="text-2xl font-bold outline-font mb-2">Free</h2>
                        <div className="price mb-4">
                            <span className="text-4xl font-bold outline-font">$0</span>
                            <span className="text-gray-500 outline-font">/month</span>
                        </div>
                        <p className="text-sm text-gray-600 outline-font">Perfect for trying out the platform</p>
                    </div>
                    <Button variant="outline" className="w-full mb-6 outline-font" onClick={() => navigate('/dashboard')}>Current Plan</Button>
                    <div className="features space-y-3">
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">1 Resume Limit</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Basic Summary</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm text-gray-400">Job Application Automation</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm text-gray-400">AI Cover Letter Generator</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm text-gray-400">Application Logs & Status Tracking</span>
                        </div>
                    </div>
                </Card>

                {/* Pro Tier */}
                <Card className="p-8 border-2 border-black rounded-xl flex flex-col relative shadow-lg">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm outline-font">
                        Popular
                    </div>
                    <div className="tier-header mb-6">
                        <h2 className="text-2xl font-bold outline-font mb-2">Pro</h2>
                        <div className="price mb-4">
                            <span className="text-4xl font-bold outline-font">
                                ${yearly ? '19' : '24'}
                            </span>
                            <span className="text-gray-500 outline-font">/{yearly ? 'month' : 'month'}</span>
                        </div>
                        <p className="text-sm text-gray-600 outline-font">For serious job seekers</p>
                    </div>
                    <Button className="w-full mb-6 outline-font" onClick={() => handleUpgrade('pro')}>Upgrade to Pro</Button>
                    <div className="features space-y-3">
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">5 Resume Limit</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Advanced AI Summary</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Job Application Automation (50/month)</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">AI Cover Letter Generator</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Application Logs & Status Tracking</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Email Support</span>
                        </div>
                    </div>
                </Card>

                {/* Pro Plus Tier */}
                <Card className="p-8 border-2 border-gray-200 rounded-xl flex flex-col">
                    <div className="tier-header mb-6">
                        <h2 className="text-2xl font-bold outline-font mb-2">Pro Plus</h2>
                        <div className="price mb-4">
                            <span className="text-4xl font-bold outline-font">
                                ${yearly ? '39' : '49'}
                            </span>
                            <span className="text-gray-500 outline-font">/{yearly ? 'month' : 'month'}</span>
                        </div>
                        <p className="text-sm text-gray-600 outline-font">For power users & agencies</p>
                    </div>
                    <Button variant="outline" className="w-full mb-6 outline-font" onClick={() => handleUpgrade('pro-plus')}>Upgrade to Pro Plus</Button>
                    <div className="features space-y-3">
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Unlimited Resumes</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Premium AI Summary & Optimization</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Unlimited Job Application Automation</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">AI Cover Letter Generator (Unlimited)</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Advanced Application Logs & Analytics</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Priority Support</span>
                        </div>
                        <div className="feature-item flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="outline-font text-sm">Dedicated Account Manager</span>
                        </div>
                    </div>
                </Card>
            </div>        </div>

      </div>
    </>
  )
}

export default Pricing
