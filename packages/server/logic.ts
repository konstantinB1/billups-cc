import { getRandomNumber } from './random-number';

export enum ChoicesLiteral {
    Rock = 'Rock',
    Paper = 'Paper',
    Scissors = 'Scissors',
    Lizard = 'Lizard',
    Spock = 'Spock',
}

export enum Result {
    Win = 'Win',
    Lose = 'Lose',
    Draw = 'Draw',
}

export type Choice = {
    id: number;
    name: ChoicesLiteral;
};

const choices = Object.keys(ChoicesLiteral).reduce<Choice[]>((acc, key, i) => {
    const choice: Choice = {
        id: i + 1,
        name: ChoicesLiteral[key as keyof typeof ChoicesLiteral],
    };

    return [...acc, choice];
}, [] as Choice[]);

export const getChoiceByLiteral = (literal: ChoicesLiteral): Choice =>
    choices.find((choice) => choice.name === literal)!;

export const getRandomChoice = async (): Choice => {
    const { random_number } = await getRandomNumber();
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

export const getAllChoices = () => choices;
