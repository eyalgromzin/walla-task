import { Controller, Get, Put, Param, Body, Query } from '@nestjs/common';
import { MemesService } from './memes.service';

@Controller('api/memes')
export class MemesController {
  constructor(private memesService: MemesService) {}
  @Post('initialize')
  async initializeMemes() {
    try {
      await this.memesService.initializeData();
      return { success: true };
    } catch (error) {
      console.error('Error initializing memes:', error);
      return { success: false, error: 'Failed to initialize memes' };
    }
  }

  @Get()
  async getAllMemes(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    try {
      await this.memesService.initializeData();
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      return await this.memesService.findAll(pageNum, limitNum);
    } catch (error) {
      console.error('Error fetching memes:', error);
      return { success: false, error: 'Failed to fetch memes' };
    }
  }
  }

  @Put(':id')
  async updateMeme(@Param('id') id: string, @Body() body: { name: string }) {
    try {
      if (!body.name || typeof body.name !== 'string') {
        return { success: false, error: 'Invalid name provided' };
      }

      const updatedMeme = await this.memesService.updateById(id, body.name);

      if (!updatedMeme) {
        return { success: false, error: 'Meme not found' };
      }

      return { success: true, data: updatedMeme };
    } catch (error) {
      console.error('Error updating meme:', error);
      return { success: false, error: 'Failed to update meme' };
    }
  }
}
