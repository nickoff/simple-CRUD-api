import path from 'node:path';
import dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import { startServer } from './modules/server';

const pathToEnv = path.resolve(process.cwd(), '.env');
dotenv.config({ path: pathToEnv });
const PORT = Number(process.env.PORT ?? 3000);
const isClusterMode = process.argv.includes('--cluster');
const numberWorker = os.availableParallelism();

if (isClusterMode) {
  if (cluster.isPrimary) {
    console.log(`Welcome to the Simple-CRUD-API!\n(CLUSTER MODE)\nThere will be ${numberWorker} workers running.`);

    for (let i = 0; i < numberWorker; i += 1) {
      cluster.fork({ WORKER_PORT: PORT + i });
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork({ WORKER_PORT: PORT + worker.id });
    });
  } else {
    const workerPort = Number(process.env.WORKER_PORT);
    startServer(workerPort);
  }
} else {
  startServer(PORT);
  console.log(`Welcome to the Simple-CRUD-API!\n(SINGLE MODE)`);
}
