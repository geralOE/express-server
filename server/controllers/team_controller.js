const config = require("../config/config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const Team = require('../models/team_model');


/*
*   Method get all teams
*/
var getTeams =  ( req, res ) => {

    let from = Number(req.query.from) || 0;

    let limit = Number(req.query.limit) || 5;

    //Get all teams with pagination
    Team.find({ status: true })
        .skip(from)
        .limit(limit)
        .exec( ( err, teams ) => {
            if( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data: teams,
                message: "Mostrando equipos"

            })
    })
}

/*
*    Method Insert team
*/
var insertTeam  =  ( req, res ) => {
    let body = req.body;
    
    let team = new Team({
        team_name: body.team_name
    })
    
    team.save( ( err, teamDB ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        res.json({
            ok: true,
            data: teamDB,
            message: "Se guardó el team correctamente"
        });
    });

}


module.exports.getTeams = getTeams;
module.exports.insertTeam = insertTeam;