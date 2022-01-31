import * as http from 'http';
import { appBuilder } from './app/app';

const SERVER_PORT = 8080;

const server = http.createServer(appBuilder.build());

// Create local file system folders
server.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
