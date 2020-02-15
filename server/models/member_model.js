// Load mongoose
var mongoose =  require('mongoose');

// Schema
var Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

//Creation Schema
var MemberSchema = new Schema({
    team_name: {
        type: String,
        required: [true, 'El nombre  es obligatorio'],
        maxlength: [200, 'El nombre es demasiado largo']
    },  
    e_mail: {
        type: String,
        required: "El correo es obligatorio",
        unique: true 
    }, 
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
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
