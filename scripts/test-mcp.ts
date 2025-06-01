import { MCPClient } from 'mcp';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testMCPServer() {
  try {
    // Connect to the MCP server
    const client = new MCPClient({
      url: 'http://localhost:8000',
      capabilities: {
        tools: true,
        resources: true,
        prompts: true
      }
    });

    console.log('Testing standard Akave tools...');

    // Test list_buckets
    console.log('\nListing buckets:');
    const result = await client.readResource('akave://buckets');
    console.log(result);

  } catch (error) {
    console.error('Error testing MCP server:', error);
  }
}

testMCPServer(); 