import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const { backendUrl, setShowLogin, setToken, setUser, setCredit } = useContext(AppContext);

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);
    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          try {
            const creditsRes = await axios.get(
              `${backendUrl}/api/user/credits?userId=${data.user._id}`,
              { headers: { Authorization: `Bearer ${data.token}` } }
            );
            console.log('Login credits response:', creditsRes.data);
            if (creditsRes.data.success) {
              const credits = creditsRes.data.credits ?? 10;
              localStorage.setItem('creditBalance', credits);
              setCredit(credits);
            } else {
              console.error('Login credit fetch failed:', creditsRes.data.message);
              toast.error(creditsRes.data.message || 'Could not fetch credits');
              localStorage.setItem('creditBalance', 10);
              setCredit(10);
            }
          } catch (err) {
            console.error('Login credit fetch error:', err);
            toast.error('Error fetching credits');
            localStorage.setItem('creditBalance', 10);
            setCredit(10);
          }
          setShowLogin(false);
        } else {
          toast.error(`Login failed: ${data.message}`);
        }
      } else {
        // Basic client-side validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast.error('Invalid email format');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          try {
            const creditsRes = await axios.get(
              `${backendUrl}/api/user/credits?userId=${data.user._id}`,
              { headers: { Authorization: `Bearer ${data.token}` } }
            );
            console.log('Register credits response:', creditsRes.data);
            if (creditsRes.data.success) {
              const credits = creditsRes.data.credits ?? 10;
              localStorage.setItem('creditBalance', credits);
              setCredit(credits);
            } else {
              console.error('Register credit fetch failed:', creditsRes.data.message);
              toast.error(creditsRes.data.message || 'Could not fetch credits');
              localStorage.setItem('creditBalance', 10);
              setCredit(10);
            }
          } catch (err) {
            console.error('Register credit fetch error:', err);
            toast.error('Error fetching credits');
            localStorage.setItem('creditBalance', 10);
            setCredit(10);
          }
          setShowLogin(false);
        } else {
          toast.error(`Registration failed: ${data.message}`);
        }
      }
    } catch (error) {
      console.error(`${state} error:`, error);
      toast.error(error.response?.data?.message || `Something went wrong during ${state.toLowerCase()}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={OnSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        aria-label={`${state} form`}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== 'Login' && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="Profile" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
              aria-label="Full Name"
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="Email" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
            aria-label="Email"
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="Password" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
            aria-label="Password"
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer" aria-disabled="true">
          Forgot password?
        </p>

        <button
          className="bg-blue-600 w-full text-white py-2 rounded-full disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ? (
          <p className="mt-5 text-center">
            Don't have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-600 cursor-pointer"
              role="button"
              aria-label="Switch to Sign Up"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-blue-600 cursor-pointer"
              role="button"
              aria-label="Switch to Login"
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt="Close login form"
          role="button"
        />
      </motion.form>
    </div>
  );
};

export default Login;