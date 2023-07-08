const PRODUCTION_API_BASE_URL = "https://life-tracker-uwma.onrender.com";
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
const production = true;
/**
 * @todo
 * change production url to development url
 */

export const API_BASE_URL = production ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL
