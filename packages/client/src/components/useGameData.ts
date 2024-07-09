import { useQuery } from '@tanstack/react-query';
import { getChoices, getMatchesHistory } from '../services';

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
            const { data } = await getMatchesHistory();
            return data;
        }
    });

    return {
        choices: choices.data,
        matches: matches.data
    };
}
