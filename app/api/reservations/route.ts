import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all reservations including date, time, customer info, and status
    const reservations = await prisma.reservation.findMany({
      select: {
        reservationDate: true,
        reservationTime: true,
        customerInfo: true,
        reservationStatus: true,
      },
    });

    // Return the reservations data
    return NextResponse.json({
      success: true,
      message: 'Reservations fetched successfully',
      data: reservations,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}