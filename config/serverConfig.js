require('dotenv').config()

const PORT = process.env.port || 8000;
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, DEBUG_MODE, JWT_SECRET }