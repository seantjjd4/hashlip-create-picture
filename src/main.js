const basePath = process.cwd();
const fs = require("fs");
const axios = require("axios");
const { startCreating, buildSetup } = require(`${basePath}/src/hashlip_main.js`);

const layersPath = `${basePath}/layers`;
const imagesPath = `${basePath}/images`;
const jsonsPath = `${basePath}/jsons`;

const jsonUrl = "https://gateway.pinata.cloud/ipfs/QmRy8bEHAti4DoWqKL6AjEU6yaijTt5s34BwqaZb21Lhcp"

const start = async () => {
    makeLayers();
    await getImageJson();
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

const getImageJson = async () => {
    if (fs.existsSync(jsonsPath)) {
        fs.rmSync(jsonsPath, { recursive: true });
    }
    fs.mkdirSync(jsonsPath);
    try {
        const response = await axios.get("https://gateway.pinata.cloud/ipfs/QmRy8bEHAti4DoWqKL6AjEU6yaijTt5s34BwqaZb21Lhcp");
        const metaData = response.data;
        fs.writeFileSync(`${jsonsPath}/${metaData.edition}.json`, JSON.stringify(metaData));
    } catch (error) {
        console.error(error);
        process.exit();
    }
}

const setImageSets = (tokenId) => {
    const metaDataFile = fs.readFileSync(`${jsonsPath}/${tokenId}.json`);
    const metaData = JSON.parse(metaDataFile);
    metaData.attributes.forEach( attribute => {
        fs.writeFileSync(`${layersPath}/${attribute.trait_type}/${attribute.value}.png`, fs.readFileSync(`${imagesPath}/${attribute.trait_type}/${attribute.value}.png`));
    });
}

const uploadToPinata = () => {
    
}

module.exports = { start };