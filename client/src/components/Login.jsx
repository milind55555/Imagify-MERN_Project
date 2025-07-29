import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Login = () => {

    const [state,setState] =useState('Login')

    const {setShowLogin} = useContext(AppContext)

    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return ()=>{
            document.body.style.overflow = 'unset'
        }
    },[])
  return (
    <div className='absolute fixed top-0 left-0 bottom-0 right-0  bg-black/30 z-10 flex 
    items-center justify-center backdrop-blur-sm'>

        <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500' >
            <h1 className='text-2xl text-neutral-700 text-center font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

            { state != 'Login' &&  <div className='border px-6 py-2 mt-5 flex items-center gap-2 rounded-full'>
                <img src={assets.profile_icon} alt="" width={25} />
                <input type="text" className='outline-none text-sm' placeholder='Full Name' required/>
            </div>}

            <div className='border px-6 py-2 mt-5 flex items-center gap-2 rounded-full'>
                <img src={assets.email_icon} alt=""  />
                <input type="email" className='outline-none text-sm' placeholder='Email Id' required/>
            </div>

            <div className='border px-6 py-2 mt-5 flex items-center gap-2 rounded-full'>
                <img src={assets.lock_icon} alt="" />
                <input type="password" className='outline-none text-sm' placeholder='Password' required/>
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forget Password ?</p>

            <button className='bg-blue-600 w-full rounded-full  text-white py-2'>{state === 'Login' ? 'Login':'Create Account'}</button>

           {state == 'Login' ? <p className='mt-5 text-center
            '>Don't have account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState('Sign Up')}>Sign Up</span></p>

            :
            <p className='mt-5 text-center
            '>Already have account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState('Login')}>Login</span></p>}

            <img 
            onClick={()=>setShowLogin(false)}
            src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>

        </motion.form>
      
    </div>
  )
}

export default Login
