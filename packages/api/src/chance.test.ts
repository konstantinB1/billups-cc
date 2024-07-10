import { ChoicesLiteral, getChoiceByLiteral } from '../../common/src';
import { getRandomChoice } from './logic';

jest.mock('./random-number', () => ({
    getRandomNumber: () => Promise.resolve({ random_number: 1 })
}));

describe('getRandomChoice', () => {
    test('should return a random choice', async () => {
        const res = await getRandomChoice();
        expect(res).toStrictEqual(getChoiceByLiteral(ChoicesLiteral.Rock));
    });
});
