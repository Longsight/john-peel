/**
 * @flow
 */

'use strict';

import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';

const databaseURI = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev';
const cloud = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js'
const appId = process.env.APP_ID || 'JohnPeel';
const masterKey = process.env.MASTER_KEY || '';
const serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse';
const port = process.env.PORT || 1337;

const api = new ParseServer({
  databaseURI,
  cloud,
  appId,
  masterKey,
  serverURL,
});

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL,
      appId,
      masterKey,
      appName: "John Peel"
    }
  ]
});

const app = express();

var mountParse = process.env.PARSE_MOUNT || '/parse';
app.use(mountParse, api);

var mountDashboard = process.env.PARSE_DASHBOARD || '/dashboard';
app.use(mountDashboard, dashboard);

app.listen(port, function() {
    console.log('John Peel spinning the vinyl on port ' + port + '.');
});
