import { Sequelize } from "sequelize";
import {User, Note, Revision, Author} from "./models.mjs";

// Initialization
console.log("codimd-dbtype-converter (c) 2024 pasmophobia")
console.log("Initializing.")
const original = {}
const target = {}
original.sequelize = new Sequelize(process.env.CMD_CONVERT_ORIGINAL_DB_URL);
target.sequelize = new Sequelize(process.env.CMD_CONVERT_TARGET_DB_URL);
function stripNullByte (value) {
    value = '' + value
    // eslint-disable-next-line no-control-regex
    return value ? value.replace(/\u0000/g, '') : value
}
original.sequelize.stripNullByte = stripNullByte
target.sequelize.stripNullByte = stripNullByte
function processData (data, _default, process) {
    if (data === undefined) return data
    else return data === null ? _default : (process ? process(data) : data)
}
original.sequelize.processData = processData
target.sequelize.processData = processData
const modelNames = ['User', 'Note', 'Revision', 'Author'];
const functions = {
    User: User,
    Note: Note,
    Revision: Revision,
    Author: Author
}
modelNames.forEach(async (modelName) => {
    original[modelName] = functions[modelName](original.sequelize, Sequelize)
    target[modelName] = functions[modelName](target.sequelize, Sequelize)
})
await target.sequelize.sync({})
console.log("Initialized.")

// Conversion
let i = 0
for(const modelName of modelNames) {
    console.log(`converting ${modelName}.`)
    if(i>0) {
        console.log(`previous conversion failed with ${i} errors. skipping remaining conversions.`)
        break;
    }
    const data = await original[modelName].findAll()
    for(const entry of data.map((it) => it.dataValues)) {
        try {
            await target[modelName].create(entry)
        } catch(e) {
            i += 1
            let content = "----------ERROR MESSAGE----------\n"
            content += e.toString()
            content += "\n----------STACKTRACE----------\n"
            content += e.stack
            content += "\n----------DATA----------\n"
            content += JSON.stringify(entry)
            console.log(content)
            fs.writeFileSync(`/var/log/${modelName}_${i}.log`, content)
        }
    }
    console.log(`converted ${modelName}.`)
}

console.log(`Conversion completed with ${i} errors.`)