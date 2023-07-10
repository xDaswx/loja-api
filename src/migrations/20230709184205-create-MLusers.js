'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('MLusers',{
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
    email:{
        allowNull:false,
        type:Sequelize.STRING
    },
    state:{
        type:Sequelize.STRING
    },
    passHashed:{
        allowNull:false,
        type:Sequelize.STRING
    },
    token:{
        allowNull:false,
        type:Sequelize.STRING
    }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('MLusers')
  }
};
