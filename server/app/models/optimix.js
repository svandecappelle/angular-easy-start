"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pricing = sequelize.define("Pricing", {
    property: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    tableName: 'pricing',
    timestamps: true, // don't add the timestamp attributes (updatedAt, createdAt)
    underscored: true // transform the columns camelCase into underscored table_name.
  });

  return Pricing;
};
