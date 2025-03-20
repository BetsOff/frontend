import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { storageGetItem } from "@/util/Storage";
import apiRoutes from "@/routes/apiRoutes";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export const emptySeason: Season = {
    id: 0,
    league: 0,
    season_number: 0,
    start_date: "",
    end_date: "",
    num_matches: 0,
    matchup_length: 0,
    break_length: 0,
    scoring_type: "",
    bets_per_match: null,
    credits_per_match: null,
    teams_in_playoffs: 0
}

interface SeasonContextType {
    season: Season;
    setSeason: React.Dispatch<React.SetStateAction<Season>>;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const fetchSeason = async (league: League) => {
    if (league.id == 0) {
        return emptySeason;
    }
    try {
        const response = await axios.get(apiRoutes.season.get + `?league_id=${league.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Token ${storageGetItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching season:', error)
        return emptySeason;
    }
}

export const SeasonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [season, setSeason] = useState<Season>(emptySeason);
    const league = useSelector((state: RootState) => state.league.currentLeague);
  
    useEffect(() => {
        const fetchData = async () => {
            if (!league) return;
            setSeason(await fetchSeason(league));
        }
        fetchData();
    }, [league]);

    return (
        <SeasonContext.Provider value={{ season, setSeason }}>
            {children}
        </SeasonContext.Provider>
    );
};

export const useSeasonContext = (): SeasonContextType => {
    const context = useContext(SeasonContext);
    if (!context) {
        throw new Error('useSeasonContext must be used within a SeasonProvider')
    }
    return context;
}