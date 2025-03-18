import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import api from '../api_url.json';
import { storageGetItem } from "@/util/Storage";
import { useLeagueSetContext } from "./useLeagueSetContext";

export const emptyLeague: League = {
    id: 0,
    name: "",
    date_created: "",
    commissioner: false,
    max_players: 0,
    seasons: [],
}

interface LeagueContextType {
    league: League;
    setLeague: React.Dispatch<React.SetStateAction<League>>;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [league, setLeague] = useState<League>(emptyLeague);
    const { leagueSet, setLeagueSet } = useLeagueSetContext();
    const { isLoggedIn } = useAuthContext();

    useEffect(() => {
        const getDefaultLeague = () => {
            let len = leagueSet.length
            if (len > 0) {
                return leagueSet[len - 1];
            } else {
                return emptyLeague
            }
        }
        setLeague(getDefaultLeague());
    }, [leagueSet])

    return (
        <LeagueContext.Provider value={{ league, setLeague }}>
            {children}
        </LeagueContext.Provider>
    );
};

export const useLeagueContext = (): LeagueContextType => {
    const context = useContext(LeagueContext);
    if (!context) {
        throw new Error('useLeagueContext must be used within a LeagueProvider')
    }
    return context;
}