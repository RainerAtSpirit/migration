# React Typescript Starter
## Tier 2 Starter template GenNext 2.x

## Todos
* Use static less instead of dynamic typestyles for layout
* Add recursive model example

If you want to play around **clone** the repo, if you want to contribute **fork** the repo instead. We are following the usual Coras feature branch workflow. 

**Important!** Before install dependencies you need to register the @coras scope first.

* `npm login --registry=https://npm.corasworks.net:4873 -scope=@coras`
* Username: `corasdev`
* Password: `C0r@s123`
* Email: (this IS public) `info@coras.com`
* $ Logged in as corasdev to scope @coras on https://npm.corasworks.net:4873/.

**Important!** Install dependencies with `yarn` to get the same package versions.
* Install yarn from https://yarnpkg.com/en/docs/install
* Run `yarn` in root directory of the repo

**Important!** During development.
Copy repo from https://github.com/CorasWorks/ClientVNext-WFE
run `yarn`, `npm run build`, `npm run start`
This will start an express server at port 3000. Open <http://localhost:3000> login and run through the consent process.
This is work in progress, so stay tuned while me make the token management experience easier.
In the meantime if something goes wrong logout and login again.

As an alternative if your doing server side developement as well and have VS running on <https://localhost:44300>
you need to update the webpack.config.js proxy.target setting.

#### Available scripts

* `yarn/npm run dev` Runs on `http://localhost:3111`, proxy `/odata` to `http://localhost:3000/odata`
* `yarn/npm run dev:local` Runs on `http://localhost:3111`, proxy `/odata` to `https://localhost:44300/odata`
* `yarn/npm run clean`
* `yarn/npm run build`
