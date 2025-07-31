import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [credit, setCredit] = useState(Number(localStorage.getItem('creditBalance')) || 10);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const validateToken = async () => {
    if (!token) return false;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUser(data.user);
        return true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('creditBalance');
        setToken('');
        setUser(null);
        setCredit(10);
        return false;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('creditBalance');
      setToken('');
      setUser(null);
      setCredit(10);
      return false;
    }
  };

  const loadCreditsData = async () => {
    if (!user || !user._id || !token) return;
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/credits?userId=${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('loadCreditsData response:', data);
      if (data.success) {
        const credits = data.credits ?? 10;
        setCredit(credits);
        localStorage.setItem('creditBalance', credits);
      } else {
        console.error('loadCreditsData failed:', data.message);
        toast.error(data.message || 'Error fetching credits');
        setCredit(10);
        localStorage.setItem('creditBalance', 10);
      }
    } catch (error) {
      console.error('loadCreditsData error:', error);
      toast.error(error.response?.data?.message || 'Error fetching credits');
      setCredit(10);
      localStorage.setItem('creditBalance', 10);
    }
  };

  const generateImage = async (prompt) => {
    if (!token) {
      toast.error('Please log in to generate images');
      setShowLogin(true);
      return null;
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        await loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message || 'Failed to generate image');
        await loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
        return null;
      }
    } catch (error) {
      console.error('Generate image error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate image');
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('creditBalance');
    setToken('');
    setUser(null);
    setCredit(10);
    navigate('/');
  };

  useEffect(() => {
    const initialize = async () => {
      if (token && !user) {
        const isValid = await validateToken();
        if (isValid) await loadCreditsData();
      } else if (token && user && user._id) {
        await loadCreditsData();
      }
    };
    initialize();
  }, [token, user]);

  const value = {
    token,
    setToken,
    user,
    setUser,
    showLogin,
    setShowLogin,
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    generateImage,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;