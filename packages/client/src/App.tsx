import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Game from './components/Game';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Game />
        </QueryClientProvider>
    );
}
