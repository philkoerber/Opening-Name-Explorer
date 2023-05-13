import { useState } from "react"
import ChessboardParent from "./components/ChessboardParent"
import OpeningTree from "./components/OpeningTree"
import horse from "./components/horse.svg"
import Welcome from "./components/Welcome"
import useChessStore from "./components/chessStore"


function App() {
  const { isLoaded } = useChessStore()

  return (
    <>
      
      <div className="fixed h-screen flex justify-center z-0 w-fit left-[55%]">
        <img className="mr-auto -scale-x-100" src={horse} />
      </div>
      {isLoaded ?
        <div className="absolute top-0 sd:columns-1 md:columns-2 lg:columns-2 xl:columns-3 w-screen max-w-[1620px] mx-auto md:p-4">
      <ChessboardParent />
      <OpeningTree/>
        </div>
        :
        <Welcome/>
      }
      
      
    </>
    
  )
}

export default App
