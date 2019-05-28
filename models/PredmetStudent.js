module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PredmetStudent', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idStudent: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        idPredmet: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        idAkademskaGodina: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        ocjena: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        },
        datum_upisa: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    }, {
            tableName: 'predmet_student'
        });
};