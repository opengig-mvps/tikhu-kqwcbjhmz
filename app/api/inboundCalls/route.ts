import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inboundCalls = await prisma.inboundCall.findMany({
      select: {
        callerId: true,
        callDuration: true,
        callStatus: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inbound calls fetched successfully',
      data: inboundCalls,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching inbound calls:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}