import React from 'react'
import {assets} from '../assets/assets.js'

const Header = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center my-20'>
      <div className='text-stone-500 inline-flex gap-2 text-center bg-white px-6 py-1 rounded-full border border-nuetral-500'>
        <p>Best Text to Image Genarator</p>
        <img src={assets.star_icon} alt="" />
      </div>


      <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto text-center  mt-10'>
        Turn text to <span className='text-blue-600'>Image</span>,In Seconds.</h1>

        <p className='text-center mx-auto max-w-xl mt-5'>Umleash with your Creativity with AI, Turn your Imaganition into visual arts in second
           - just type and Watch the magic happen</p>

       <button className='sm:text-lg flex rounded text-white bg-black w-auto mt-8 px-12 py-2.5 gap-2 items-center rounded-full'>
        Generate Image
        <img className='h-6' src={assets.star_group} alt="" />
        </button>  


        <div className='flex flex-wrap gap-3 justify-center mt-16'>
        {Array(6).fill('').map((item,index)=>(
          <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' 
          src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} alt="" key={index} width={70} />
        ))}  
        </div>  

        <p className='mt-2 text-neutral-600'>Genarated images From Imagify</p>
    </div>
  )
}

export default Header
