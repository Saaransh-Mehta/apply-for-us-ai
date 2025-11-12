import { BrowserRouter , Routes,Route} from "react-router-dom"
import Home from "./screens/Home"
import Login from "./screens/Login"
import Register from "./screens/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Pricing from "./screens/Pricing"
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={
      <ProtectedRoute>
        <div>About Page</div>
      </ProtectedRoute>
    } />
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
