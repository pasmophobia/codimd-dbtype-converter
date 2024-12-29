const { Sequelize } = require('sequelize');
const user = require('codimd/lib/models/user');
const note = require('codimd/lib/models/note');
const revision = require('codimd/lib/models/revision');
const author = require('codimd/lib/models/author');

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
original.user.findAll().then(users => {
    console.log("found users.")
    users.forEach((user,index) => {
        console.log(`converting user ${index}/${users.length}.`)
        target.user.create(user)
    })
})
console.log("converted users.")

console.log("converting notes.")
original.note.findAll().then(notes => {
    console.log("found notes.")
    notes.forEach((note,index) => {
        console.log(`converting note ${index}/${notes.length}.`)
        target.note.create(note)
    })
})
console.log("converted notes.")

console.log("converting revisions.")
original.revision.findAll().then(revisions => {
    console.log("found revisions.")
    revisions.forEach((revision,index) => {
        console.log(`converting revision ${index}/${revisions.length}.`)
        target.revision.create(revision)
    })
})
console.log("converted revisions.")

console.log("converting authors.")
original.author.findAll().then(authors => {
    console.log("found authors.")
    authors.forEach((author,index) => {
        console.log(`converting author ${index}/${authors.length}.`)
        target.author.create(author)
    })
})
console.log("converted authors.")

console.log("Conversion complete.")