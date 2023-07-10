'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MLcategories',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        allowNull:false,
        type:Sequelize.STRING
      },
      slug:{
        type:Sequelize.STRING
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('MLcategories')
  }
};
