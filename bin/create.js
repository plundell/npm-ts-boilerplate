#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

const argv = yargs
	.option('path', {
		alias: 'p',
		type: 'string',
		description: 'Path to the new module directory',
	})
	.option('github', {
		alias: 'g',
		type: 'string',
		description: 'GitHub username',
	})
	.option('name', {
		alias: 'n',
		type: 'string',
		description: 'New module name',
	})
	.option('description', {
		alias: 'd',
		type: 'string',
		description: 'The description to use for the new module',
		default: 'A backend cli module written in typescript which does something cool'
	})
	.demandOption(['path', 'github', 'name'], 'Please provide the required options')
	.help().argv;

if (!fs.existsSync(argv.path)) {
	console.error('The provided path does not exist.');
	process.exit(1);
}

if (!/^[\w-]+$/.test(argv.name)) {
	console.error('The module name can only contain letters, numbers, hyphens, and underscores.');
	process.exit(1);
}

const boilerplatePath = path.join(argv.path, argv.name);

console.log('Copying boilerplate files...');
fs.mkdirSync(boilerplatePath);
fs.readdirSync(path.join(__dirname, '../boilerplate')).forEach((file) => {
	//Read the template file
	const oldPath = path.join(__dirname, '../boilerplate', file);
	let contents = fs.readFileSync(oldPath, 'utf8');

	//Replace placeholders
	contents = contents.replace(/xx-package-name-xx/g, argv.name);
	contents = contents.replace(/xx-git-username-xx/g, argv.github);
  
	//Write it to the new location
	const newPath = path.join(boilerplatePath, file);
	fs.writeFileSync(newPath, contents);
});

console.log('Installing npm dependencies...');
const execSync = require('child_process').execSync;
execSync(`cd ${boilerplatePath} && npm install`);

console.log('Initializing git repository and configuring remote...');
const git = simpleGit(boilerplatePath);
git.initSync();
git.addRemoteSync('origin', `https://github.com/${argv.github}/${argv.name}.git`);

console.log('Creating first commit...');
git.addSync('*');
git.commitSync('boilerplate created');

console.log('Boilerplate created successfully.');
