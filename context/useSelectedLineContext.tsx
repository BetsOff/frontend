import React, { createContext, useState, useContext, ReactNode } from 'react';

type SelectedLine = {
    market: string;
    id: number;
    first_selection_picked: boolean;
    wager: number
}

const emptySelectedLine: SelectedLine = {
    market: '',
    first_selection_picked: false,
    id: 0,
    wager: 0
}

interface SelectedLineContextType {
    selectedLine: SelectedLine;
    setSelectedLine: React.Dispatch<React.SetStateAction<SelectedLine>>;
}

const SelectedLineContext = createContext<SelectedLineContextType | undefined>(undefined);

export const SelectedLineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedLine, setSelectedLine] = useState<SelectedLine>(emptySelectedLine);
    return (
        <SelectedLineContext.Provider value={{ selectedLine, setSelectedLine}}>
            {children}
        </SelectedLineContext.Provider>
    );
}

export const useSelectedLineContext = (): SelectedLineContextType => {
    const context = useContext(SelectedLineContext);
    if (!context) {
        throw new Error('useSelectedLineContext must be used within a SelectedLineProvider');
    }
    return context
}