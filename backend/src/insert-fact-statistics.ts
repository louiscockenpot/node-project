// insertFactStatistics.ts
import { FactStatistics } from './models';

export const insertFactStatistics = async () => {
  try {
    // Define fact statistics data
    const factStatisticsData = [
      // Learning Fact 1
      {
        date: new Date(),
        learningFactId: 1,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        learningFactId: 1,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        learningFactId: 1,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        learningFactId: 1,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        learningFactId: 1,
        userId: 1,
      },

      // Learning Fact 2
      {
        date: new Date(),
        learningFactId: 2,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        learningFactId: 2,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        learningFactId: 2,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        learningFactId: 2,
        userId: 1,
      },
      {
        date: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        learningFactId: 2,
        userId: 1,
      },
    ];

    // Create instances of FactStatistics model and insert them into the database
    for (const statData of factStatisticsData) {
      await FactStatistics.create(statData);
    }

    console.log('Fact statistics inserted successfully');
  } catch (error) {
    console.error('Error inserting fact statistics:', error);
  }
};

insertFactStatistics();