module.exports = (sequelize,DataTypes) =>{
    const Stock = sequelize.define("stocks",{
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status:{
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue:"IN" //OUT
      },
    },
    {freezeTableName: true,
     timestamps:true});

    return Stock;
}