import path from 'node:path';
import dotenv from 'dotenv';
import { cpus } from 'os'
import { startServer } from './modules/server';

const pathToEnv = path.resolve(process.cwd(), '.env');
dotenv.config({ path: pathToEnv });
const PORT = Number(process.env.PORT ?? 3000);
const isClusterMode = process.argv.includes('--cluster');
const numberWorker = cpus().length;


console.log(PORT);
console.log(isClusterMode);

if (isClusterMode) {
  console.log(`Welcome to the Simple-CRUD-API!\n(CLUSTER MODE)\nThere will be ${numberWorker} workeres running.`)
} else {
  startServer(PORT);
  console.log(`Welcome to the Simple-CRUD-API!\n(SINGLE MODE)`)
}
