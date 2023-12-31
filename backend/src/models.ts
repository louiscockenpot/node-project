import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectionInfo } from './sequelize.config';
import { Options, Dialect } from 'sequelize';

const sequelize = new Sequelize({
    ...connectionInfo,
    dialect: 'postgres',
});

// LearningFact Model
class LearningFact extends Model {
    id!: string;
    content!: string;
    creationDate!: Date;
    learningPackageId!: string; // Foreign key column
  
    static associate(models: any) {
      LearningFact.belongsTo(models.LearningPackage, {
        foreignKey: 'learningPackageId',
        onDelete: 'CASCADE',
      });
    }
  }
  
  LearningFact.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      learningPackageId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'LearningPackages',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'LearningFact',
    }
  );

// LearningPackage Model
class LearningPackage extends Model {
  id!: string;
  title!: string;
  description!: string;
  category!: string;
  targetAudience!: string;
  difficultyLevel!: number;
}

LearningPackage.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAudience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficultyLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20,
      },
    },
  },
  {
    sequelize,
    modelName: 'LearningPackage',
  }
);

// UserPackageLearning Model
class UserPackageLearning extends Model {
  id!: string;
  startDate!: Date;
  expectedEndDate!: Date;
  minutesPerDayObjective!: number;
  userId!: string;
  learningPackageId!: string;
}

UserPackageLearning.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expectedEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    minutesPerDayObjective: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    learningPackageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserPackageLearning',
  }
);

// UserLearningFact Model
class UserLearningFact extends Model {
  id!: string;
  timesReviewed!: number;
  confidenceLevel!: number;
  lastReviewedDate!: Date;
  userId!: string;
  learningFactId!: string;
  userPackageLearningId!: string;
}

UserLearningFact.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    timesReviewed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confidenceLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastReviewedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    learningFactId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPackageLearningId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserLearningFact',
  }
);

// User Model
class User extends Model {
  id!: string;
  username!: string;
  email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { LearningFact, LearningPackage, UserPackageLearning, UserLearningFact, User, sequelize };
