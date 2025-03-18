import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface PlayerOneBetListContextType {
    playerOneBetList: LeagueBets[];
    setPlayerOneBetList: React.Dispatch<React.SetStateAction<LeagueBets[]>>;
}

const PlayerOneBetListContext = createContext<PlayerOneBetListContextType | undefined>(undefined);

export const PlayerOneBetListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [playerOneBetList, setPlayerOneBetList] = useState<LeagueBets[]>([]);
    return (
        <PlayerOneBetListContext.Provider value={{ playerOneBetList, setPlayerOneBetList }}>
            {children}
        </PlayerOneBetListContext.Provider>
    );
}

export const usePlayerOneBetListContext = (): PlayerOneBetListContextType => {
    const context = useContext(PlayerOneBetListContext);
    if (!context) {
        throw new Error('usePlayerOneBetListContext must be used within a PlayerOneBetListProvider')
    }
    return context
}