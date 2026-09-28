import { HindsightClient } from "@vectorize-io/hindsight-client";

const client = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_API_URL,
  apiKey: process.env.HINDSIGHT_API_KEY,
});

const bankId = process.env.HINDSIGHT_BANK_ID;

await client.retain(
  bankId,
  "Incident INC-001: Payment API latency increased because a long-running analytics query exhausted the database connection pool. The immediate fix was terminating the query and temporarily increasing the pool size. The permanent fix was moving analytics workload to a read replica."
);

console.log("✅ Hindsight retain worked");

const result = await client.recall(
  bankId,
  "What caused the Payment API latency incident, and what was the permanent fix?"
);

console.log("✅ Hindsight recall worked");
console.log(result);