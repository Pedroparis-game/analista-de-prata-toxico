import fs from 'fs';
let serverTs = fs.readFileSync('server.ts', 'utf-8');
serverTs = `
import fs from 'fs';
import util from 'util';
const logFile = fs.createWriteStream('server-debug.log', { flags: 'a' });
const originalError = console.error;
console.error = function (...args) {
  logFile.write(util.format.apply(null, args) + '\\n');
  originalError.apply(console, args);
};
` + serverTs;
fs.writeFileSync('server.ts', serverTs);
