const PRODUCTION_API_BASE_URL = "postgres://life_tracker_user:cTRUJbiQPl64xzYz3nBMDeX4eRZpsUUI@dpg-cik9ttdph6eg6kafnkug-a/life_tracker";
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
/**
 * @todo
 * change production url to development url
 */
export const API_BASE_URL = process.env.NODE_ENV == "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL
