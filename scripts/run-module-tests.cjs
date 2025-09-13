#!/usr/bin/env node
const { spawn } = require('node:child_process');

const moduleName = process.env.MODULE || process.argv[2];
if (!moduleName) {
  console.error('Usage: pnpm test:module -- MODULE=<principle-folder-name>');
  process.exit(1);
}

const pattern = `modules/${moduleName}/exercise/**/*.spec.ts`;

const child = spawn('pnpm', ['vitest', 'run', pattern], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
