import log4js from 'log4js';
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const l = log4js.getLogger();

const MCP_PATH = '/mcp';

const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
});

const bootstrap = async (mcpServer) => {
    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        l.debug(`> ${req.method} ${req.originalUrl}`);
        l.debug(req.body);
        return next();
    });

    // Handle GET requests for server-to-client notifications via SSE
    app.get(MCP_PATH, (req, res) => {
        res.status(405).set('Allow', 'POST').send('Method Not Allowed');
    });

    // Handle DELETE requests for session termination
    app.delete(MCP_PATH, (req, res) => {
        res.status(405).set('Allow', 'POST').send('Method Not Allowed');
    });

    // Handle POST requests for client-to-server communication
    app.post(MCP_PATH, async (req, res) => {
        try {
            await transport.handleRequest(req, res, req.body);
        } catch (err){
            l.error(`Error handling MCP request ${err}`);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32000,
                        message: 'Internal Server Error',
                    },
                    id: null,
                })
            }
        }
    });

    const port = 3000;
    await mcpServer.connect(transport);
    app.listen(port, () => {
        l.debug(`Listening on http://localhost:${port}`);
    });

    return app;
}

export default {
    bootstrap
}





