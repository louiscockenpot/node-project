import { LearningFact, LearningPackage, UserPackageLearning, UserLearningFact, User } from './models';

import {connectionInfo} from './sequelize.config'; // Assuming you have a configured Sequelize instance
import { Sequelize } from 'sequelize';
import { Options, Dialect } from 'sequelize';

const sequelize = new Sequelize(connectionInfo as Options);

// Synchronize the models with the database
async function synchronizeDatabase() {
  try {
    // Define associations (if you have associations between models)
    // For example, if User has associations with other models, define them here.

    // Synchronize the models with the database
    await User.sync({ force: true });
    await sequelize.sync({ force: true });
    console.log('Database tables synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

synchronizeDatabase();
