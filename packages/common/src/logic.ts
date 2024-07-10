import { ChoicesLiteral, Result } from './constants';
import { BeatsAndLoses, Choice } from './types';

const choices = [
    {
        id: 1,
        name: ChoicesLiteral.Rock,
        beats: [ChoicesLiteral.Scissors, ChoicesLiteral.Lizard],
        losesTo: [ChoicesLiteral.Paper, ChoicesLiteral.Spock]
    },
    {
        id: 2,
        name: ChoicesLiteral.Paper,
        beats: [ChoicesLiteral.Rock, ChoicesLiteral.Spock],
        losesTo: [ChoicesLiteral.Scissors, ChoicesLiteral.Lizard]
    },
    {
        id: 3,
        name: ChoicesLiteral.Scissors,
        beats: [ChoicesLiteral.Paper, ChoicesLiteral.Lizard],
        losesTo: [ChoicesLiteral.Rock, ChoicesLiteral.Spock]
    },
    {
        id: 4,
        name: ChoicesLiteral.Lizard,
        beats: [ChoicesLiteral.Spock, ChoicesLiteral.Paper],
        losesTo: [ChoicesLiteral.Rock, ChoicesLiteral.Scissors]
    },
    {
        id: 5,
        name: ChoicesLiteral.Spock,
        beats: [ChoicesLiteral.Scissors, ChoicesLiteral.Rock],
        losesTo: [ChoicesLiteral.Lizard, ChoicesLiteral.Paper]
    }
];

export const getChoiceByLiteral = (literal: ChoicesLiteral): Choice =>
    choices.find((choice) => choice.name === literal)!;

export const getChoiceById = (id: number): Choice => {
    const result = choices.find((choice) => choice.id === id);

    if (!result) {
        throw new Error('Invalid choice');
    }

    return result;
};

export const outcome = (
    userChoice: ChoicesLiteral,
    computerChoice: ChoicesLiteral
): Result => {
    let userResult: Result;

    if (
        userChoice === ChoicesLiteral.Rock &&
        computerChoice === ChoicesLiteral.Scissors
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Rock &&
        computerChoice === ChoicesLiteral.Lizard
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Paper &&
        computerChoice === ChoicesLiteral.Rock
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Paper &&
        computerChoice === ChoicesLiteral.Spock
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Scissors &&
        computerChoice === ChoicesLiteral.Paper
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Scissors &&
        computerChoice === ChoicesLiteral.Lizard
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Lizard &&
        computerChoice === ChoicesLiteral.Spock
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Lizard &&
        computerChoice === ChoicesLiteral.Paper
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Spock &&
        computerChoice === ChoicesLiteral.Scissors
    ) {
        userResult = Result.Win;
    } else if (
        userChoice === ChoicesLiteral.Spock &&
        computerChoice === ChoicesLiteral.Rock
    ) {
        userResult = Result.Win;
    } else if (userChoice === computerChoice) {
        userResult = Result.Draw;
    } else {
        userResult = Result.Lose;
    }

    return userResult;
};

export const getAllChoices = () => choices;

export const emptyBeatsAndLoses: BeatsAndLoses = {
    beats: [],
    losesTo: []
};
