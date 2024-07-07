import { StdResponseType } from '@billups-cc/common';
import { useEffect, useState } from 'react';

export default function useService<T>(
    service: () => Promise<StdResponseType<T>>,
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data: serviceData } = await service();
                setData(serviceData);
            } catch (e) {
                setError((e as StdResponseType<T>).message);
            } finally {
                setLoading(false);
            }
        })();
    }, [service]);

    return { data, error, loading };
}
