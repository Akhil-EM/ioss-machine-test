module.exports = (sequelize,DataTypes) =>{
    const Product = sequelize.define("products",{
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      item_code:{
        type: DataTypes.STRING(100),
        allowNull: false,

      },
      name:{
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {freezeTableName: true,
     timestamps:true});

    return Product;
}