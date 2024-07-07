import { type Choice, stdResponse, StdResponseType } from '../../common';
import { useEffect, useState } from 'react';

const createFetch =
    (baseUrl: string) =>
    async <T>(
        url: string,
        method: string = 'GET',
        data?: T,
    ): Promise<StdResponseType<T | null>> => {
        try {
            const opts: RequestInit = {
                method,
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (method === 'POST' || method === 'PUT') {
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

const jsonFetch = createFetch('http://localhost:8000');

export const getChoices = async () => await jsonFetch<Choice[]>('/choices');
export const getChoice = async () => await jsonFetch<Choice>('/choice');
export const getMatchesHistory = async () => await jsonFetch('/matches');
export const play = async (id: number) =>
    await jsonFetch('/play', 'POST', { player: id });
