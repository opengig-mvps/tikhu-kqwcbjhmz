import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            name: true,
          },
        },
      },
    });

    const formattedOrders = orders.map((order: any) => ({
      id: order.id,
      orderItems: order.orderItems,
      customerInfo: order.customerInfo,
      orderStatus: order.orderStatus,
      specialRequests: order.specialRequests,
      orderDate: order.orderDate.toISOString(),
      user: {
        id: order.user.id,
        email: order.user.email,
        username: order.user.username,
        name: order.user.name,
      },
    }));

    return NextResponse.json({
      success: true,
      message: 'Orders fetched successfully',
      data: formattedOrders,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}