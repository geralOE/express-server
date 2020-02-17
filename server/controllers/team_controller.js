const config = require("../config/config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const Team = require('../models/team_model');

/**
 * Method that Show a team 
 */
var getTeam =  ( req, res ) => {
    let id = req.params.id;
  
    Team.findById(id, ( err, team ) => {
      if( err ) {
          return res.status(400).json({
              ok: false,
              err
          });
      }
  
      res.json({
          ok: true,
          data: team,
          message: "Mostrando el equipo seleccionado",        
      });
      
    });
  };


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

            Team.countDocuments({ status: true }, ( err, count ) => {
                res.json({
                    ok: true,
                    data: teams,
                    message: "Mostrando equipos",
                    count: count
                    
                })
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

/**
 * Method Delete team
 * only erase logical, ex. status = false
 */
var deleteTeam  =  ( req, res ) => {
    let id = req.params.id
    

    
    Team.findByIdAndUpdate(id, { status: false }, { new: true }, ( err, teamDB ) => {
        
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

         res.json({
            ok: true,
            data: teamDB,
            message: "Se eliminó el team correctamente"
        });
    });
}

/*
 * Method updateTeam team
 */
var updateTeam  =  ( req, res ) => {
    let id = req.params.id
    let body = req.body;    

    Team.findByIdAndUpdate(id, {team_name: body.team_name}, { new: true, runValidators:true },  ( err, teamDB ) => {
        
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

         res.json({
            ok: true,
            data: teamDB,
            message: "Se actualizó el team correctamente"
        });
    });
}

module.exports.getTeam = getTeam;
module.exports.getTeams = getTeams;
module.exports.insertTeam = insertTeam;
module.exports.deleteTeam = deleteTeam;
module.exports.updateTeam = updateTeam;