import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Meme } from '@/lib/memeSchema';

interface Params {
  id: string;
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid name provided' },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedMeme = await Meme.findByIdAndUpdate(
      id,
      { name },
      { new: true, select: 'name url' }
    );

    if (!updatedMeme) {
      return NextResponse.json(
        { success: false, error: 'Meme not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMeme,
    });
  } catch (error) {
    console.error('Error updating meme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update meme' },
      { status: 500 }
    );
  }
}
