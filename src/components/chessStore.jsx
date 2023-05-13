import { create } from 'zustand'


const useChessStore = create((set) => ({
    isLoaded: false,
    setIsLoaded: (boolean)=>set(()=>({isLoaded: boolean})),
    //GAME ENGINE

    game: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",

    fenHistory: ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"],
    fenHistoryIndex: 0,

    setGameWithFen: (fen) => set((state) => {
        if(state.fenHistoryIndex === state.fenHistory.length -1){return({
        game: fen,
        fenHistory: [...state.fenHistory, fen],
        fenHistoryIndex: state.fenHistoryIndex+1,
        })}
        else {
           const newFenHistory = state.fenHistory.slice(0, state.fenHistoryIndex + 1);
        newFenHistory.push(fen);
        return {
            game: fen,
            fenHistory: newFenHistory,
            fenHistoryIndex: newFenHistory.length - 1,
        };
        }
    }),

    //GAME NAVIGATION

    goBack: () => set((state) =>
        {if(state.fenHistoryIndex===0)
        {return null
    }
         else {
        return ({
        game: state.fenHistory[state.fenHistoryIndex - 1],
        fenHistoryIndex: state.fenHistoryIndex-1,
    })}
    }),

    goForward: () => set((state) => {
        if (state.fenHistoryIndex === state.fenHistory.length - 1)
        { return null }
        else {
            return ({
                game: state.fenHistory[state.fenHistoryIndex + 1],
                fenHistoryIndex: state.fenHistoryIndex+1,
        })}
    }),

    fastForward: () => set((state) => ({
        game: state.fenHistory[state.fenHistory.length - 1],
        fenHistoryIndex: state.fenHistory.length - 1
    })),

    fastBackward: () => set((state) => ({
        game: state.fenHistory[0],
        fenHistoryIndex: 0
    })),

    //ARROWS

    arrows: [],
    setArrows: (arrows) => set(() => ({
        arrows: arrows
    }))


}))

export default useChessStore;