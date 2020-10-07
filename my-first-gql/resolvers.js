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
                }
}
 module.exports = {Query}