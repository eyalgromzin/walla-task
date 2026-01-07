import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

// Import validation function
import { validateMemeName } from '../../../utils/sanitize';

interface Params {
  id: string;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const { name } = await request.json();

    // Validate input
    const validation = validateMemeName(name);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Call NestJS server
    const serverUrl = `${config.NEXT_PUBLIC_API_URL}/api/memes/${id}`;
    const response = await fetch(serverUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to update from server');
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
