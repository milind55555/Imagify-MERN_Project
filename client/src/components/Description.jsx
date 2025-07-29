import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Description = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='flex flex-col items-center justify-center text-center my-24 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold'>Create AI Images</h1>
      <p className='text-gray-500 mb-8 '>Turn your Imagination Into Visual</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-xl ' />
        <div>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Genarator </h2>
            <p className='text-gray-600'>Easily bring your ideas to life  with our free AI image generator .Whether you need stunning visuals or unique imaginary 
                ,our tool transforms your text prompts into captivating images in seconds.Image it,Describe it , and watch it come to life instantly.
            </p><br />
            <p className='text-gray-600 '>
                Simply enter your text prompt, and our advanced AI algorithms will generate a high-quality image that matches your description.
                No design skills required! Our user-friendly interface makes it easy for anyone to create stunning visuals
                in just a few clicks. Whether you're a content creator, marketer, or simply looking to explore your creativity, our AI image generator is here to help.
            </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
