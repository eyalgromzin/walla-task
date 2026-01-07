/**
 * Client configuration proxy for environment variables with default values
 */

export const config = {
  /**
   * Number of memes to initially load
   */
  INITIAL_MEMES_COUNT: process.env.INITIAL_MEMES_COUNT || '20',

  /**
   * Number of memes per page
   */
  PAGE_SIZE: process.env.PAGE_SIZE || '10',

  /**
   * API URL for the backend server
   */
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:3001',
} as const;
