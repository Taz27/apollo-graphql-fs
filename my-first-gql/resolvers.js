const db = require('./db');
const axios = require("axios");


const Query = {
    greeting: () => "Hello from Taran Mand! Enjoy GraphQL",
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
    }
};

//for each single student object returned,resolver is invoked

const Student = {
    fullName: (root, args, context, info) => `${root.firstName} ${root.lastName}`
};

const User = {
    nickname: (root, args, context, info) => `${root.company.name}`
};

module.exports = {Query, Student, User}