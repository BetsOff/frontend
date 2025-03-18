import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useMatchSetContext } from './useMatchSetContext';
import temp from '../temp_variables.json'
import { storageGetItem } from '@/util/Storage';

export const emptyMatch: Match = {
  match_number: 0,
  playoff: false,
  start_date: "",
  end_date: "",
  match_id: 0,
  winner: null,
  participants: [
    {
      user_id: 0,
      user: '',
      color: 'black',
      record: '0-0-0',
      credits_remaining: 0,
      score: 0,
    },
    {
      user_id: 0,
      user: '',
      color: 'black',
      record: '0-0-0',
      credits_remaining: 0,
      score: 0,
    }
  ]
}

// Define the context type
interface MatchContextType {
  match: Match;
  setMatch: React.Dispatch<React.SetStateAction<Match>>;
}

// Create the context with a default value
const MatchContext = createContext<MatchContextType | undefined>(undefined);

// Create a provider component
export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [match, setMatch] = useState<Match>(emptyMatch);
  const { matchSet } = useMatchSetContext();

  useEffect(() => {
    const getDefaultMatch = () => {
      if (matchSet.matches.length === 0) {
        return emptyMatch
      }
      for (let i = 0; i < matchSet.matches.length; i++) {
        for (let j = 0; j < matchSet.matches[i].participants.length; j++) {
          if (matchSet.matches[i].participants[j].user == storageGetItem('user')) {
            return matchSet.matches[i];
          }
        }
      }
      return matchSet.matches[0];
    };

    setMatch(getDefaultMatch())
  }, [matchSet]);

  return (
    <MatchContext.Provider value={{ match, setMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

// Custom hook to use the MatchContext
export const useMatchContext = (): MatchContextType => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatchContext must be used within a MatchProvider');
  }
  return context;
};
