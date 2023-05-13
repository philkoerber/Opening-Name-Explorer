import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useChessStore from './chessStore';

function Welcome(props) {

    const {setIsLoaded} = useChessStore()

    const buttonStyles = {
  whileTap: { scale: 0.9 },
  whileHover: { backgroundColor: "#FBE8DA", color: "#8A897C"},
  transition: {duration: 0.1}
    }
    
    return (
        <div className='w-screen h-screen top-0 flex justify-center font-comfortaa absolute'> 
            <div className='max-w-[480px] m-auto h-fit'>
                <div className=''>
                    <p className='font-bold text-center mb-8 text-2xl'>
                    Explore the world of chess openings and uncover a rich collection of opening names.
                </p>
                </div>
                
                <div className='w-[75%] m-auto'>
                    <p className='mb-12 text-justify'>
                    Discover popular variations and expand your repertoire. Enhance your chess knowledge and strategies with this Opening Explorer. Start exploring now and unravel the names behind successful or unsuccessful chess openings!
                </p>
                </div>
                
                <motion.div
                    className='bg-dark1 text-xl w-fit m-auto rounded-full text-light2 cursor-pointer p-4 -mt-2 border-2 border-dark0 shadow-md'
                    {...buttonStyles}
                    onClick={()=>{setIsLoaded(true)}}
                >
                    Start!
                </motion.div>
            </div>
            
        </div>
    );
}

export default Welcome;