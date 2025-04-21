import './logging.js';
import log4js from 'log4js';
import serverlessExpress from '@codegenie/serverless-express';

import mcpServer from './mcpServer.js';
import transport from './transport-http.js';

const expressApp = await transport.bootstrap(mcpServer);
export const handler = serverlessExpress({ app: expressApp });
