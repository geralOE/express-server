const express = require('express');
const Team = require('../models/team_model')
const TeamController = require('../controllers/team_controller')

var api = express.Router();


var api = express.Router();


// Get all teams
api.get( '/team' , TeamController.getTeams );


// Insert a team
api.post( '/team' , TeamController.insertTeam )



// Exportamos la configuración
module.exports = api;