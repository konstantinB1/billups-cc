import {
    Endpoints,
    stdResponse,
    type Match,
    type Choice,
    type StdResponseType,
    type ChoiceEndpointDTO
} from '../../common';

const createFetch =
    (baseUrl: string) =>
    async <TResult, TData = unknown>(
        url: string,
        method: string = 'GET',
        data?: TData
    ): Promise<StdResponseType<TResult | null>> => {
        try {
            const opts: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
                opts.body = JSON.stringify(data);
            }

            const finalUrl = new URL(url, baseUrl);
            const response = await fetch(finalUrl.href, opts);

            const json = await response.json();
            return stdResponse(json.data, null);
        } catch (error) {
            return stdResponse(null, (error as Error).message);
        }
    };

const jsonFetch = createFetch(import.meta.env.VITE_LOCAL_SERVER!);

export const getChoices = async () =>
    await jsonFetch<Choice[]>(Endpoints.Choices);
export const getChoice = async () => await jsonFetch<Choice>(Endpoints.Choice);
export const getMatchesHistory = async () =>
    await jsonFetch<Match[]>(Endpoints.Matches);
export const play = async (id: number) =>
    await jsonFetch<ChoiceEndpointDTO>(Endpoints.Play, 'POST', { player: id });
