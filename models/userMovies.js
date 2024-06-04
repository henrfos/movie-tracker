module.exports = (sequelize, Sequelize) => {
  const UserMovie = sequelize.define('UserMovie', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    movieId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    director: {
      type: Sequelize.STRING,
      allowNull: false
    },
    actors: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imdbRating: {
      type: Sequelize.STRING,
      allowNull: false
    },
    poster: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userRating: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    review: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  UserMovie.associate = (models) => {
    UserMovie.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return UserMovie;
};