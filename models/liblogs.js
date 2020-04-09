module.exports = (sequelize, DataTypes) => {
    var LLog = sequelize.define('LLog', {
        userId:{
            type:DataTypes.STRING,
             allowNull: false
              },
          bookId:{
              type:DataTypes.STRING,
              allowNull: false
              },
        returnStatus:{
            type: DataTypes.BOOLEAN,
            allowNull:false
             } ,
        } , 
        {
            freezeTableName: true
        }
      );
    // sync table if you are running this first time so it create a table in db
    //LLog.sync({ force: true });
    return LLog;
};
