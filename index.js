const { buildSetup } = require("./src/hashlip_main");

const basePath = process.cwd();
const { start } = require(`${basePath}/src/main.js`);

(() => {
    start();
})();