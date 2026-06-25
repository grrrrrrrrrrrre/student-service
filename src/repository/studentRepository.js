let collection;
export const init = db => collection = db.collection("college");

export const createStudent = async ({id, name, password}) => {
    const existingStudent = await collection.findOne({ _id: id });
    if (!existingStudent) {
        await collection.insertOne({_id: id, name, password, scores: {}});
        return true;
    }
}

export const findStudentById = async id => await collection.findOne({ _id: id });

export const updateStudent = async (id, data) => collection.findOneAndUpdate(
    {_id: id},
    {$set: {data}},
    {projection: {scores: 0}, returnDocument: "after"}
)

export const findStudentsByName = async name => await collection.find({name: {$regex: `^${name}$`, $options: 'i'}}, {projection: {password: 0}}).toArray();

export const countStudentsByNames = async names => {
    const regexConditions = names.map(name => ({
        name: {regex: `^${name}$`, $options: 'i'}
    }))
    return await collection.countDocuments({$or: regexConditions});
}

export const findStudentsByMinScore = async (exam, minScore) => {
    const students = [];
    const cursor = await collection.find(
        {[`scores.${exam}`]: {$gte: minScore}}, {projection: {password: 0}}
    )
    for await (const student of cursor) {
        students.push(student);
    }
    return students;
}
