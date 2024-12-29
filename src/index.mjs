import { Sequelize } from "sequelize";
import user from "codimd/lib/models/user.js";
import note from "codimd/lib/models/note.js";
import revision from "codimd/lib/models/revision.js";
import author from "codimd/lib/models/author.js";

// Initialization
console.log("codimd-dbtype-converter (c) 2024 pasmophobia")
console.log("Initializing.")
const original = {}
const target = {}
original.sequelize = new Sequelize(process.env.CMD_CONVERT_ORIGINAL_DB_URL);
target.sequelize = new Sequelize(process.env.CMD_CONVERT_TARGET_DB_URL);
const modelNames = ['User', 'Note', 'Revision', 'Author'];
const functions = {
    User: user,
    Note: note,
    Revision: revision,
    Author: author
}
modelNames.forEach(async (modelName) => {
    original[modelName] = functions[modelName](original.sequelize, Sequelize)
    target[modelName] = functions[modelName](target.sequelize, Sequelize)
})
modelNames.forEach((modelName) => {
    original[modelName].associate(original)
    target[modelName].associate(target)
})
await target.sequelize.sync()
console.log("Initialized.")

// Conversion
for(const modelName in modelNames) {
    console.log(`converting ${modelName}.`)
    const data = await original[modelName].findAll()
    await target[modelName].bulkCreate(data)
    console.log(`converted ${modelName}.`)
}

console.log("Conversion complete.")