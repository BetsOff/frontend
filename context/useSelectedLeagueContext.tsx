import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const emptySelectedLeague: string = 'MLB'

interface SelectedLeagueContextType {
    selectedLeague: string;
    setSelectedLeague: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedLeagueContext = createContext<SelectedLeagueContextType | undefined>(undefined);

export const SelectedLeagueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedLeague, setSelectedLeague] = useState<string>(emptySelectedLeague);
    return (
        <SelectedLeagueContext.Provider value={{ selectedLeague, setSelectedLeague}}>
            {children}
        </SelectedLeagueContext.Provider>
    );
}

export const useSelectedLeagueContext = (): SelectedLeagueContextType => {
    const context = useContext(SelectedLeagueContext);
    if (!context) {
        throw new Error('useSelectedLeagueContext must be used within a SelectedLeagueProvider');
    }
    return context
}