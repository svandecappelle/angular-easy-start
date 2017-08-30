"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pricing = sequelize.define("Pricing", {
    property: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    value: DataTypes.STRING
  }, {
    tableName: 'pricing',
    timestamps: true, // don't add the timestamp attributes (updatedAt, createdAt)
    underscored: true // transform the columns camelCase into underscored table_name.
  });

  return Pricing;
};
