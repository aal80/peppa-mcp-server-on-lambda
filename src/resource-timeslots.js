import log4js from 'log4js';
import { z } from "zod";

const l = log4js.getLogger();
const resourceName = 'timeslots';

const resourceUri = 'peppa://timeslots';

const resourceMetadata = {
    mimeType: 'text/plain',
    description: 
    'Use this resource to get all open timeslots for ordering tickets \
    to the Peppa Pig Theme Park.'
}

const resourceCallback = async (uri) => {
    l.debug(`>`);
    const text =
        `Available timeslots are: April 19th 2025, April 20th 2025, April 21st 2025`;

    return {
        contents: [
            {
                uri: uri.href,
                mimeType: 'text/plain',
                text
            }
        ]
    }
};


export default {
    resourceName,
    resourceUri,
    resourceMetadata,
    resourceCallback
};