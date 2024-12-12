import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const reservationId = parseInt(params.reservationId, 10);
    if (isNaN(reservationId)) {
      return NextResponse.json({ success: false, message: 'Invalid reservation ID' }, { status: 400 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      return NextResponse.json({ success: false, message: 'Reservation not found' }, { status: 404 });
    }

    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        reservationStatus: 'Updated',
      },
    });

    return NextResponse.json({ success: true, message: 'Reservation updated successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating reservation:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}