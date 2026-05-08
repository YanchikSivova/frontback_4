const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    users_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'users_id' 
    },
    first_name: {
      type: DataTypes.STRING(255),
      field: 'first_name'
    },
    last_name: {
      type: DataTypes.STRING(255),
      field: 'last_name'
    },
    age: {
      type: DataTypes.SMALLINT,
      validate: {
        min: 0          
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    tableName: 'users', 
    timestamps: false,
    underscored: true 
  });

  return User;
};