import { ChoicesLiteral, getChoiceByLiteral } from '../../common';

export default function chance(n: number) {
    if (isNaN(n)) {
        throw new Error('n is not a number');
    }

    if (n > 0 && n < 20) {
        return getChoiceByLiteral(ChoicesLiteral.Rock);
    }

    if (n >= 20 && n < 40) {
        return getChoiceByLiteral(ChoicesLiteral.Paper);
    }

    if (n >= 40 && n < 60) {
        return getChoiceByLiteral(ChoicesLiteral.Scissors);
    }

    if (n >= 60 && n < 80) {
        return getChoiceByLiteral(ChoicesLiteral.Lizard);
    }

    return getChoiceByLiteral(ChoicesLiteral.Spock);
}
