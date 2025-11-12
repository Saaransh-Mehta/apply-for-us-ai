import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const navItems = [
   {
        name:"Why us",
        link:"#whyus"
    },{
        name:"About us",
        link:"/about"
    },
    {
      name:"Pricing",
      link:"/pricing"
    },{
        name:"Cases",
        link:"/cases"
    },{
        name:"Blog",
        link:"/blog"
    }
]
const Navbar = () => {
const navigate = useNavigate()
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  return (
    <div className={`navbar fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 text-black/80 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md max-w-7xl mx-auto rounded-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
      <div className="left flex items-center gap-20">
        <div className="logo outline-font font-bold text-xl">ApplyForMe</div>
        <div className="navItems flex gap-4">
            {navItems.map((item)=>(
                <a key={item.name} href={item.link} className="mx-2 outline-font hover:text-black/90">{item.name}</a>
            ))}
        </div>
      </div>
      <div className="right ">
            <div className="button flex gap-4">
              <Button variant={'outline'} className="outline-font">Book a Demo</Button>
              <div className="">
                  <svg height="40" width="2" xmlns="http://www.w3.org/2000/svg">
                   <line x1="0" y1="0" x2="0" y2="200" style={{ stroke: '#D3D3D3', strokeWidth: 14 }} />
                    </svg>
                </div>
              <Button onClick={()=>navigate('/login')} className="outline-font">Sign up</Button>
            </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
