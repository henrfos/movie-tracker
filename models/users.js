module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
      email: Sequelize.DataTypes.STRING,
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
  },{
      timestamps: false
  });

  return User;
};
