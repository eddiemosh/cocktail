import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();
  const ok = await updateOrderStatus(id, status);
  if (!ok) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
