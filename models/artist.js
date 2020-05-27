'use strict';
module.exports = (sequelize, DataTypes) => {
    const Artist = sequelize.define('Artist', {
        Artist_Name: DataTypes.STRING
    }, {});
    Artist.associate = function (models) {
        Artist.hasMany(models.Album, {foreignKey:'Artist_ID'});
    };
    return Artist;
};