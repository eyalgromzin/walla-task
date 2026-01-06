import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters
    const url = new URL(request.url);
    const pageNumber = url.searchParams.get('pageNumber') || '1';
    const pageSize = url.searchParams.get('pageSize') || '10';

    // Call NestJS server
    const serverUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/memes?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(serverUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch from server');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch memes' },
      { status: 500 }
    );
  }
}
