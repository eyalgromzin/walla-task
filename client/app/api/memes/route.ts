import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Meme } from '@/lib/memeSchema';
import { initializeData } from '@/lib/initializeData';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Initialize data on first request if needed
    await initializeData();

    // Get pagination parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Fetch memes with pagination (only name and url)
    const memes = await Meme.find()
      .select('name url')
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Meme.countDocuments();

    return NextResponse.json({
      success: true,
      data: memes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch memes' },
      { status: 500 }
    );
  }
}
