import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupForm from "../Components/FormComponents/SignupForm";
import axios from "axios";
import API from '../../api.js';
import { useVerification } from '../CustomHooks/verification';

function Signup() {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
    action: "",
    caller: "signupform",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { isVerified, handleRequest, handleVerification } =
    useVerification(formData, setFormData);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("please verify your email");
      return null;
    }
    try {
      const response = await axios.post(`${API}/api/users`, formData);
      alert("SignUP Successful \nproceed to Log-In");
      navigate("/login");
    } catch (error) {
      console.error("error: ", error);
      alert(
        error.response?.data?.error ||
          error.response?.data ||
          "SignUp Failed \n Try Again!",
      );
      navigate("/signup");
    }
  };

  return (
    <SignupForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
      isValidated={isVerified}
      handleVerification={handleVerification}
      handleSendOTP={handleRequest}
      isSent={false}
    />
  );
}

export default Signup;
