import { NextRequest, NextResponse } from "next/server";
import { addOrder, getOrders, Order } from "@/lib/orders";
import { randomUUID } from "crypto";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, baseCocktail, customisations } = body as Pick<
    Order,
    "name" | "baseCocktail" | "customisations"
  >;

  if (!name || !baseCocktail) {
    return NextResponse.json(
      { error: "name and baseCocktail are required" },
      { status: 400 }
    );
  }

  const order: Order = {
    id: randomUUID(),
    name,
    baseCocktail,
    customisations: customisations ?? {},
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await addOrder(order);
  return NextResponse.json(order, { status: 201 });
}
