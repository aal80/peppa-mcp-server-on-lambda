import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import resourceGetTimeslots from './resource-timeslots.js'
import toolOrderTickets from './tool-order-tickets.js'

const mcpServer = new McpServer({
  name: "peppa-mcp-server-on-lambda",
  version: "0.0.1"
}, {
  capabilities: {
    tools: {}
  },
  instructions: "Use this MCP server to book tickets to the Peppa Pig Theme Park.\
  Use the 'timeslots' resource to get all open timeslots. \
  Use the 'order-tickets' tool to order tickets to a specific timeslot. \
  "
});

mcpServer.resource(
  resourceGetTimeslots.resourceName,
  resourceGetTimeslots.resourceUri,
  resourceGetTimeslots.resourceMetadata,
  resourceGetTimeslots.resourceCallback
);

mcpServer.tool(
  toolOrderTickets.toolName,
  toolOrderTickets.toolDescription,
  toolOrderTickets.toolParamsSchema,
  toolOrderTickets.toolCallback
);

export default mcpServer;
