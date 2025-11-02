#!/usr/bin/env node
/*
  create-db.cjs - CommonJS version for projects using "type": "module"
*/
const { execSync } = require('child_process');

function parseDatabaseUrl(databaseUrl) {
  try {
    const url = new URL(databaseUrl.replace(/^postgres:/, 'postgres:'));
    const auth = url.username || 'postgres';
    const host = url.hostname || 'localhost';
    const port = url.port || '5432';
    const db = url.pathname ? url.pathname.replace(/^\//, '') : 'blindate_db';
    return { user: auth, host, port, db };
  } catch (err) {
    return null;
  }
}

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/blindate_db';
const info = parseDatabaseUrl(databaseUrl);
if (!info) {
  console.error('Unable to parse DATABASE_URL:', databaseUrl);
  process.exit(1);
}

const { user, host, port, db } = info;

try {
  try {
    run(`createdb -h ${host} -p ${port} -U ${user} ${db}`);
    console.log(`Database '${db}' created (via createdb).`);
    process.exit(0);
  } catch (err) {
    console.warn('createdb not available or failed, trying psql...');
  }

  try {
    run(`psql -h ${host} -p ${port} -U ${user} -c "CREATE DATABASE ${db};"`);
    console.log(`Database '${db}' created (via psql).`);
    process.exit(0);
  } catch (err) {
    console.error('psql failed to create database. You may need to create it manually.');
    process.exit(1);
  }
} catch (err) {
  console.error('Failed to create database:', err.message || err);
  process.exit(1);
}
