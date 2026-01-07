import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Server configuration proxy for environment variables with default values
 */

export const config = {
  /**
   * Server port
   */
  PORT: process.env.PORT || '3001',

  /**
   * MongoDB connection URI
   */
  MONGODB_URI: process.env.MONGODB_URI,

} as const;
