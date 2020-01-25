import Sequelize, { Model } from 'sequelize'

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'files',
      }
    )
    return this
  }
}

export default File
