import { useEffect, useState } from 'react';

let hasListener = false;

export default function useShowResults() {
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (hasListener) {
            return;
        }

        hasListener = true;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setShowResults(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            hasListener = false;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return [showResults, setShowResults] as const;
}
