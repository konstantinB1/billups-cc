import type { Choice } from '@billups-cc/common';

export const getChoices = async () => {
    const response = await fetch('/api/choices');
    return (await response.json()) as Choice[];
};

export const getChoice = async () => {
    const response = await fetch('/api/choice');
    return (await response.json()) as Choice;
};

export const play = async (userChoice: string) => {
    const response = await fetch('/api/play', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userChoice }),
    });

    return (await response.json()) as string;
};
