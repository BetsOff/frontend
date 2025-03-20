import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../api_url.json'
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import { useSeasonContext } from './useSeasonContext';

export const emptyMatchSet: MatchSet = {
  match_number: 0,
  num_playoff_matches: 0,
  num_regular_season_matches: 0,
  playoff: false,
  round_name: null,
  status: 'unknown',
  start_date: '',
  end_date: '',
  starting_credits: 0,
  matches: []
};

// Define the context type
interface MatchSetContextType {
  matchSet: MatchSet;
  setMatchSet: React.Dispatch<React.SetStateAction<MatchSet>>;
}

// Create the context with a default value
const MatchSetContext = createContext<MatchSetContextType | undefined>(undefined);

export const fetchMatchSet = async (season: Season) => {
  if (season.id == 0 || season.id == undefined) {
    return emptyMatchSet
  }
  try {
    const response = await axios.get(api['url'] + `/matches/get/?season_id=${season.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Token ${storageGetItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching default match set:', error);
    return emptyMatchSet
  }
};

// Create a provider component
export const MatchSetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matchSet, setMatchSet] = useState<MatchSet>(emptyMatchSet);
  const { season } = useSeasonContext();

  useEffect(() => {
    const fetchData = async () => {
        setMatchSet(await fetchMatchSet(season));
    }
    fetchData();
  }, [season]);


  return (
    <MatchSetContext.Provider value={{ matchSet, setMatchSet }}>
      {children}
    </MatchSetContext.Provider>
  );
};

// Custom hook to use the MatchContext
export const useMatchSetContext = (): MatchSetContextType => {
  const context = useContext(MatchSetContext);
  if (!context) {
    throw new Error('useMatchContext must be used within a MatchProvider');
  }
  return context;
};
