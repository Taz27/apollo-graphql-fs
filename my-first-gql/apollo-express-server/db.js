//create a DataStore with 'notarealdb' to simulate a database.
const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
   students:store.collection('students'),
   colleges:store.collection('colleges')
};

//console.log(DataStore);