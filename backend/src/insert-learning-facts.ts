// insertLearningFacts.ts
import { LearningFact } from './models';

export const insertLearningFacts = async () => {
  try {
    // Define learning facts data
    const learningFactsData = [
      // Learning Package 1
      {
        title: 'Introduction to TypeScript',
        description: 'An overview of TypeScript features.',
        question: 'What is TypeScript?',
        answer: 'TypeScript is a superset of JavaScript.',
        learningPackageId: 1,
      },
      {
        title: 'TypeScript Data Types',
        description: 'Exploring various data types in TypeScript.',
        question: 'What are the data types in TypeScript?',
        answer: 'Data types include number, string, boolean, etc.',
        learningPackageId: 1,
      },

      // Learning Package 2
      {
        title: 'Node.js Basics',
        description: 'Fundamental concepts of Node.js development.',
        question: 'What is Node.js?',
        answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine.',
        learningPackageId: 2,
      },
      {
        title: 'Building REST APIs with Express',
        description: 'Creating RESTful APIs using the Express framework.',
        question: 'How do you build REST APIs with Express?',
        answer: 'Express simplifies Node.js web application development.',
        learningPackageId: 2,
      },

      // Learning Package 3
      {
        title: 'HTML Structure',
        description: 'Understanding the basic structure of HTML documents.',
        question: 'What is the basic structure of HTML documents?',
        answer: 'HTML consists of elements like <html>, <head>, and <body>.',
        learningPackageId: 3,
      },
      {
        title: 'HTML Forms',
        description: 'Creating forms in HTML for user input.',
        question: 'How do you create forms in HTML?',
        answer: 'Forms use elements like <form>, <input>, and <button>.',
        learningPackageId: 3,
      },

      // Learning Package 4
      {
        title: 'Angular Components',
        description: 'Building components in the Angular framework.',
        question: 'What are Angular components?',
        answer: 'Components are the basic building blocks of Angular apps.',
        learningPackageId: 4,
      },
      {
        title: 'Angular Services',
        description: 'Working with services to encapsulate functionality.',
        question: 'What are Angular services?',
        answer: 'Services in Angular are singletons shared across components.',
        learningPackageId: 4,
      },
    ];

    // Create instances of LearningFact model and insert them into the database
    for (const factData of learningFactsData) {
      await LearningFact.create(factData);
    }

    console.log('Learning facts inserted successfully');
  } catch (error) {
    console.error('Error inserting learning facts:', error);
  }
};

// Usage: Call insertLearningFacts() in your main script or wherever appropriate
insertLearningFacts()