FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY node_modules/akave-mcp/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV AKAVE_O3_ACCESS_KEY_ID=${AKAVE_O3_ACCESS_KEY_ID}
ENV AKAVE_O3_SECRET_KEY=${AKAVE_O3_SECRET_KEY}
ENV AKAVE_ENDPOINT=${AKAVE_ENDPOINT}

# Expose the MCP server port
EXPOSE 8000

# Start the MCP server
CMD ["python", "-m", "akave_mcp", "--port", "8000", "--host", "0.0.0.0"] 