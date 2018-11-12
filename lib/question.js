
const user = require('./gituser');
const ask = [
    {
        type: 'input',
        message: 'Project name',
        name: 'name',
        default: 'EasyReact'
    },
    {
        type: 'input',
        message: 'Project description',
        name: 'description',
        default: 'A react project'
    },
    {
        type: 'input',
        message: 'Author',
        name: 'author',
        default: user() || ""
    },
    {
        type: 'confirm',
        message: 'Need react-router ?',
        name: 'router',
        default: false
    }
]
module.exports = ask;