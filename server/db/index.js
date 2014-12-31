var dbname = 'memorybox-dev';
var username = process.env.DB_USER || 'dbadmin';
var password = process.env.DB_PW || 'password';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbname, username, password, {
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
    port:    5432, // or 5432 (for postgres)
});

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
  }
})

sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (!!err) {
      console.log('An error occurred while creating the table:', err);
    } else {
      console.log('Table successfully created!');
    }
});

module.exports = sequelize;
