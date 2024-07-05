import { getRandomNumber } from './random-number';
import chance from './chance';
import { Choice, ChoicesLiteral, Result } from '../../common';

const choices = Object.keys(ChoicesLiteral).reduce<Choice[]>((acc, key, i) => {
    const choice: Choice = {
        id: i + 1,
        name: ChoicesLiteral[key as keyof typeof ChoicesLiteral],
    };

    return [...acc, choice];
}, [] as Choice[]);

export const getChoiceByLiteral = (literal: ChoicesLiteral): Choice =>
    choices.find((choice) => choice.name === literal)!;

export const getRandomChoice = async (): Promise<Choice> => {
    const { random_number } = await getRandomNumber();
    return chance(random_number);
};

export const outcome = (
    userChoice: ChoicesLiteral,
    computerChoice: ChoicesLiteral,
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
