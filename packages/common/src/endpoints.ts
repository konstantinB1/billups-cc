import { Result } from './constants';

export enum Endpoints {
    Choice = '/choice',
    Choices = '/choices',
    Play = '/play',
    Matches = '/matches'
}

export type ChoiceEndpointDTO = {
    player: number;
    computer: number;
    result: Result;
};
