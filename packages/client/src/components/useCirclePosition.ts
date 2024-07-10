import { Choice } from '../../../common';
import { RefObject, useEffect, useState } from 'react';

export type ChoicesWithPositions = Choice & {
    x: number;
    y: number;
    imgClass: string;
    relations: [];
};

const paths = import.meta.glob('../assets/*.{jpeg,jpg,avif,webp}');

const getImagePath = (choice: Choice): string => {
    const image = Object.keys(paths).find((path) => {
        const last = path.split('/')[2];
        const [name] = last.split('.');

        return name === choice.name.toLowerCase();
    });

    if (!image) {
        throw new Error(`Image not found for ${choice.name}`);
    }

    return image;
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
            const ref = circleRefs?.[i];

            const angle = ((2 * Math.PI) / choices.length) * i;
            const x = centerX + centerY * Math.cos(angle);
            const y = centerX + centerY * Math.sin(angle);
            const diameeter = ref?.getBoundingClientRect()?.width;
            const dx = x - diameeter! / 2;
            const dy = y - diameeter! / 2;

            const imagePath = getImagePath(choice);

            return {
                ...choice,
                x: dx,
                y: dy,
                imgClass: imagePath
            };
        });

        setComputedChoices(choices2 as ChoicesWithPositions[]);
    }, [choices, circleRefs, rootCircleRef]);

    return computedChoices;
}
