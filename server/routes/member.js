var express = require('express');
const MemberController = require('../controllers/member_controller')

var api = express.Router();

// Get a member
api.get('/member/detail/:id', MemberController.getMember); 

// Get all members
api.get('/member/all', MemberController.getMembers); 

// Get all members from a team
api.get('/member/all/:team', MemberController.getMembersTeam); 


// Insert a member
api.post( '/member' , MemberController.insertMember );


// Delete a member 
api.post( '/member/delete/:id' , MemberController.deleteMember );

// Update a member 
api.post( '/member/update/:id' , MemberController.updateMember );

module.exports = api;