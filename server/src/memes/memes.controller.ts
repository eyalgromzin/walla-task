import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { MemesService } from './memes.service';

@Controller('api/memes')
export class MemesController {
  constructor(private memesService: MemesService) {}

  private validateMemeName(name: string): { valid: boolean; error?: string } {
    if (!name || typeof name !== 'string') {
      return { valid: false, error: 'Name is required' };
    }

    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      return { valid: false, error: 'Name cannot be empty' };
    }

    if (trimmedName.length > 200) {
      return { valid: false, error: 'Name must be less than 200 characters' };
    }

    // Check for suspicious patterns
    if (/<script|javascript:|onerror|>|<|onload|onclick/i.test(trimmedName)) {
      return { valid: false, error: 'Name contains invalid characters or patterns' };
    }

    return { valid: true };
  }

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
    @Query('pageNumber') pageNumber: string = '1',
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

  @Put(':id')
  async updateMeme(@Param('id') id: string, @Body() body: { name: string }) {
    try {
      const validation = this.validateMemeName(body.name);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const trimmedName = body.name.trim();
      const updatedMeme = await this.memesService.updateById(id, trimmedName);

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
