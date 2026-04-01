import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from '../../api.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${API}/api/me`, { withCredentials: true });
        if (response.data.loggedIn) {
          setUser(response.data.user);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  return { user, isLoading };
}
