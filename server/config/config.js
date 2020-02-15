config = {
    port: process.env.PORT || 3000,
    db : {
        dbHost: 'mongodb://database/27017',
        dbName: 'teams_db'
    } 
}

module.exports = config;