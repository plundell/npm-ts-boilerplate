# ts-npm-boilerplate

A simple CLI tool to generate a TypeScript npm module boilerplate.

## Installation

To install the `ts-npm-boilerplate` CLI tool globally, run:

```bash
npm install -g ts-npm-boilerplate
```

## Usage
After installing it globally you can call it directly from the command line:
```bash
ts-npm-boilerplate -p /path/to/new/module -g my-github-user -n new-module-name
```
This command will create a new directory at /path/to/new/module/new-module-name with the boilerplate files, modify the configuration files with the new module name, install npm dependencies, initialize a Git repository, configure the remote repository, and create the first commit with the message "boilerplate created".


## License
MIT