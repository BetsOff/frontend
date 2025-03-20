import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../api_url.json'
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export const emptyLeagueSet: League[] = []

interface LeagueSetContextType {
    leagueSet: League[];
    setLeagueSet: React.Dispatch<React.SetStateAction<League[]>>;
}

const LeagueSetContext = createContext<LeagueSetContextType | undefined>(undefined);

export const fetchLeagues = async () => {
    const user_id = storageGetItem('user_id');
    if (user_id == undefined) {
        return [];
    }
    try {
        const response = await axios.get(api['url'] + `/leagues/get/?user_id=${storageGetItem('user_id')}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Token ${storageGetItem('token')}`,
            }
        });
        
        return response.data;

    } catch (error) {
        console.error('Error fetching league: ', error);
        return [];
    }
}

export const LeagueSetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [leagueSet, setLeagueSet] = useState<League[]>(emptyLeagueSet);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        const fetchData = async () => {
            setLeagueSet(await fetchLeagues());
        }
        fetchData();
    }, [isLoggedIn]);

    return (
        <LeagueSetContext.Provider value={{ leagueSet, setLeagueSet }}>
            {children}
        </LeagueSetContext.Provider>
    );
};

export const useLeagueSetContext = (): LeagueSetContextType => {
    const context = useContext(LeagueSetContext);
    if (!context) {
      throw new Error('useLeagueContext must be used within a LeagueProvider');
    }
    return context;
  };