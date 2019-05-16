module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TemeZavrsnih', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      naziv: {
        type: DataTypes.STRING(70),
        allowNull: false
      },
      opis: {
        type: DataTypes.STRING(400),
        allowNull: false
      },
      idProfesora: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'Korisnik',
            key: 'id'
          }
      },
      idPredmeta: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'Predmet',
            key: 'id'
          }
      },
      
    }, {
      tableName: 'TemeZavrsnih'
    });
  };
  