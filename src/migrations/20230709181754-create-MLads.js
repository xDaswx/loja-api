'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
     return queryInterface.createTable('MLads',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creatorUserId:{
        allowNull:false,
        type:Sequelize.STRING
      },
      state:{
          type:Sequelize.STRING
      },
      category:{
          type:Sequelize.STRING
      },
      images:{
          type:Sequelize.ARRAY(Sequelize.JSON)
      },
      dateCreated:{
          type:Sequelize.DATE
      },
      title:{
          type:Sequelize.STRING
      },
      price:{
          type:Sequelize.INTEGER
      },
      priceNegotiable:{
          type:Sequelize.BOOLEAN
      },
      description:{
          type:Sequelize.STRING
      },
      views:{
          type:Sequelize.INTEGER
      },
      status:{
          type:Sequelize.STRING
      }
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.dropTable('MLads');
  }
};
