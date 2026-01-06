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
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://eyalgromzin_db_user:password1234@cluster0.3xq4spc.mongodb.net/?appName=Cluster0',

  /**
   * MongoDB username (optional)
   */
  MONGO_USERNAME: process.env.MONGO_USERNAME || 'eyalgromzin_db_user',

  /**
   * MongoDB password (optional)
   */
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'password1234',
} as const;
