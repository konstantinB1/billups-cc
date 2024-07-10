import { useQuery } from '@tanstack/react-query';
import { getChoices, getMatchesHistory } from '../services';
import { Match } from '../../../common';

export default function useGameData() {
    const choices = useQuery({
        queryKey: ['choices'],
        queryFn: async () => {
            const { data } = await getChoices();
            return data;
        }
    });

    const matches = useQuery({
        queryKey: ['matches'],
        queryFn: async () => {
            console.log()
            const { data } = await getMatchesHistory();
            return data as Match[];
        }
    });

    return {
        choices: choices.data,
        matches: matches.data,
        refetchMatches: matches.refetch
    };
}
