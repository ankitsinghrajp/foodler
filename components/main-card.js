import { Car, Leaf, Star } from 'lucide-react'
import React from 'react'

const MainCard = () => {
  return (
    <div className='flex py-40 mt-16 bg-gray-900 px-2 justify-center items-center'>
        <div className='flex justify-center items-center flex-col gap-5'>
             <div className="logo text-center text-4xl md:text-6xl font-bold text-orange-600 tracking-wide drop-shadow-sm">
                  PizzaHub
                </div>
           <h3 className='text-muted-foreground text-xl text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi facere magnam voluptates vitae error earum non reprehenderit sit.</h3>
           <div className='flex gap-4 items-center text-slate-400'>
            <div className='flex gap-1 text-sm items-center'>
                <Leaf className='h-4 w-4 text-green-500'/>
                Fresh Ingredients
            </div>
            <div className='flex gap-1 text-sm  items-center'>
                <Car className='h-4 w-4 text-blue-500'/>
                Fast Delivery
            </div>
            <div className='flex gap-1 text-sm items-center'>
                <Star className='h-4 w-4 text-yellow-400'/>
                5-star rated
            </div>
           </div>
        </div>
       
    </div>
  )
}

export default MainCard