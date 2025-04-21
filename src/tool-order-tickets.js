import log4js from 'log4js';
import { z } from "zod";

const l = log4js.getLogger();
const toolName = 'order-tickets';

const toolDescription =
    'Use this tool to order tickets to the Peppa Pig Park. \
    The tool expects two parameters - timeslot and quantity. \
    The timeslot should be a stringified date. \
    The quantity should be a number. \
    \
    Example: \
    order-tickets(timeslot: "April 19, 2025", quantity: 3) \
    \
    The tool will return a text message with the order number. \
    ';

const toolParamsSchema = {
    timeslot: z.string().describe('The timeslot for the tickets'),
    quantity: z.number().describe('The number of tickets to order')
}

const toolCallback = async ({ timeslot, quantity }) => {
    l.debug(`> timeslot=${timeslot} quantity=${quantity}`);
    const text =
        `You've ordered ${quantity} tickets for ${timeslot}. \
        Your order number is OINK-1234.`;

    return {
        content: [
            {
                type: 'text',
                text
            }
        ]
    }
};


export default {
    toolName,
    toolDescription,
    toolParamsSchema,
    toolCallback
};