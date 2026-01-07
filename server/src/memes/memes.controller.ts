import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { MemesService } from './memes.service';
import { validateMemeName } from '../utils';
import { UpdateMemeDto } from './update-meme.dto';

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
  async getMemes(
    @Query('pageNumber') pageNumber: string = '0',
    @Query('pageSize') pageSize: string = '10',
  ) {
    try {
      const pageNum = parseInt(pageNumber);
      const pageSizeNum = parseInt(pageSize);
      return await this.memesService.findAll(pageNum, pageSizeNum);
    } catch (error) {
      console.error('Error fetching memes:', error);
      return { success: false, error: 'Failed to fetch memes' };
    }
  }

  @Patch()
  async updateMeme(@Body() body: UpdateMemeDto) {
    try {
      const validation = validateMemeName(body.name);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const trimmedName = body.name.trim();
      const updatedMeme = await this.memesService.updateById(body.id, trimmedName);

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
