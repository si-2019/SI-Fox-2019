module.exports = function(sequelize, DataTypes) {
    return sequelize.define('PrisustvoTutorijali', {
      id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      idStudenta: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: 'Korisnik',
            key: 'id'
          }
      },
      idPredmeta: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: 'Predmet',
            key: 'id'
          }
      },
      prisutan: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      brojSedmice: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      
    }, {
      tableName: 'PrisustvoTutorijali'
    });
  };
  