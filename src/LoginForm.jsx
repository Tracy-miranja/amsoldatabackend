import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, } from "react-icons/fa"; 
import logo from "./assets/amsolJobVacancies.png"

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const UserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://amsol-api.onrender.com/api/login", { email, password }, {
        withCredentials: true,
      });
  
      console.log(response.data);
  
      const { message, role } = response.data; 
  
      setEmail("");
      setPassword("");
      setError("");
  
      // Check if the user role is allowed to access the dashboard
      if (["admin", "super admin", "system"].includes(role.toLowerCase())) {
        // Only set the success message if the role is allowed
        setMessage(message);
        
        // Redirect the user after successful login
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      } else {
        // If the role is not allowed, set an error message and do not set the success message
        setError("You do not have access to the dashboard.");
        setMessage(""); // Ensure success message is cleared
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        setMessage(""); // Clear success message on error
      } else {
        setError("You are not authorised, access denied.");
        setMessage(""); // Clear success message on unexpected error
      }
    }
  };
  
  
  return (
    <div className="overflow-hidden">
      <div className=" w-[100%] h-[50px] bg-gradient-to-r from-[#25b2e6]  to-blue-500 flex items-center justify-around shadow-2xl p-8 text-white gap-5 ">
        <div className="bg-white rounded-full w-[200px] flex items-center justify-center"> 
          <img src={logo} alt="hrOutsourcing" className="w-[110px] p-1" />
        </div>
        <div className="flex flex-row items-center gap-5">
          <Link className="text-white flex flex-row gap-2" to="/"><FaHome className="mt-1"/>Home</Link>
          
        </div>
      </div>
      <div className="login h-[80vh]">
      <div className="login-background"></div>
      <div className="login-content">
      
      
      <div className="flex mt-10 items-center h-screen  flex-col">
       
        <div className="flex flex-col  w-[400px] h-fit p-6 rounded-lg shadow-2xl text-center">
          <h1 className="text-2xl font-semibold mb-4 text-white ">Login</h1>
          <form className="flex flex-col text-sm " onSubmit={UserLogin}>
            <div className="mb-4">
              <label>Email <span className="text-red-500">*</span>:</label>
              <input
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                className="ml-2 w-full p-1 rounded text-gray-900 border border-gray-300 focus:border-blue-500 p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-black">Password <span className="text-red-500">*</span>:</label>
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                className="ml-2 w-full p-1 rounded text-gray-900 border border-gray-300 focus:border-blue-500 p-2"
                required
              />
             
            </div>
            <div className="flex items-center justify-center"><button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 mt-2 w-[100px]">Log in</button></div>
            
            <Link className="pt-5 underline text-blue-700" to="/Signup">Create account</Link> {/* Link to password recovery */}
          </form>
          
          {message && <p className="mt-4 text-green-500">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Form;
