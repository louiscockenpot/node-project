import { LearningFact } from './models'; // Import the LearningFact model

export const insertLearningFacts = async () => {
    try {
        // Define the learning facts data
        const learningFactsData = [
        {
            id: "1",
            content: "TypeScript is a statically typed superset of JavaScript.",
            creationDate: new Date(),
            learningPackageId: "1", // Reference to the learning package ID
        },
        {
            id: "2",
            content: "Node.js allows server-side JavaScript development.",
            creationDate: new Date(),
            learningPackageId: "2",
        },
        {
            id: "3",
            content: "HTML stands for Hypertext Markup Language.",
            creationDate: new Date(),
            learningPackageId: "3",
        },
        {
            id: "4",
            content: "Angular is a popular front-end framework.",
            creationDate: new Date(),
            learningPackageId: "4",
        },
        ];

        for (const factData of learningFactsData) {
            await LearningFact.create(factData);
        }

        console.log('Learning packages inserted successfully');
    } catch (error) {
        console.error('Error inserting learning packages:', error);
    }
};

// Call the function to insert learning facts when needed
insertLearningFacts();
