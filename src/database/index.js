import Sequelize from 'sequelize'
import databaseConfig from './../config/database'

import users from './../app/models/User'

const models = [users]

class Database {
  constructor() {
    this.init()
  } 

  init() {
    this.connection = new Sequelize(databaseConfig)

    models.map(model => model.init(this.connection))
  }
}

export default new Database()