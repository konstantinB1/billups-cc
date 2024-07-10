import { useMutation } from '@tanstack/react-query';
import { play } from '../services';
import { useEffect, useState } from 'react';
import { ChoiceEndpointDTO } from '@billups-cc/common';

export default function usePlayMutation(done: boolean) {
    const [responseData, setResponseData] = useState<ChoiceEndpointDTO | null>(
        null
    );

    const playMutation = useMutation({
        mutationKey: ['play'],
        mutationFn: (id: number) =>
            // Simulate a delay to enjoy animation :)
            new Promise((resolve) => setTimeout(resolve, 1500)).then(() =>
                play(id)
            ),
        onSuccess: ({ data }) => setResponseData(data)
    });

    useEffect(() => {
        if (done) {
            setResponseData(null);
            playMutation.reset();
        }
    }, [done, playMutation]);

    return [playMutation, responseData] as const;
}
