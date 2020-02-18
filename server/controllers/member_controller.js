const config = require("../config/config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const Member = require('../models/member_model');

/**
 * Method that Show all members from all teams
 */
var getMember =  ( req, res ) => {
  let id = req.params.id;

  Member.findById(id)
  .populate('teams')
  .exec( ( err, member ) => {
    if( err ) {
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.json({
        ok: true,
        data: member,
        message: "Mostrando el miembro seleccionado",        
    });

  })

};


/**
 * Method that Show all members from all teams
 */
var getMembers =  ( req, res ) => {

  let from = Number(req.query.from) || 0;

  let limit = Number(req.query.limit) || 5;

  //Get all members with pagination
  Member.find({ status: true })
      .skip(from)
      .limit(limit)
      .exec( ( err, members ) => {
          if( err ) {
              return res.status(400).json({
                  ok: false,
                  err
              });
          }

          Member.countDocuments({ status: true }, ( err, count ) => {
              res.json({
                  ok: true,
                  data: members,
                  message: "Mostrando todos los miembros de todos los equipos",
                  count: count
                  
              });
          });
  });
};


/**
 * Method that Show all members from a team
 */
var getMembersTeam =  ( req, res ) => {
  let id = req.params.team;

  let from = Number(req.query.from) || 0;
  let limit = Number(req.query.limit) || 5;

  //Get all members with pagination
  Member.find({team_id:id})
      .skip(from)
      .limit(limit)
      .exec( ( err, members ) => {
          if( err ) {
              return res.status(400).json({
                  ok: false,
                  err
              });
          }

          Member.countDocuments({team_id:id, status: true }, ( err, count ) => {
              res.json({
                  ok: true,
                  data: members,
                  message: "Mostrando todos los miembros del equipo",
                  count: count
                  
              });
          });
  });
};

/*
*    Method Insert member
*/
var insertMember  =  ( req, res ) => {
  let body = req.body;
  
  let member = new Member({
      member_name: body.member_name,
      e_mail: body.e_mail,
      team_id: body.team_id
  })
  
  member.save( ( err, memberDB ) => {
      if ( err ) {
          return res.status(400).json({
              ok: false,
              err
          });
      }
      
      res.json({
          ok: true,
          data: memberDB,
          message: "Se guardó el miembro del equipo correctamente"
      });
  });

}

/**
 * Method Delete member
 * only erase logical, ex. status = false
 */
var deleteMember  =  ( req, res ) => {
  let id = req.params.id
  

  
  Member.findByIdAndUpdate(id, { status: false }, { new: true }, ( err, memberDB ) => {
      
      if( err ) {
          return res.status(400).json({
              ok: false,
              err
          });
      }

       res.json({
          ok: true,
          data: memberDB,
          message: "Se eliminó al miembro del equipo correctamente"
      });
  });
};

/*
* Method update Member 
*/
var updateMember  =  ( req, res ) => {
  let id = req.params.id
  let body = req.body;    

  Member.findByIdAndUpdate(id, {member_name: body.member_name, e_mail: body.e_mail, team_id: body.team_id}, { new: true, runValidators:true },  ( err, memberDB ) => {
      
      if( err ) {
          return res.status(400).json({
              ok: false,
              err
          });
      }

       res.json({
          ok: true,
          data: memberDB,
          message: "Se actualizó la información del miembro del equipo, correctamente"
      });
  });
}

module.exports.getMember = getMember;
module.exports.getMembers = getMembers;
module.exports.getMembersTeam = getMembersTeam;
module.exports.insertMember = insertMember;
module.exports.deleteMember = deleteMember;
module.exports.updateMember = updateMember;