#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const { existsSync } = require('fs');
const ora = require('ora');
const utils = require('../lib/utils');
const question = require('../lib/question');
program.command('setup <name>').action(function (name) {
    const baseUrl = path.resolve(process.cwd(), name);
    if (!existsSync(baseUrl)) {
        inquirer.prompt(question).then(function (answers) {
            const spinner = ora('Downloading Easy React templates...');
            spinner.start();
            //下载模板
            utils.download('https://github.com:gaoziyang-dailyAccount/react-template#master', baseUrl)
                //更新package.json
                .then(() => {
                    const mdfyPath = path.resolve(baseUrl, './package.temp.json'),
                        outputPath = path.resolve(baseUrl, './package.json');

                    return utils.modifyPackageJson(mdfyPath, outputPath, answers)
                })
                //下载依赖
                .then(() => {
                    return utils.installDependencies(baseUrl)
                })
                .then(() => {
                    spinner.succeed('Downloading Easy React templates success')
                })
                //捕获过程中的错误
                .catch((err) => {
                    err.type ? spinner.fail(err.type + ':' + err.error) : spinner.fail(err);
                })
        });
    }
    else {
        console.error('exsit dir, please rename');
    }

});
program.parse(process.argv)