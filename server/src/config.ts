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

  /**
   * MongoDB username (optional)
   */
  MONGO_USERNAME: process.env.MONGO_USERNAME,

  /**
   * MongoDB password (optional)
   */
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
} as const;
