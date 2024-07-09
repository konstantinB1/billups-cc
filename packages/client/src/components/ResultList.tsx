import { ChoicesLiteral, getChoiceById, Match } from '../../../common';
import lizard from '@assets/lizard.jpeg';
import paper from '@assets/paper.jpg';
import rock from '@assets/rock.jpeg';
import scissors from '@assets/scissors.avif';
import spock from '@assets/spock.webp';
import { useMemo } from 'react';

export type ResultListProps = {
    matches?: Match[];
};

const getImage = (name: string) => {
    switch (name) {
        case ChoicesLiteral.Rock:
            return rock;
        case ChoicesLiteral.Paper:
            return paper;
        case ChoicesLiteral.Scissors:
            return scissors;
        case ChoicesLiteral.Lizard:
            return lizard;
        case ChoicesLiteral.Spock:
            return spock;
        default:
            throw new Error('Invalid choice');
    }
};

type MatchWithImage = Match & {
    playerImg: string;
    computerImg: string;
};

export default function ResultList({ matches }: ResultListProps) {
    const matchesWithImages = useMemo<MatchWithImage[]>(() => {
        return matches?.map((match) => {
            const playerImg = getImage(
                getChoiceById(match.player_choice)?.name as string
            );
            const computerImg = getImage(
                getChoiceById(match.computer_choice)?.name as string
            );

            return { playerImg, computerImg, ...match };
        });
    }, [matches]);

    return (
        <div className='absolute'>
            {matchesWithImages?.map((match, index) => {
                return (
                    <div
                        key={
                            match.computer_choice + match.player_choice + index
                        }
                    >
                        <img src={mapImage(match)} alt='choice' />
                    </div>
                );
            })}
        </div>
    );
}
