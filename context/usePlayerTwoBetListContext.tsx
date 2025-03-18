import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface PlayerTwoBetListContextType {
    playerTwoBetList: LeagueBets[];
    setPlayerTwoBetList: React.Dispatch<React.SetStateAction<LeagueBets[]>>;
}

const PlayerTwoBetListContext = createContext<PlayerTwoBetListContextType | undefined>(undefined);

export const PlayerTwoBetListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [playerTwoBetList, setPlayerTwoBetList] = useState<LeagueBets[]>([]);
    return (
        <PlayerTwoBetListContext.Provider value={{ playerTwoBetList, setPlayerTwoBetList }}>
            {children}
        </PlayerTwoBetListContext.Provider>
    );
}

export const usePlayerTwoBetListContext = (): PlayerTwoBetListContextType => {
    const context = useContext(PlayerTwoBetListContext);
    if (!context) {
        throw new Error('usePlayerTwoBetListContext must be used within a PlayerTwoBetListProvider')
    }
    return context
}