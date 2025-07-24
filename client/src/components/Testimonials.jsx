import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Testimonials = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center my-20 py-12 '>

         <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Testimonal</h1>
         <p className='text-gray-500 mb-12 '>What Our User is Saying</p>

         <div className='flex flex-wrap gap-6'>
            {testimonialsData.map((testimonail,index)=>(
                <div key={index}>
                    <div>
                        <img src={testimonail.image} alt="" className='rounded-full w-14'/>
                        <h2>{testimonail.name}</h2>
                        <p>{testimonail.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonail.stars).fill().map((item,index)=>(
                                <img src={assets.rating_star} alt="" key={index} />
                            ))}
                        </div>
                        <p>{testimonail.text}</p>
                    </div>

                </div>
            ))}
         </div>
      
    </div>
  )
}

export default Testimonials
