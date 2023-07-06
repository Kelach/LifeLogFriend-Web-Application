const PRODUCTION_API_BASE_URL = "http://localhost:5173";
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
/**
 * @todo
 * change production url to development url
 */
export const API_BASE_URL = process.env.NODE_ENV == "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL
