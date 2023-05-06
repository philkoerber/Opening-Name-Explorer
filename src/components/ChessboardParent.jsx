import { Chess } from 'chess.js';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Chessboard } from 'react-chessboard';
import useChessStore from './chessStore';

import { AiFillBackward, AiFillFastBackward, AiFillFastForward, AiFillForward } from "react-icons/ai";
import {SiLichess} from "react-icons/si"
import {TbRotateRectangle} from "react-icons/tb"
import fenToPosition from './fenToPosition';


const buttonStyles = "flex cursor-pointer w-12 h-12 justify-center items-center bg-dark2 rounded-xl drop-shadow-xl"
const buttonAnimation = {whileHover: {backgroundColor: "#FBE8DA"}, whileTap: {scale: 0.9}, transition: {duration: 0.05}}
const iconStyles = "w-[50%] h-[100%]"


function ChessboardParent() {


    
    const game = useChessStore(state => state.game);
    const setGameWithFen = useChessStore(state => state.setGameWithFen)
    const goBack = useChessStore(state => state.goBack);
    const goForward = useChessStore(state => state.goForward);
    const fastForward = useChessStore(state => state.fastForward);
    const fastBackward = useChessStore(state => state.fastBackward);
    const arrows = useChessStore(state => state.arrows);
    const [currentOpening, setCurrentOpening] = useState(fenToPosition(game))
    const [boardOrientation, setBoardOrientation] = useState("white");
    const [boardWidth, setBoardWidth] = useState(400);
    const ref = useRef(null);

    
    useEffect(() => {
    function handleResize() {
      setBoardWidth(ref.current?.clientWidth - 18);
        }
        handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(()=>{setCurrentOpening(fenToPosition(game))},[game])


    const onDrop = (sourceSquare, targetSquare) => {
        const move = { from: sourceSquare, to: targetSquare, promotion: "q" }
        const gameCopy = new Chess(game);
    try {
        const result = gameCopy.move(move);
        if (result === null) {
            // illegal move
            console.log("illegal move")
        }
        setGameWithFen(gameCopy.fen());
        return true;
    } catch (error) {
        return false;
    }
    }
    
    return (
        <div className='drop-shadow-xl break-inside-avoid'>
        <motion.div className='h-full w-full max-w-[480px] m-auto bg-dark1 sd:rounded-b-xl md:rounded-xl p-2 break-inside-avoid z-10 relative border-4 border-dark0' ref={ref}>
            <Chessboard
                customDarkSquareStyle={{ backgroundColor: "#8A897C" }}
                customLightSquareStyle={{backgroundColor: "#FBE8DA"}}
                boardWidth={boardWidth}
                boardOrientation={boardOrientation}
                position={game}
                customArrows={arrows}
                customArrowColor='#BB2511'
                onPieceDrop={onDrop} />
                
            <div className='flex justify-between m-2'>
                <motion.div className={buttonStyles} {...buttonAnimation} onClick={()=>{setBoardOrientation(boardOrientation==="white"?"black":"white")}}><TbRotateRectangle className={iconStyles} /></motion.div>
                <motion.div className={buttonStyles} {...buttonAnimation} onClick={()=>{fastBackward()}}><AiFillFastBackward className={iconStyles}/></motion.div>
                <motion.div className={buttonStyles} {...buttonAnimation} onClick={()=>{goBack()}}><AiFillBackward className={iconStyles}/></motion.div>
                <motion.div className={buttonStyles} {...buttonAnimation} onClick={()=>{goForward()}}><AiFillForward className={iconStyles}/></motion.div>
                <motion.div className={buttonStyles} {...buttonAnimation} onClick={() => { fastForward() }}><AiFillFastForward className={iconStyles} /></motion.div>
                <motion.div className={buttonStyles} {...buttonAnimation} onClick={() => { window.open("https://lichess.org/analysis/" + game, "_blank") }}><SiLichess className="w-[60%] h-[60%]" /></motion.div>
            </div>

            
        </motion.div>
            <motion.div
                key={game}
                className='rounded-b-xl bg-dark0 w-fit max-w-[70%] -z-10 font-comfortaa break-inside-avoid text-center px-2 text-1xl ml-[20%] '
                initial={{ y: "-120%" }}
                animate={{y: 0, transition: {duration: 0.8, type: "linear"}}}> 
                {currentOpening?.name}
        </motion.div>
        </div>
        
    );
}

export default ChessboardParent;