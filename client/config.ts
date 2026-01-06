/**
 * Client configuration proxy for environment variables with default values
 */

export const config = {
  /**
   * Client port (used for development server)
   */
  PORT: process.env.PORT || '3001',

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
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
} as const;
