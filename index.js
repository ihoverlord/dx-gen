#! /usr/bin/env node
const generator = require('./generator');
const program = require('commander');

program
    .version('0.1.0')
    .option('--api <api>', 'Create New API Module!')
    .option('--project <project>', 'Create New Project!')
    .option('--auth', 'Create New Auth Module!')
    .parse(process.argv);
if (program.api) generator.api(program.api)
else if (program.project) generator.project(program.project)
else if (program.auth) generator.auth(program.auth)