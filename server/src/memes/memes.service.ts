import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meme, MemeDocument } from './meme.schema';

@Injectable()
export class MemesService {
  constructor(@InjectModel(Meme.name) private memeModel: Model<MemeDocument>) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.memeModel.find().select('name url').skip(skip).limit(pageSize).exec(),
      this.memeModel.countDocuments(),
    ]);

    return {
      success: true,
      data,
      pagination: {
        page,
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  async findById(id: string) {
    const meme = await this.memeModel.findById(id).select('name url').exec();
    return meme;
  }

  async updateById(id: string, name: string) {
    const updatedMeme = await this.memeModel
      .findByIdAndUpdate(id, { name }, { new: true, select: 'name url' })
      .exec();
    return updatedMeme;
  }

  async initializeData() {
    console.log('Initializing meme data...');
    const count = await this.memeModel.countDocuments();

    if (count === 0) {
      console.log('No memes found in database. Fetching from imgflip API...');

      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();

        if (data.success && data.data.memes) {
          const docs = data.data.memes.map((m: any) => ({
            name: m.name,
            url: m.url,
          }));

          await this.memeModel.insertMany(docs);
          console.log(`Successfully loaded ${docs.length} memes into the database.`);
        } else {
          console.error('Failed to fetch memes from imgflip API');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    } else {
      console.log(`Database already contains ${count} memes.`);
    }
  }
}
