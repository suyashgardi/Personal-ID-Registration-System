import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ForgotPassword from "../Components/FormComponents/ForgotPassword";
import { useVerification } from "../CustomHooks/verification";
import API from '../../api.js';

function Recover() {
  const [formData, setFormData] = useState({ email: "", otp: "", password: "", confirmPassword: "", action: "" });
  const navigate = useNavigate();
  const { isEmail, isVerified, resetToken, handleRequest, handleVerification } = useVerification(formData, setFormData);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${API}/api/newpassword`, { ...formData, resetToken });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Backend Error:", error);
    }
  };

  return (
    <div>
      <ForgotPassword
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleVerification={handleVerification}
        handleRequest={handleRequest}
        isEmail={isEmail}
        isVerified={isVerified}
        returnLogin={() => navigate("/login")}
      />
    </div>
  );
}

export default Recover;
