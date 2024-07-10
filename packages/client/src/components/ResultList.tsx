import { ChoicesLiteral, getChoiceById, Match, Result } from '../../../common';
import lizard from '@assets/lizard.jpeg';
import paper from '@assets/paper.jpg';
import rock from '@assets/rock.jpeg';
import scissors from '@assets/scissors.avif';
import spock from '@assets/spock.webp';
import clsx from 'clsx';
import { useMemo } from 'react';

export type ResultListProps = {
    matches?: Match[];
    setShowResults: (show: boolean) => void;
};

const mapColor = (result: Result) => {
    switch (result) {
        case Result.Win:
            return 'color-success';
        case Result.Lose:
            return 'color-danger';
        case Result.Draw:
            return 'color-warning';
    }
};

const getImage = (name: string): string => {
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
    computerChoiceText: string;
    playerChoiceText: string;
};

export default function ResultList({
    matches,
    setShowResults
}: ResultListProps) {
    const matchesWithImages = useMemo<MatchWithImage[] | undefined>(() => {
        return matches?.map((match) => {
            const computerChoiceText = getChoiceById(
                Number(match.computer_choice)
            )?.name;

            const playerChoiceText = getChoiceById(
                Number(match.player_choice)
            )?.name;

            const playerImg = getImage(playerChoiceText as string);
            const computerImg = getImage(computerChoiceText as string);

            return {
                playerImg,
                computerImg,
                computerChoiceText,
                playerChoiceText,
                ...match
            } satisfies MatchWithImage;
        });
    }, [matches]);

    return (
        <>
            <div
                className='absolute'
                style={{
                    left: 10,
                    top: 10,
                    zIndex: 105
                }}
            >
                {matches?.length === 0 && (
                    <p
                        style={{
                            width: '100vw',
                            height: '100vh'
                        }}
                    >
                        <p className='flex-center text-100'>No matches found</p>
                    </p>
                )}
                <div className='flex-center'>
                    <button
                        onClick={() => setShowResults(false)}
                        className='close-btn text-100'
                    >
                        Close
                    </button>
                </div>
            </div>
            <div
                className='absolute-center'
                style={{
                    zIndex: 100,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }}
            >
                <div
                    className='absolute-center overflow-auto'
                    style={{
                        height: 'calc(100vh - 20px)',
                        width: 400
                    }}
                >
                    {matchesWithImages?.map((match, index) => {
                        return (
                            <div
                                key={
                                    match.computer_choice +
                                    match.player_choice +
                                    index
                                }
                            >
                                <div
                                    className='flex-center'
                                    style={{ gap: 16, marginBottom: 16 }}
                                >
                                    <div className='text-center'>
                                        <img
                                            className={clsx({
                                                'object-cover': true,
                                                circle: true,
                                                'img-loser':
                                                    match.result ===
                                                    Result.Lose,
                                                'img-winner':
                                                    match.result === Result.Win,
                                                'img-draw':
                                                    match.result === Result.Draw
                                            })}
                                            src={match.playerImg}
                                            alt={match.playerChoiceText}
                                            style={{
                                                width: 100,
                                                height: 100
                                            }}
                                        />
                                        <p className='text-100 size-sm'>
                                            Player
                                        </p>
                                        <span className='text-300 size-lg'>
                                            {match.playerChoiceText}
                                        </span>
                                    </div>
                                    <div className='text-center'>
                                        <img
                                            className={clsx({
                                                'object-cover': true,
                                                circle: true,
                                                'img-loser':
                                                    match.result !==
                                                    Result.Lose,
                                                'img-winner':
                                                    match.result !== Result.Win,
                                                'img-draw':
                                                    match.result === Result.Draw
                                            })}
                                            src={match.computerImg}
                                            alt={match.computerChoiceText}
                                            style={{
                                                width: 100,
                                                height: 100
                                            }}
                                        />
                                        <p className='text-100 size-sm'>
                                            Computer
                                        </p>
                                        <span className='text-300 size-lg'>
                                            {match.computerChoiceText}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        paddingBottom: 32
                                    }}
                                >
                                    <div>
                                        <p
                                            className={clsx({
                                                'text-100': true,
                                                'size-lg': true,
                                                'weight-500': true,
                                                [mapColor(match.result)]: true,
                                                'text-center': true,
                                                uppercase: true
                                            })}
                                        >
                                            {match.result}
                                        </p>
                                    </div>
                                </div>
                                <hr
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        marginBottom: 32
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
