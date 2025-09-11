// In test-env.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// This finds the .env file next to this test script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
  console.log('--- Error loading .env file ---');
  console.error(result.error);
} else {
  console.log('--- .env file was loaded successfully ---');
  console.log('Parsed values:', result.parsed);
}

console.log('--- Reading values from process.env ---');
console.log('PORT is:', process.env.PORT);
console.log('ASTROLOGY_API_USER_ID is:', process.env.ASTROLOGY_API_USER_ID);
console.log('ASTROLOGY_API_KEY is:', process.env.ASTROLOGY_API_KEY);
console.log('--- End of Test ---');