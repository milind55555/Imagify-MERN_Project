import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const {user,setShowLogin}=useContext(AppContext)
  const navigate =useNavigate()
  const onClickHandler=()=>{
    if(user){
      navigate('/buy')
    }else{
      setShowLogin(true)
    }
  }
  return (
    <motion.div className='flex flex-col items-center justify-center text-center my-20'
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    >
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{delay: 0.2 , duration:0.8  }}
      
      className='text-stone-500 inline-flex gap-2 text-center bg-white px-6 py-1 rounded-full border border-nuetral-500'>
        <p>Best Text to Image Genarator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>


      <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{delay: 0.4 , duration: 2  }}
      
      className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto text-center  mt-10'>
        Turn text to <span className='text-blue-600'>Image</span>,In Seconds.</motion.h1>

        <motion.p 
        initial={{ opacity: 0 ,y:20}}
        animate={{ opacity: 1 ,y:0}}
        transition={{delay: 0.6 , duration: 0.8  }}
        
        className='text-center mx-auto max-w-xl mt-5'>Umleash with your Creativity with AI, Turn your Imaganition into visual arts in second
           - just type and Watch the magic happen</motion.p>

       <motion.button
        onClick={onClickHandler}

       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{default:{duration: 0.5},opacity:{delay:0.8,duration:1} }}
       
       className='sm:text-lg flex rounded text-white bg-black w-auto mt-8 px-12 py-2.5 gap-2 items-center rounded-full'>
        Generate Image
        <img className='h-6' src={assets.star_group} alt="" />
        </motion.button>  


        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='flex flex-wrap gap-3 justify-center mt-16'>
        {Array(6).fill('').map((item,index)=>(
          <motion.img
          whileHover={{scale: 1.05 ,duration: 0.1}}
          className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' 
          src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} alt="" key={index} width={70} />
        ))}  
        </motion.div>  

        <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}  
        transition={{ delay: 1.2, duration: 0.8 }}
        className='mt-2 text-neutral-600'>Genarated images From Imagify</motion.p>
    </motion.div>
  )
}

export default Header
