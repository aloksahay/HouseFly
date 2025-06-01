import { Akave } from '@akave/sdk'
import { MCPServer } from '@akave/mcp'

const akave = new Akave({
  clientId: process.env.AKAVE_CLIENT_ID,
  endpoint: process.env.AKAVE_ENDPOINT
})

const mcpServer = new MCPServer({
  name: 'property-search',
  description: 'Natural language property search assistant'
})

// Handle natural language queries
mcpServer.on('query', async (query: string) => {
  try {
    // Search properties in Akave using natural language
    const properties = await akave.search({
      type: 'property',
      query: query,
      options: {
        naturalLanguage: true,
        limit: 10
      }
    })

    // Process and format results
    const formattedResults = properties.map(property => ({
      id: property.id,
      address: property.data.address,
      price: property.data.price,
      description: property.data.description,
      amenities: property.data.amenities,
      verified: property.metadata.verified
    }))

    return {
      success: true,
      results: formattedResults,
      message: `Found ${formattedResults.length} properties matching your criteria`
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error searching properties',
      error
    }
  }
})

// Start the MCP server
mcpServer.start(3000) 