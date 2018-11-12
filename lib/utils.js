const { exec, execSync } = require('child_process');
const { readFileSync, writeFile, unlinkSync} = require('fs');
const handlebars = require('handlebars');
const downloadRepo = require('download-git-repo');
const error = require('./errortype');
const utils = {
    download(gitResource, localPath) {
        return new Promise((resolve, reject) => {
            downloadRepo(gitResource, localPath, { clone: true },
                (err) => {
                    err ? reject({
                        type: error.DOWNLOAD,
                        error: err
                    }) : resolve();
                })
        })
    },
    modifyPackageJson(enterAbPath, outAbPath, answers) {
        return new Promise((resolve, reject) => {
            let pkgJSON = readFileSync(enterAbPath).toString(),
                template = handlebars.compile(pkgJSON),
                newPkgJSON = template(answers);
            unlinkSync(enterAbPath);
            writeFile(outAbPath, newPkgJSON, (err) => {
                err ? reject({
                    type: error.MODIFY,
                    error: err
                }) : resolve();
            });
        })
    },
    installDependencies(localPath) {
        return new Promise((resolve, reject) => {
            exec(`cd ${localPath} && npm install`, (err) => {
                err ? reject({
                    type: error.DEPENDENCIES,
                    error: err
                }) : resolve();
            })
        })
    }
    // },
    // installDependenciesSync() {
    //     let a = execSync('npm install');
    //     debugger;
    // }
}
module.exports = utils;

