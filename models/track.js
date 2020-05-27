'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    Track_Name: DataTypes.STRING,
    Track_Duration: DataTypes.NUMBER,
    Album_ID: DataTypes.NUMBER
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
  };
  return Track;
};