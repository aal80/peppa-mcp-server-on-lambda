import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const ENDPOINT_URL = process.env.PEPPA_MCP_SERVER_ENDPOINT || 'http://localhost:3000/mcp';
console.log(`Connecting ENDPOINT_URL=${ENDPOINT_URL}`);

const transport = new StreamableHTTPClientTransport(new URL(ENDPOINT_URL));

const client = new Client({
    name: "node-client",
    version: "0.0.1"
});

await client.connect(transport);

const resources = await client.listResources();
console.log(`listResources response: `, resources);

const timeslots = await client.readResource({
    uri: 'peppa://timeslots'
});
console.log(`readResource response: `, timeslots);

const tools = await client.listTools();
console.log(`listTools response: `, tools);

const result = await client.callTool({
    name: "order-tickets",
    arguments: {
        timeslot: 'April 19th, 2025',
        quantity: 3
    }
});
console.log(`callTool response: `, result);

await client.close();
