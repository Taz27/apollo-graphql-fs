const db = require('./db');
//get 'axios' to make fetch calls
const axios = require("axios");


const Query = {
    greeting: () => "Hello from Taran Mand! Enjoy GraphQL",
    sayHello: (root, args) => `Hi ${args.name}! GraphQL says Hello to you.`,
    students: () => db.students.list(),
    users: () => {
            return axios.get("https://jsonplaceholder.typicode.com/users")
                    .then((res) => {
                        //console.log(res);
                        return res.data;
                    });
    },
    studentById: (root, args, context, info) => {
        //console.log(root);
        //console.log(args);
        //console.log(context);
        //console.log(info);
        return db.students.get(args.id);
    },
    setFavColor: (root, args) => `Your favorite color is ${args.color}` 
};

//for each single Student object returned, this resolver is invoked
const Student = {
    fullName: (root, args, context, info) => `${root.firstName} ${root.lastName}`,
    college: (root) => db.colleges.get(root.collegeId)
};

//for each single User object returned, this resolver is invoked
const User = {
    nickname: (root, args, context, info) => `${root.company.name}`
};

const Mutation = {
    createStudent: (root, args, context, info) => db.students.create({firstName: args.firstName, lastName: args.lastName, collegeId: args.collegeId}),
    addStudent_returns_object: (root, args, context, info) => {
       let id = db.students.create({firstName: args.firstName, lastName: args.lastName, collegeId: args.collegeId});
       return db.students.get(id);
    },
    delStudent: (root, args, context, info) => {
        db.students.delete(args.sid);
        return "SUCCESSFULLY DELETED!";
    },
    updateStudent: (root, args) => {
        db.students.update(args.stud);
        return "SUCCESSFULLY UPDATED!";
    }
};

module.exports = {Query, Student, User, Mutation}