import { config } from 'dotenv';
import { workflowClient } from './config/upstash.js';
import { SERVER_URL } from './config/env.js';

// Load environment variables
config({path: `.env.${process.env.NODE_ENV || "development"}.local`});

console.log("=== Environment Variables Debug ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("SERVER_URL:", SERVER_URL);
console.log("QSTASH_TOKEN:", process.env.QSTASH_TOKEN ? "Set" : "Not set");
console.log("QSTASH_URL:", process.env.QSTASH_URL ? "Set" : "Not set");

console.log("\n=== Workflow Client Test ===");
try {
    console.log("Workflow client created successfully");
    console.log("Client config:", {
        baseUrl: process.env.QSTASH_URL,
        token: process.env.QSTASH_TOKEN ? "Present" : "Missing"
    });
} catch (error) {
    console.error("Error creating workflow client:", error);
}

console.log("\n=== Workflow URL Test ===");
const workflowUrl = `${SERVER_URL}/api/v1/workflows/subscription/reminder`;
console.log("Workflow URL:", workflowUrl); 