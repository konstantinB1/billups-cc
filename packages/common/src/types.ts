import { ChoicesLiteral } from './constants';

export type BeatsAndLoses = {
    beats: ChoicesLiteral[];
    losesTo: ChoicesLiteral[];
};

export type Choice = BeatsAndLoses & {
    id: number;
    name: ChoicesLiteral;
};

export type Match = {
    player_choice: number;
    computer_choice: number;
    result: Result;
};
