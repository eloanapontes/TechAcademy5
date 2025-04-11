module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('refeicoes', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('refeicoes', 'usuarioId');
  }
};
