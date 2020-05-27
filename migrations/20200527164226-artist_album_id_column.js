'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Tracks',
      'Album_ID',
      {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Albums',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Tracks', 'Album_ID', {
      type: Sequelize.DataTypes.INTEGER
    });
  }
};