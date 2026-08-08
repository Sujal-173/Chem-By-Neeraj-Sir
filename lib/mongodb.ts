import { MongoClient, type Db } from "mongodb";
import { requireEnv, getEnv } from "@/lib/env";
import dns from "dns";



/**
 * Reuses a single MongoClient across hot reloads in dev and across
 * invocations in serverless production, per MongoDB's Next.js guidance.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = requireEnv("MONGODB_URI");

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri);
  return client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(getEnv().MONGODB_DB_NAME);
}
