import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = parseInt(params.orderId, 10);
    if (isNaN(orderId)) {
      return NextResponse.json({ success: false, message: 'Invalid order ID' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: "Updated" },
    });

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: 'Order not found or not updated' }, { status: 404 });
    }

    await sendEmail({
      to: "kitchen@example.com",
      template: {
        subject: "Order Status Updated",
        html: "<h1>The order status has been updated</h1>",
        text: "The order status has been updated",
      },
    });

    return NextResponse.json({ success: true, message: 'Order status updated and kitchen notified' }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}