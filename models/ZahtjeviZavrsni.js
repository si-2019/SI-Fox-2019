module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ZahtjeviZavrsni', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      idTema: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'TemeZavrsnih',
            key: 'id'
          }
      },
      idStudent: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'Korisnik',
            key: 'id'
          }
      },
      idProfesor: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'Korisnik',
            key: 'id'
          }
      },
      odobreno: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      
      
    }, {
      tableName: 'ZahtjeviZavrsni'
    });
  };
  