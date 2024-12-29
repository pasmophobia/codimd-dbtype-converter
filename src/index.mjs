import { Sequelize} from "sequelize";
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
original.user = user(original.sequelize, Sequelize);
target.user = user(target.sequelize, Sequelize);
original.note = note(original.sequelize, Sequelize);
target.note = note(target.sequelize, Sequelize);
original.revision = revision(original.sequelize, Sequelize);
target.revision = revision(target.sequelize, Sequelize);
original.author = author(original.sequelize, Sequelize);
target.author = author(target.sequelize, Sequelize);
console.log("Initialized.")

// Conversion
console.log("converting users.")
const users = await original.user.findAll()
await target.user.bulkCreate(users)
console.log("converted users.")

console.log("converting notes.")
const notes = await original.note.findAll()
await target.note.bulkCreate(notes)
console.log("converted notes.")

console.log("converting revisions.")

const revisions = await original.revision.findAll()
await target.revision.bulkCreate(revisions)
console.log("converted revisions.")

console.log("converting authors.")
const authors = await original.author.findAll()
await target.author.bulkCreate(authors)
console.log("converted authors.")

console.log("Conversion complete.")