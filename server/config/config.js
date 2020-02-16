module.exports  = {
    port: process.env.PORT || 3000,
    db : {
        dbHost: 'mongodb://database:27017/teams_db',
        dbName: 'teams_db'
    } 
}