import type Router from '@koa/router';
import {
    getAllChoices,
    getChoiceById,
    getRandomChoice,
    outcome,
} from './logic';

enum Endpoints {
    Choice = '/choice',
    Choices = '/choices',
    Play = '/play',
    Matches = '/matches',
}

import matchesModel from '../../models/matches';

export default function registerRoutes(router: Router) {
    const model = matchesModel();
    router.get(Endpoints.Choice, async (ctx) => {
        ctx.body = await getRandomChoice();
    });

    router.get(Endpoints.Choices, (ctx) => {
        ctx.body = getAllChoices();
    });

    type RequestBody = {
        player: number;
    };

    router.post(Endpoints.Play, async (ctx) => {
        const playerChoiceId = (ctx.request.body as RequestBody)?.player;

        ctx.assert(
            playerChoiceId !== undefined && typeof playerChoiceId === 'number',
            400,
            `Invalid player choice: ${playerChoiceId}`,
        );

        const computer = await getRandomChoice();
        const playerChoice = getChoiceById(playerChoiceId);

        ctx.assert(
            playerChoice !== undefined,
            400,
            `Unknown choice: ${playerChoiceId}`,
        );

        const result = outcome(playerChoice?.name!, computer.name);

        model.saveMatch({
            player_choice: playerChoiceId,
            computer_choice: computer.id,
            result,
        });

        ctx.assert(result, 500, 'Invalid result');

        ctx.body = { player: playerChoiceId, computer: computer.id, result };
    });

    router.get(Endpoints.Matches, async (ctx) => {
        ctx.body = model.getLastResults();
    });
}
