import { ChoicesLiteral } from '@billups-cc/common';
import { getChoiceByLiteral } from './logic';

export default function chance(n: number) {
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
