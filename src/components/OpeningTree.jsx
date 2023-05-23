import React, { useCallback, useEffect, useState } from 'react';
import useChessStore from './chessStore';
import {motion } from "framer-motion"
import { Chess } from 'chess.js';
import fenToPosition from './fenToPosition';

const buttonStyles = {
  whileTap: { scale: 0.9 },
  whileHover: { backgroundColor: "#FBE8DA", color: "#8A897C"},
  transition: {duration: 0.1}
}

function OpeningTree() {

  const game = useChessStore(state => state.game);
  const {setGameWithFen} = useChessStore()
  const setArrows = useChessStore(state => state.setArrows)

  const [currentOpening, setCurrentOpening] = useState(fenToPosition(game));
  const randOffset = () => { return Math.floor(Math.random() * 50) - 25 };

  useEffect(() => {
        setCurrentOpening(fenToPosition(game))
         window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [game])

  const handleGen1Click = useCallback((move) => {
    const gameCopy = new Chess(game);
    gameCopy.move(move);
    setGameWithFen(gameCopy.fen())
  })

  const handleGen2Click = useCallback((move1, move2) => {
    const gameCopy = new Chess(game);
    gameCopy.move(move1);
    setGameWithFen(gameCopy.fen());
    gameCopy.move(move2);
    setTimeout(()=>setGameWithFen(gameCopy.fen()), 500);
  })

  const handleHover = useCallback((move1, move2) => {
    try {
      if (move1) {
      const arrows = [];
      const gameCopy = new Chess(game);
      const formatMove1 = gameCopy.move(move1);
      if (move2) {
        const gameCopy2 = new Chess(game);
        if(gameCopy2){gameCopy2.move(move1);}
        
        const formatMove2 = gameCopy2.move(move2)
        arrows.push([formatMove2.from, formatMove2.to])
      }
      setArrows([...arrows, [formatMove1.from, formatMove1.to]])
    }
    else {
      setArrows([])
    }
    }
    catch {
      return null
    }
  })

  return (
    
      <div className='font-comfortaa w-[90%] h-screen m-auto'>

        {/* CONTINUATION 1st GENERATION */}
        <div className='columns-2 text-center'>
          {!currentOpening ? null : currentOpening.continuations.map((continuation) => {
            const continuations2 = fenToPosition(continuation.fen).continuations
            return (
              <motion.div
                key={continuation.positionName}
                className='p-2 rounded-3xl break-inside-avoid drop-shadow-xl '
                >
                
                <motion.div
                  key={continuation.positionName}
                   initial={{ opacity: 0, x: randOffset()/2,transition:{delay: (randOffset()+25)/70} }}
                  animate={{ opacity: 1}}
                  >
                  <motion.div
                  key={continuation.positionName + "gen1"}
                  className='cursor-pointer text-xl bg-dark1 text-light2 rounded-full w-fit m-auto p-4 pt-2 break-inside-avoid border-2 border-dark0'
                  {...buttonStyles}
                  onClick={() => { handleGen1Click(continuation.move) }}
                  onHoverStart={() => { handleHover(continuation.move) }}
                    onHoverEnd={() => { handleHover(null) }}
                    onTouchStart={()=>{handleHover(null)}}
                >
                  <h1 className='text-md md:text-md lg:text-lg text-accent w-full'>{continuation.move}</h1>
                  <h1 className='text-md md:text-lg lg:text-xl'>{continuation.positionName}</h1>
                  
                </motion.div>
                </motion.div>
                

                {/* CONTINUATION 2nd GENERATION */}
                <motion.div className='m-auto'>
                  {continuations2.map((continuation2, index2) => {
                  const bgColor = index2 % 2 === 0 ? 'bg-dark2' : 'bg-dark1';
                    return (
                      <motion.div
                        key={continuation2.positionName}
                        initial={{ opacity: 0, x: randOffset() }}
                        animate={{ opacity: 1, transition: {delay: index2 / (continuations2.length / 1.5) }}}>
                        <motion.div
                      className={`${bgColor} rounded-full text-light2 cursor-pointer w-fit m-auto p-3 pt-1 -mt-2 border-2 border-dark0`}
                      {...buttonStyles}
                          onClick={() => { handleGen2Click(continuation.move, continuation2.move) }}
                      onHoverStart={() => { handleHover(continuation.move, continuation2.move) }}
                      onHoverEnd={()=>{ handleHover(null)}}
                    >
                          <p className='text-xs lg:text-md text-accent w-full'>{continuation.move} + {continuation2.move}</p>
                      <p className='text-xs lg:text-md'>{continuation2.positionName}</p>
                    </motion.div>
                        </motion.div>
                    )
                })}
                </motion.div>
                
              </motion.div>)
          })}</div>

            
        </div>
        
    );
}

export default OpeningTree;