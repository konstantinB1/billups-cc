import { getRandomNumber } from './random-number';
import chance from './chance';
import { Choice } from '../../common';

export const getRandomChoice = async (): Promise<Choice> => {
    const { random_number } = await getRandomNumber();
    return chance(random_number);
};
