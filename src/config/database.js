module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    undescored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
}
