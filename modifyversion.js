const fs = require('fs');
let pkgJSON = require('./package.json');
let [argv1] = process.argv.slice(2);
let pkgVersion = pkgJSON.version.split('.');
if (argv1 === '--l') {
    ++pkgVersion[0]
}
else if (argv1 === '--m') {
    ++pkgVersion[1];
}
else {
    ++pkgVersion[2];
}
pkgJSON.version = pkgVersion.join('.');
fs.writeFileSync('./package.json', JSON.stringify(pkgJSON, null, 2));