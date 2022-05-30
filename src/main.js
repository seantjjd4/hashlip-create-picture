const basePath = process.cwd();
const fs = require("fs");
const { startCreating, buildSetup } = require(`${basePath}/src/hashlip_main.js`)

const layersPath = `${basePath}/layers`;
const imagesPath = `${basePath}/images`;
const jsonsPath = `${basePath}/jsons`;

const start = () => {
    makeLayers();
    setImageSets(1);
    buildSetup();
    startCreating();
}

const makeLayers = () => {
    if (fs.existsSync(layersPath)) {
        fs.rmSync(layersPath, { recursive: true });
    }
    fs.mkdirSync(layersPath);
    fs.mkdirSync(`${layersPath}/main`);
    fs.mkdirSync(`${layersPath}/background`);
    fs.mkdirSync(`${layersPath}/acc`);
}

const setImageSets = (tokenId) => {
    const metaDataFile = fs.readFileSync(`${jsonsPath}/${tokenId}.json`);
    const metaData = JSON.parse(metaDataFile);
    metaData.attributes.forEach( attribute => {
        fs.writeFileSync(`${layersPath}/${attribute.trait_type}/${attribute.value}.png`, fs.readFileSync(`${imagesPath}/${attribute.trait_type}/${attribute.value}.png`));
    });
}

module.exports = { start };