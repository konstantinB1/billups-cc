import { useEffect, useState } from 'react';

export type GameImage = {
    name: string;
    path: string;
};

async function getPics(): Promise<GameImage[]> {
    const pics = import.meta.glob<
        true,
        string,
        () => Promise<{ default: string }>
    >('./assets/*.{jpg,jpeg}');

    const futures = await Promise.all<GameImage>(
        Object.values(pics).map(async (v) => {
            const file = (await v())?.default.slice(1);
            const name = file.split('/').pop()?.split('.')[0];

            return {
                path: file,
                name: name as string
            };
        })
    );

    return futures;
}

export const useGamePicks = (): GameImage[] => {
    const [assets, setAssets] = useState<GameImage[]>([]);

    useEffect(() => {
        (async () => setAssets(await getPics()))();
    }, []);

    return assets;
};
