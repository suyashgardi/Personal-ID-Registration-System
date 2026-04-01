import { useState } from "react";
import axios from "axios";
import API from '../../api.js';

export function useVerification(formData, setFormData) {
  const [isVerified, setIsVerified] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    const actiondata = { ...formData, email: formData.email.trim(), action: "Send OTP" };
    setFormData(actiondata);
    try {
      const response = await axios.post(`${API}/api/validation`, actiondata);
      if (response.data.isSent) {
        setIsEmail(true);
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const actiondata = { ...formData, action: "verify OTP" };
    try {
      const response = await axios.post(`${API}/api/validation`, actiondata);
      if (response.data.isVerified) {
        setIsVerified(true);
        setResetToken(response.data.resetToken);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return { isEmail, isVerified, resetToken, handleRequest, handleVerification };
}
