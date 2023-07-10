'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
     return queryInterface.createTable('MLstates',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.dropTable('MLstates');
  }
};
