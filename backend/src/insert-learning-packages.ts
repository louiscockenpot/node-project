// insertLearningPackages.ts
import { LearningPackage } from './models';

export const insertLearningPackages = async () => {
  try {
    // Define the learning packages data
    const learningPackagesData = [
      {
        id: "1",
        title: "Learn TypeScript",
        description: "A course on TypeScript programming.",
        category: "Programming",
        targetAudience: "Developers",
        difficultyLevel: 15,
      },
      {
        id: "2",
        title: "Learn Node.js",
        description: "A comprehensive guide to Node.js development.",
        category: "Web Development",
        targetAudience: "Developers",
        difficultyLevel: 16,
      },
      {
        id: "3",
        title: "Learn HTML",
        description: "An introductory course on HTML.",
        category: "Web Development",
        targetAudience: "Beginners",
        difficultyLevel: 8,
      },
      {
        id: "4",
        title: "Learn Angular",
        description: "A hands-on tutorial for Angular framework.",
        category: "Web Development",
        targetAudience: "Developers",
        difficultyLevel: 18,
      },
    ];

    // Create instances of LearningPackage model and insert them into the database
    for (const packageData of learningPackagesData) {
      await LearningPackage.create(packageData);
    }

    console.log('Learning packages inserted successfully');
  } catch (error) {
    console.error('Error inserting learning packages:', error);
  }
};
