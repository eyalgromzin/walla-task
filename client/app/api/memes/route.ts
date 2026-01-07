import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters
    const url = new URL(request.url);
    const pageNumber = url.searchParams.get('pageNumber') || '0';
    const pageSize = url.searchParams.get('pageSize') || '10';

    // Call NestJS server
    const serverUrl = `${config.SERVER_URL}/api/memes?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing id or name' },
        { status: 400 }
      );
    }

    // Call NestJS server
    const serverUrl = `${config.SERVER_URL}/api/memes`;
    const response = await fetch(serverUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });

    if (!response.ok) {
      throw new Error('Failed to update meme on server');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating meme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update meme' },
      { status: 500 }
    );
  }
}
