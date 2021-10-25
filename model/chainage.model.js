module.exports = (sequelize, Sequelize) => {
	const Chainage = sequelize.define('chainages', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        chainage_start: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        chainage_end: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        work_type: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        line: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        side: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        asset_id: {
            type: Sequelize.STRING(20),
            allowNull: true
        }
	});
	
	return Chainage;
}