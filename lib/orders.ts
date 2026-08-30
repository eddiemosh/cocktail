import fs from "fs";
import path from "path";
import { MongoClient, Db, Collection } from "mongodb";

export interface Order {
  id: string;
  name: string;
  baseCocktail: string;
  customisations: Record<string, string[]>;
  status: "pending" | "completed";
  createdAt: string;
}

const KV_KEY = "cocktail:orders";
let inMemoryOrders: Order[] = [];
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

// ---------------------------------------------------------------------------
// MongoDB helpers
// ---------------------------------------------------------------------------

async function mongoAvailable(): Promise<boolean> {
  return !!process.env.MONGODB_URI;
}

async function getMongoConnection(): Promise<{ db: Db; collection: Collection<Order> }> {
  if (!mongoClient) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not set");
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  if (!mongoDb) {
    mongoDb = mongoClient.db("cocktail_bar");
    await mongoDb.collection("orders").createIndex({ createdAt: 1 });
  }
  return { db: mongoDb, collection: mongoDb.collection<Order>("orders") };
}

async function getOrdersFromMongo(): Promise<Order[]> {
  try {
    const { collection } = await getMongoConnection();
    const orders = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return orders.map(doc => {
      const { _id, ...rest } = doc as any;
      return rest as Order;
    });
  } catch (err) {
    console.error("Error fetching from MongoDB:", err);
    throw err;
  }
}

async function saveOrderToMongo(order: Order): Promise<void> {
  try {
    const { collection } = await getMongoConnection();
    await collection.insertOne(order as any);
  } catch (err) {
    console.error("Error saving to MongoDB:", err);
    throw err;
  }
}

async function updateOrderInMongo(id: string, status: Order["status"]): Promise<boolean> {
  try {
    const { collection } = await getMongoConnection();
    const result = await collection.updateOne({ id }, { $set: { status } });
    return result.modifiedCount > 0;
  } catch (err) {
    console.error("Error updating MongoDB:", err);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// KV helpers (Vercel KV / @vercel/kv)
// ---------------------------------------------------------------------------

async function kvAvailable(): Promise<boolean> {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function fileStorageAvailable(): boolean {
  return process.env.VERCEL !== "1";
}

async function getOrdersFromKV(): Promise<Order[]> {
  const { kv } = await import("@vercel/kv");
  const data = await kv.get<Order[]>(KV_KEY);
  return data ?? [];
}

async function saveOrdersToKV(orders: Order[]): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, orders);
}

// ---------------------------------------------------------------------------
// File-system helpers (local dev)
// ---------------------------------------------------------------------------

const DATA_FILE = path.join(process.cwd(), "data", "orders.json");

function getOrdersFromFile(): Order[] {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Order[];
}

function saveOrdersToFile(orders: Order[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getOrders(): Promise<Order[]> {
  if (await mongoAvailable()) return getOrdersFromMongo();
  if (await kvAvailable()) return getOrdersFromKV();
  if (fileStorageAvailable()) return getOrdersFromFile();
  return inMemoryOrders;
}

export async function addOrder(order: Order): Promise<void> {
  if (await mongoAvailable()) await saveOrderToMongo(order);
  else if (await kvAvailable()) {
    const orders = await getOrders();
    orders.push(order);
    await saveOrdersToKV(orders);
  } else if (fileStorageAvailable()) {
    const orders = getOrdersFromFile();
    orders.push(order);
    saveOrdersToFile(orders);
  } else {
    inMemoryOrders.push(order);
  }
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<boolean> {
  if (await mongoAvailable()) return updateOrderInMongo(id, status);
  
  const orders = await getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  orders[idx].status = status;
  if (await kvAvailable()) await saveOrdersToKV(orders);
  else if (fileStorageAvailable()) saveOrdersToFile(orders);
  else inMemoryOrders = orders;
  return true;
}
