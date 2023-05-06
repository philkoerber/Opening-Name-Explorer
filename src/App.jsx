import ChessboardParent from "./components/ChessboardParent"
import OpeningTree from "./components/OpeningTree"

function App() {

  return (
    <div className="sd:columns-1 md:columns-2 lg:columns-2 xl:columns-3 w-screen max-w-[1620px] mx-auto md:p-4">
      <ChessboardParent />
      <OpeningTree/>
    </div>
  )
}

export default App
