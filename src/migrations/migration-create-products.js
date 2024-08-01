'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },
            year: {
                type: Sequelize.DATE
            },
            cpu: {
                type: Sequelize.STRING
            },
            display: {
                type: Sequelize.STRING
            },
            camera: {
                type: Sequelize.STRING
            },
            battery: {
                type: Sequelize.STRING
            },
            os: {
                type: Sequelize.STRING
            },
            idBrand: {
                type: Sequelize.INTEGER
            },
            idDiscount: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};