import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'dietapp',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize