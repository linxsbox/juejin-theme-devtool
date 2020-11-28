#!/usr/bin/env node

const viewServer = require('./tools/server.js');
viewServer.run(process.argv.slice(2));
