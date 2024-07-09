import { randomNumberEndpoint } from '../../common/src/constants';

export const getRandomNumber = async (): Promise<{
    random_number: number;
}> => {
    try {
        const base = randomNumberEndpoint;
        const res = await fetch(base + '/random');
        return await res.json();
    } catch (e) {
        // fallback
        console.error(
            'Unable to fetch random number',
            (e as Error)?.message || e
        );
        return { random_number: Math.floor(Math.random() * 100) };
    }
};
