import { useRef } from 'react';
import {
    ChoiceEndpointDTO,
    getChoiceById,
    Result as GameResult
} from '../../../common';
import { motion } from 'framer-motion';

export type ResultProps = {
    result: ChoiceEndpointDTO;
    retry: () => void;
};

export const mapResult = (
    result: GameResult
): {
    color: string;
    text: string;
} => {
    switch (result) {
        case GameResult.Win:
            return {
                color: 'success',
                text: 'You win!'
            };
        case GameResult.Lose:
            return {
                color: 'danger',
                text: 'You lose!'
            };
        case GameResult.Draw:
            return {
                color: 'warning',
                text: 'Its a Draw!'
            };
    }
};

export default function Result({ result, retry }: ResultProps) {
    const { color, text } = mapResult(result.result);
    const btnRef = useRef<HTMLButtonElement>(null);

    return (
        <div
            style={{
                textAlign: 'center'
            }}
        >
            <span className='text-300 size-sm'>
                {result.computer === result.player ? (
                    `You both picked ${getChoiceById(result.player)?.name}`
                ) : (
                    <>
                        <span>
                            You picked {getChoiceById(result.player)?.name}
                        </span>
                        <br />
                        <span>
                            Computer picked{' '}
                            {getChoiceById(result.computer)?.name}
                        </span>
                    </>
                )}
            </span>
            <br />
            <motion.h1
                className={`text-100`}
                style={{
                    color: `var(--${color}-color)`,
                    lineHeight: 0.5
                }}
                initial={{
                    opacity: 0,
                    transform: 'matrix(1, 0, 0, 1, 0, 0)'
                }}
                animate={{
                    opacity: 1,
                    transform: 'matrix(1.2, 0, 0, 1.05, 0, 0)'
                }}
                transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    delay: 0.2
                }}
            >
                {text}
            </motion.h1>
            <motion.button
                ref={btnRef}
                className='play-again-btn'
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    ease: 'easeInOut',
                    delay: 1
                }}
                onClick={() => retry()}
            >
                Play again
            </motion.button>
        </div>
    );
}
