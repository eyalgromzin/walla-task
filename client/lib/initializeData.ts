import { connectDB } from './mongodb';
import { Meme } from './memeSchema';

export async function initializeData() {
  try {
    await connectDB();

    // Check if there's any data in the Meme collection
    const count = await Meme.countDocuments();

    if (count === 0) {
      console.log('No memes found in database. Fetching from imgflip API...');

      // Fetch memes from imgflip API
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();

      if (data.success && data.data.memes) {
        // Map to only the fields we persist (name and url)
        const docs = data.data.memes.map((m: any) => ({
          name: m.name,
          url: m.url,
        }));

        // Insert all memes into the database
        await Meme.insertMany(docs);
        console.log(`Successfully loaded ${docs.length} memes into the database.`);
      } else {
        console.error('Failed to fetch memes from imgflip API');
      }
    } else {
      console.log(`Database already contains ${count} memes.`);
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}
