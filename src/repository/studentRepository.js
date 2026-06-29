import Student from "../model/student.js";

export const createStudent = student => Student.create(student);

export const findStudentById = id => Student.findById(id).select('-password').lean().exec();

export const deleteStudent = id => Student.findByIdAndDelete(id).select('-password').lean().exec();

export const updateStudent = (id, data) => Student.findByIdAndUpdate(
    id, data, {returnDocument: 'after'})
    .select('-scores')
    .lean().exec();

export const findStudentsByName = name => Student.find({name: new RegExp(`^${name}$`, 'i')}).select('-password');

export const countStudentsByNames = names => {
    const regexConditions = names.map(name => ({name: {$regex: `^${name}$`, $options: 'i'}}));
    return Student.countDocuments({$or: regexConditions});
}

export const findStudentsByMinScore = (exam, minScore) => Student.find({[`scores.${exam}`]: {$gte: minScore}}).select({'password': 0});