'use strict';
// import {DataTypes} from 'sequelize';
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("users", {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt : Sequelize.DATE

    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("users");
  }
};
