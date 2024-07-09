import { useCallback, useRef, useState } from 'react';
import useGameData from './useGameData';
import { type Choice } from '../../../common';
import { AnimatePresence, motion } from 'framer-motion';
import usePlayMutation from './usePlayMutation';
import Result from './Result';
import useCirclePosition, { ChoicesWithPositions } from './useCirclePosition';
import clsx from 'clsx';
import ResultList from './ResultList';

export default function Game() {
    const [matchOver, setMatchOver] = useState(false);
    const { choices, matches } = useGameData();
    const [{ mutate: play, isPending }, playResponse] =
        usePlayMutation(matchOver);
    const [current, setCurrent] = useState<ChoicesWithPositions | null>(null);
    const [selected, setSelected] = useState<Choice | null>(null);
    const rootCircleRef = useRef<HTMLDivElement>(null);
    const [circleRefs, setCircleRefs] = useState<(HTMLButtonElement | null)[]>(
        []
    );

    const computedChoices = useCirclePosition(
        rootCircleRef,
        choices as Choice[],
        circleRefs
    );

    const resetGame = useCallback(() => {
        setCurrent(null);
        setSelected(null);
        setMatchOver(true);

        setTimeout(() => {
            setMatchOver(false);
        });
    }, []);

    const startGame = useCallback(
        async (choice: Choice) => {
            setCurrent(null);
            setSelected(choice);

            play(choice.id);
        },
        [play]
    );

    return (
        <div className='flex-center' style={{ height: '100vh' }}>
            <ResultList matches={matches} />
            <motion.div
                ref={rootCircleRef}
                initial={{ rotate: 0 }}
                animate={{
                    rotate: selected && isPending ? 360 : 0,
                    repeatCount: Infinity
                }}
                exit={{
                    rotate: selected && isPending ? 360 : 0,
                    repeatCount: 0
                }}
                transition={{
                    repeat: selected && isPending ? Infinity : 0,
                    duration: 0.1,
                    ease: 'easeInOut'
                }}
                className={clsx({
                    'main-circle': true,
                    'main-circle-border': selected && isPending
                })}
            >
                {computedChoices?.map((choice) => (
                    <motion.button
                        onClick={() => startGame(choice)}
                        initial={{
                            transform: `translate(${choice.x}px, ${choice.y}px)`
                        }}
                        animate={{
                            transform: `translate(${choice.x}px, ${choice.y}px)`
                        }}
                        whileHover={{
                            transform: `translate(${choice.x}px, ${choice.y}px) scale(1.1)`
                        }}
                        onFocus={() => setCurrent(choice)}
                        onBlur={() => setCurrent(null)}
                        disabled={isPending || !!playResponse}
                        onHoverStart={() => setCurrent(choice)}
                        onHoverEnd={() => setCurrent(null)}
                        transition={{
                            easings: ['anticipate', 'circOut']
                        }}
                        ref={(el) => setCircleRefs((pRefs) => [...pRefs, el])}
                        key={choice.id}
                        className={clsx({
                            'nav-circle-button': true,
                            'flex-center': true,
                            'loses-to':
                                current &&
                                choice.losesTo.includes(current.name),
                            'wins-to':
                                current && choice.beats.includes(current.name),
                            'img-disabled':
                                selected && selected.name !== choice.name,
                            'img-disabled-with-color':
                                selected && selected.name === choice.name,
                            'img-loser':
                                playResponse &&
                                choice.id === playResponse.computer,
                            'img-winner':
                                playResponse && choice.id === selected?.id,
                            'img-draw':
                                playResponse &&
                                choice.id === selected?.id &&
                                choice.id === playResponse.computer
                        })}
                    >
                        <img
                            src={choice.imgClass}
                            alt={choice.name}
                            className={clsx({
                                'img-base': true,
                                [choice.imgClass]: true
                            })}
                        />
                        {current && current.name === choice.name && (
                            <span className='text-nav'>{choice.name}</span>
                        )}
                    </motion.button>
                ))}
                <div
                    className='flex-center'
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                >
                    {current && (
                        <p className='text-100 size-xl'>Play {current?.name}</p>
                    )}
                </div>
            </motion.div>
            <AnimatePresence>
                {selected && isPending && !playResponse && (
                    <motion.div
                        className='text-center absolute'
                        key='loader'
                        initial={{
                            opacity: 0,
                            transform: 'scale(0.7)'
                        }}
                        animate={{
                            opacity: 1,
                            transform: 'scale(1)'
                        }}
                        exit={{
                            opacity: 0,
                            transform: 'scale(0.7)'
                        }}
                    >
                        <div
                            className='relative text-center'
                            style={{
                                width: 300
                            }}
                        >
                            <p className='text-100 size-lg'>
                                You selected {selected?.name}
                            </p>
                            <motion.div
                                className='loader absolute-center'
                                initial={{
                                    transformOrigin: 'center'
                                }}
                                style={{
                                    position: 'absolute',
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.05)',
                                    width: 300,
                                    height: 300
                                }}
                            />
                            <p
                                className='text-300 size-sm'
                                style={{ lineHeight: 2 }}
                            >
                                Waiting for the computer&apos;s turn
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {playResponse && !isPending && (
                <motion.div
                    style={{
                        position: 'absolute'
                    }}
                    initial={{
                        opacity: 0,
                        transform: 'scale(0)'
                    }}
                    animate={{
                        opacity: 1,
                        transform: 'scale(1.4)'
                    }}
                >
                    <Result retry={() => resetGame()} result={playResponse} />
                </motion.div>
            )}
        </div>
    );
}
