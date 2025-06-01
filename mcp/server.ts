import AkaveMCPServer from 'akave-mcp';

const server = new AkaveMCPServer();

async function startServer() {
  try {
    await server.start({
      port: Number(process.env.MCP_SERVER_PORT) || 3000,
      host: process.env.MCP_SERVER_HOST || 'localhost',
      env: {
        AKAVE_ACCESS_KEY_ID: process.env.AKAVE_O3_ACCESS_KEY_ID,
        AKAVE_SECRET_ACCESS_KEY: process.env.AKAVE_O3_SECRET_KEY,
        AKAVE_ENDPOINT_URL: 'https://o3-rc1.akave.xyz'
      }
    });

    // Handle natural language queries
    server.on('query', async (query: string) => {
      try {
        // Use built-in tools to analyze file content
        const properties = await server.tools.analyze_file_content(
          process.env.AKAVE_O3_BUCKET || '',
          'properties.json',
          {
            query,
            limit: Number(process.env.MCP_MAX_QUERY_RESULTS) || 10
          }
        );

        return {
          success: true,
          results: properties,
          message: `Found ${properties.length} properties matching your criteria`
        };
      } catch (error) {
        return {
          success: false,
          message: 'Error searching properties',
          error
        };
      }
    });

    console.log(`MCP Server running on ${process.env.MCP_SERVER_HOST || 'localhost'}:${process.env.MCP_SERVER_PORT || 3000}`);
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

startServer(); 