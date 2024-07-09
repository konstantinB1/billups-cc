import { Choice, ChoicesLiteral } from '../../../common';
import { RefObject, useEffect, useState } from 'react';

export type ChoicesWithPositions = Choice & {
    x: number;
    y: number;
    imgClass: string;
    relations: [];
};

export default function useCirclePosition(
    rootCircleRef: RefObject<HTMLDivElement>,
    choices: Choice[],
    circleRefs: (HTMLButtonElement | null)[]
) {
    const [computedChoices, setComputedChoices] = useState<
        ChoicesWithPositions[]
    >([]);

    useEffect(() => {
        const bounds = rootCircleRef.current?.getBoundingClientRect();
        const centerX = bounds!.width / 2;
        const centerY = bounds!.height / 2;
        const choices2 = choices?.map((choice, i) => {
            const angle = ((2 * Math.PI) / 5) * i;
            const x = centerX + centerY * Math.cos(angle);
            const y = centerX + centerY * Math.sin(angle);
            const diameeter =
                circleRefs?.[i]?.getBoundingClientRect()?.width / 2;

            let imgClass: string;

            switch (choice.name) {
                case ChoicesLiteral.Rock:
                    imgClass = '../../assets/rock.jpeg';
                    break;
                case ChoicesLiteral.Paper:
                    imgClass = '../../assets/paper.jpg';
                    break;
                case ChoicesLiteral.Scissors:
                    imgClass = '../../assets/scissors.avif';
                    break;
                case ChoicesLiteral.Lizard:
                    imgClass = '../../assets/lizard.jpeg';
                    break;
                case ChoicesLiteral.Spock:
                    imgClass = '../../assets/spock.webp';
                    break;
                default:
                    imgClass = '';
                    break;
            }

            return {
                ...choice,
                x: x - diameeter,
                y: y - diameeter,
                imgClass
            };
        });

        setComputedChoices(choices2 as ChoicesWithPositions[]);
    }, [choices, circleRefs, rootCircleRef]);

    return computedChoices;
}
