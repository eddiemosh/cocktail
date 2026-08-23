import fs from "fs";
import path from "path";

export interface Order {
  id: string;
  name: string;
  baseCocktail: string;
  customisations: Record<string, string[]>;
  status: "pending" | "completed";
  createdAt: string;
}

const KV_KEY = "cocktail:orders";

// ---------------------------------------------------------------------------
// KV helpers (Vercel KV / @vercel/kv)
// ---------------------------------------------------------------------------

async function kvAvailable(): Promise<boolean> {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
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
  if (await kvAvailable()) return getOrdersFromKV();
  return getOrdersFromFile();
}

export async function addOrder(order: Order): Promise<void> {
  const orders = await getOrders();
  orders.push(order);
  if (await kvAvailable()) await saveOrdersToKV(orders);
  else saveOrdersToFile(orders);
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<boolean> {
  const orders = await getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  orders[idx].status = status;
  if (await kvAvailable()) await saveOrdersToKV(orders);
  else saveOrdersToFile(orders);
  return true;
}
