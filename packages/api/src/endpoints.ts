import type Router from '@koa/router';
import { getRandomChoice } from './logic';

import matchesModel from '../../models/matches';
import { ChoiceEndpointDTO, Endpoints } from '../../common';
import { getAllChoices, getChoiceById, outcome } from '../../common';

function createChoiceEndpoint(router: Router) {
    router.get(Endpoints.Choice, async (ctx) => {
        ctx.body = await getRandomChoice();
    });
}

function createChoicesEndpoint(router: Router) {
    router.get(Endpoints.Choices, (ctx) => {
        ctx.body = getAllChoices();
    });
}

function createMatchesEndpoint(
    router: Router,
    model: ReturnType<typeof matchesModel>
) {
    router.get(Endpoints.Matches, async (ctx) => {
        ctx.body = await model.getLastResults();
    });
}

function createPlayEndpoint(
    router: Router,
    model: ReturnType<typeof matchesModel>
) {
    type RequestBody = {
        player: number;
    };

    router.post(Endpoints.Play, async (ctx) => {
        const playerChoiceId = (ctx.request.body as RequestBody)?.player;

        ctx.assert(
            playerChoiceId !== undefined && typeof playerChoiceId === 'number',
            400,
            `Invalid player choice: ${playerChoiceId}`
        );

        const computer = await getRandomChoice();
        const playerChoice = getChoiceById(playerChoiceId);

        ctx.assert(
            playerChoice !== undefined,
            400,
            `Unknown choice: ${playerChoiceId}`
        );

        const result = outcome(playerChoice!.name, computer.name);

        model.saveMatch({
            player_choice: playerChoiceId,
            computer_choice: computer.id,
            result
        });

        console.log('result', result);

        ctx.assert(result, 500, 'Invalid result');

        ctx.body = {
            player: playerChoiceId,
            computer: computer.id,
            result
        } as ChoiceEndpointDTO;
    });
}

export default function registerRoutes(router: Router) {
    const model = matchesModel();

    createChoiceEndpoint(router);
    createChoicesEndpoint(router);
    createPlayEndpoint(router, model);
    createMatchesEndpoint(router, model);
}
