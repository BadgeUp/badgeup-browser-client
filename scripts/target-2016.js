const exec = require('child_process').exec;
const cmd = "sed -i -e \"s/\"ES2017\"/\"ES2016\"/g\" tsconfig.json";

if (process.version.startsWith('v6')) {
    exec(cmd, function (error, stdout) {
        /* eslint no-console: 0 */
        console.log("Output: " + stdout);
    });
}
