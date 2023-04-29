#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
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
	console.error(argv.name);
	console.error('The module name can only contain letters, numbers, hyphens, and underscores.');
	process.exit(1);
}

const boilerplatePath = path.join(__dirname, '../boilerplate');
const outputPath = path.join(path.resolve(argv.path), argv.name);

if (fs.existsSync(outputPath))
	throw new Error("That path already exists: " + outputPath)

console.log("Creating", outputPath);
fs.mkdirSync(outputPath);


console.log('Starting to copy boilerplate files there...');
copyDir(boilerplatePath, outputPath)


function copyFile(src, trg) {

	//Read contents
	let contents = fs.readFileSync(src, 'utf8');

	//Replace placeholders
	contents = contents.replace(/xx-package-name-xx/g, argv.name);
	contents = contents.replace(/xx-git-username-xx/g, argv.github);
  
	//Write it to the new location
	console.log(src, '-->', trg);
	fs.writeFileSync(trg, contents);
}

function copyDir(sourcePath, targetPath) {
	const files = fs.readdirSync(sourcePath);
	for (const file of files) {
		const src = path.join(sourcePath, file);
		const trg = path.join(targetPath, file);
		if (fs.statSync(src).isDirectory()) {
			if (file == 'node_modules' || file == 'dist')
				continue;
			fs.mkdirSync(trg);
			copyDir(src, trg);
		} else {
			copyFile(src, trg)
		}
	}
}

console.log('Installing npm dependencies...');
cp.execSync(`cd ${outputPath} && npm install --omit=dev`);

(async function asyncGit() {
	try {	
		console.log('Initializing git repository and configuring remote...');
		const git = simpleGit(outputPath);
		await git.init();
		await git.addRemote('origin', `https://github.com/${argv.github}/${argv.name}.git`);
		await git.branch(['-u', 'origin/master']); //set the upstream branch

		console.log('Creating first commit...');
		await git.add('*');
		await git.commit('boilerplate created');

		console.log("NOTE: You now have a local git repo with a single commit. Before you can push it to github");
		console.log("      however you have to create the remote repo, either by logging into github or by running:");
		console.log(`            gh repo create --name ${argv.name}`);

		console.log('Boilerplate created successfully.');
	} catch (e) {
		console.error('FATAL:', e);
		process.exit(1);
	}
})()
