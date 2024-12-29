import Sequelize from "sequelize";

export function Author(sequelize, DataTypes) {
    return sequelize.define('Author', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: DataTypes.STRING
        },
        noteId: {
            type: DataTypes.UUID
        },
        userId: {
            type: DataTypes.UUID
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['noteId', 'userId']
            }
        ]
    })
}
export function Note(sequelize, DataTypes) {
    return sequelize.define('Note', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        shortid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defaultValue: shortId.generate
        },
        alias: {
            type: DataTypes.STRING,
            unique: true
        },
        permission: {
            type: DataTypes.ENUM,
            values: permissionTypes
        },
        viewcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        title: {
            type: DataTypes.TEXT,
            get: function () {
                return sequelize.processData(this.getDataValue('title'), '')
            },
            set: function (value) {
                this.setDataValue('title', sequelize.stripNullByte(value))
            }
        },
        content: {
            type: DataTypes.TEXT('long'),
            get: function () {
                return sequelize.processData(this.getDataValue('content'), '')
            },
            set: function (value) {
                this.setDataValue('content', sequelize.stripNullByte(value))
            }
        },
        authorship: {
            type: DataTypes.TEXT('long'),
            get: function () {
                return sequelize.processData(this.getDataValue('authorship'), [], JSON.parse)
            },
            set: function (value) {
                this.setDataValue('authorship', JSON.stringify(value))
            }
        },
        lastchangeAt: {
            type: DataTypes.DATE
        },
        savedAt: {
            type: DataTypes.DATE
        },
        ownerId: {
            type: DataTypes.UUID
        },
        lastchangeuserId: {
            type: DataTypes.UUID
        }
    })
}
export function Revision(sequelize, DataTypes) {
    return sequelize.define('Revision', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        patch: {
            type: DataTypes.TEXT('long'),
            get: function () {
                return sequelize.processData(this.getDataValue('patch'), '')
            },
            set: function (value) {
                this.setDataValue('patch', sequelize.stripNullByte(value))
            }
        },
        lastContent: {
            type: DataTypes.TEXT('long'),
            get: function () {
                return sequelize.processData(this.getDataValue('lastContent'), '')
            },
            set: function (value) {
                this.setDataValue('lastContent', sequelize.stripNullByte(value))
            }
        },
        content: {
            type: DataTypes.TEXT('long'),
            get: function () {
                return sequelize.processData(this.getDataValue('content'), '')
            },
            set: function (value) {
                this.setDataValue('content', sequelize.stripNullByte(value))
            }
        },
        length: {
            type: DataTypes.INTEGER
        },
        authorship: {
            type: DataTypes.TEXT('long'),
            get: function () {
                return sequelize.processData(this.getDataValue('authorship'), [], JSON.parse)
            },
            set: function (value) {
                this.setDataValue('authorship', value ? JSON.stringify(value) : value)
            }
        },
        noteId: {
            type: DataTypes.UUID
        },
    })
}
export function User(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        profileid: {
            type: DataTypes.STRING,
            unique: true
        },
        profile: {
            type: DataTypes.TEXT
        },
        history: {
            type: DataTypes.TEXT
        },
        accessToken: {
            type: DataTypes.TEXT
        },
        refreshToken: {
            type: DataTypes.TEXT
        },
        deleteToken: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        email: {
            type: Sequelize.TEXT,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.TEXT
        }
    })
}