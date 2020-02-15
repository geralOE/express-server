var mongoose =  require('mongoose');

// Schema
var Schema = mongoose.Schema;


//Creation Schema
var TeamSchema = new Schema({
    team_name: {
        type: String,
        required: [true, 'El nombre del team obligatorio'],
        maxlength: [200, 'El nombre del team es muy grande']
    },   
    reg_time: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: Boolean, //active or deactivated team for logical erase
      default: true
    },
    {
        versionKey: false // You should be aware of the outcome after set to false
    }
});

//Export model
var collectionName = 'team'
module.exports = mongoose.model('Team', TeamSchema, collectionName );
