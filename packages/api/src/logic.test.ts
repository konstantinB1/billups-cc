import { outcome } from './logic';
import { ChoicesLiteral, Result } from '../../common/src';

describe('outcome', () => {
    test.each<[ChoicesLiteral, ChoicesLiteral, Result]>([
        [ChoicesLiteral.Rock, ChoicesLiteral.Paper, Result.Lose],
        [ChoicesLiteral.Rock, ChoicesLiteral.Scissors, Result.Win],
        [ChoicesLiteral.Rock, ChoicesLiteral.Rock, Result.Draw],
        [ChoicesLiteral.Paper, ChoicesLiteral.Rock, Result.Win],
        [ChoicesLiteral.Paper, ChoicesLiteral.Scissors, Result.Lose],
        [ChoicesLiteral.Paper, ChoicesLiteral.Paper, Result.Draw],
        [ChoicesLiteral.Scissors, ChoicesLiteral.Rock, Result.Lose],
        [ChoicesLiteral.Scissors, ChoicesLiteral.Paper, Result.Win],
        [ChoicesLiteral.Scissors, ChoicesLiteral.Scissors, Result.Draw],
        [ChoicesLiteral.Lizard, ChoicesLiteral.Rock, Result.Lose],
    ])('player: %s, computer: %s, result: %s', (player, computer, result) =>
        expect(outcome(player, computer)).toBe(result),
    );
});
