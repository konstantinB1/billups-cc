import { getChoiceById } from '../../common';

export async function getImageById(id: number) {
    const glob = import.meta.glob('./assets/*.{png,jpg,jpeg,avif,webp}');

    console.log(glob);
}
