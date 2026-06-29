import {Schema, model} from 'mongoose';

const studentSchema = new Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    scores: {
        type: Map,
        key: String,
        of: Number,
        default: {}
    },
    toJSON: {
        transform: (doc, ret) => {
            ret._id = doc._id;
            delete ret.password;
            return ret;
        }
    },
}).set("versionKey", "false")

const Student = model('Student', studentSchema, 'college');

export default Student;