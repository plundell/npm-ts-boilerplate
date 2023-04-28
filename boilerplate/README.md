# xx-package-name-xx

xx-description-xx

## Project Structure

This project is written in typescript, but it's meant to be run from the command line using just `node`, as such the the source files (`./src/**/*.ts`) are uploaded to github and the compiled files (`./dist/**/*.js`) are published to npm

## Installation & Usage

To use this package you only need the compiled code from npm so simply run:
```bash
npm install --production xx-package-name-xx #optionally using the global '-g' flag
```
then run it with 
```bash
xx-package-name-xx
#or
npx ./node_modules/.bin/xx-package-name-xx
```

## Development

To develop this package you need the source code from GitHub:
```bash
git clone https://github.com/xx-git-username-xx/xx-package-name-xx.git
#or
gh repo clone xx-git-username-xx/xx-package-name-xx
cd xx-package-name-xx
```
If you're forking the repo you should then:
```bash
git remote add my-foo-fork https://github.com/my-github-user/new-repo-name.git #my-foo-fork is the alias for the remote
git push -u my-foo-fork master #sets default remote and branch and pushes a copy there 

```
Now you'll need the dev dependencies:
```bash
npm install
```
After you've made any changes you want you can either:
 - use it _as is_ without compiling or uploading anywhere:
 ```bash
 npm start
 ```
 - building and publishing to npm
 ```bash
 npm run build
 npm login
 npm publish

 ```
 - pushing to github
 ```bash
 git add .
 git commit -m "clever changes"
 git push
 ```

