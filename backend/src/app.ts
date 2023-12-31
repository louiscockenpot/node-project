import express from 'express';
import { LearningFact, LearningPackage, UserPackageLearning, UserLearningFact, User, FactStatistics } from './models'; // Adjust the import path as needed.
import cors from 'cors';
import { insertLearningPackages } from './insert-learning-packages';
import { insertLearningFacts } from './insert-learning-facts';
import { insertUsers } from './insert-users';
import { insertFactStatistics } from './insert-fact-statistics';
import { Sequelize, Op, useInflection } from 'sequelize';
import { generateToken, verifyToken } from './jwt';
import {sequelize} from "./models";

sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  insertLearningPackages().then(() => {
      insertLearningFacts().then(() => {
        insertUsers().then(() => {
          insertFactStatistics();
        });
      });
    });
});


const app = express();
const port = 3000;


// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to angular frontend
app.use(cors());


// Search for Learnigfacts by keywords in description
// Description is title + question + answer
app.get('/api/learning-facts/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const learningFacts = await LearningFact.findAll({
      where: {
        description: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    });

    res.status(200).json(learningFacts);
  } catch (error) {
    console.error('Error fetching learning facts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// FactStatistics for a user
app.post('/api/fact-statistics', verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const factStatistics = await FactStatistics.findAll({
      where: { userId: userId },
    });
    res.status(200).json(factStatistics);
  } catch (error) {
    console.error('Error fetching FactStatistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new FactStatistic
app.post('/api/fact-statistics', async (req, res) => {
  const newFactStatisticData = req.body;
  try {
    const newFactStatistic = await FactStatistics.create(newFactStatisticData);
    res.status(201).json(newFactStatistic);
  } catch (error) {
    console.error('Error creating FactStatistic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Login route
app.post('/api/login', async (req, res) => {
  try {

    const { email, username } = req.body;
    const user = await User.findOne({ where: { username, email } });

    if (user) {
      res.status(200).json({ token: generateToken(user) });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
    
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create account route
app.post('/api/register', async (req, res) => {
  try {
    const { email, username } = req.body;
    const newUser = await User.create({ email, username });

    // Create a new learning package for the user
    // Pckage ID is the same as the user ID

    const newPackage = await LearningPackage.create({
      title: 'My Learning Package',
      description: 'A learning package for the user',
      category: 'General',
      targetAudience: 'General',
      difficultyLevel: 10,
    });

    res.status(201).json({ token: generateToken(newUser) });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all LearningPackages
app.get('/api/package', async (req, res) => {
  try {
    const learningPackages = await LearningPackage.findAll();
    res.status(200).json(learningPackages);
  } catch (error) {
    console.error('Error fetching LearningPackages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific LearningPackage by ID
app.get('/api/package/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const learningPackage = await LearningPackage.findByPk(id);
    if (learningPackage) {
      res.status(200).json(learningPackage);
    } else {
      res.status(404).json({ error: `LearningPackage not found for ID: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching LearningPackage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new LearningPackage
app.post('/api/package', async (req, res) => {
  const newPackageData = req.body; // Assuming you send JSON data in the request body
  try {
    const newPackage = await LearningPackage.create(newPackageData);
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error creating LearningPackage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an existing LearningPackage by ID
app.put('/api/package/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPackageData = req.body; // Assuming you send JSON data in the request body
  try {
    const [updatedCount] = await LearningPackage.update(updatedPackageData, {
      where: { id },
    });
    if (updatedCount > 0) {
      const updatedPackage = await LearningPackage.findByPk(id);
      res.status(200).json(updatedPackage);
    } else {
      res.status(404).json({ error: `LearningPackage not found for ID: ${id}` });
    }
  } catch (error) {
    console.error('Error updating LearningPackage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get summaries of all LearningPackages (only id and title)
app.get('/api/package-summaries', async (req, res) => {
  try {
    const summaries = await LearningPackage.findAll({
      attributes: ['id', 'title'],
    });
    res.status(200).json(summaries);
  } catch (error) {
    console.error('Error fetching LearningPackage summaries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/liveness', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

// Route to get LearningPackage summaries with filtering
// app.get('/api/packagesummaries/search', async (req, res) => {
//   const { title, description, tag } = req.query as {
//     title: string | undefined;
//     description: string | undefined;
//     tag: string | undefined;
//   };

//   try {
//     const filteredPackages = await LearningPackage.findAll({
//       where: {
//         title: title ? { [sequelize.Op.iLike]: `%${title}%` } : undefined,
//         description: description ? { [sequelize.Op.iLike]: `%${description}%` } : undefined,
//         category: tag ? { [sequelize.Op.iLike]: `%${tag}%` } : undefined,
//       },
//       attributes: ['id', 'title'],
//     });

//     res.status(200).json(filteredPackages);
//   } catch (error) {
//     console.error('Error filtering LearningPackages:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// Routes for LearningFact
app.get('/api/facts', verifyToken, async (req, res) => {
  try {
    // Assuming that the user ID is present in the decoded JWT
    const userId = req.user.id;

    // Fetch learning facts linked to the user ID
    const userLearningFacts = await LearningFact.findAll({
      where: {
        learningPackageId: userId, // Assuming that the user ID is the same as the package ID is correct for our implementation
      },
    });

    res.status(200).json(userLearningFacts);
  } catch (error) {
    console.error('Error fetching user LearningFacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new LearningFact
app.post('/api/fact', verifyToken, async (req, res) => {
  const newFactData = req.body;
  const userId = req.user.id; 
  // Description is title + question + answer
  newFactData.description = newFactData.title + " " +  newFactData.question + " " +  newFactData.answer;
  newFactData.learningPackageId = userId; // Set the learningPackageId
  try {
    const newFact = await LearningFact.create(newFactData);
    res.status(201).json(newFact);
  } catch (error) {
    console.error('Error creating LearningFact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all LearningFacts for a given package
app.get('/api/package/:id/facts', async (req, res) => {
  const { id } = req.params;
  try {
    const learningFacts = await LearningFact.findAll({
      where: { learningPackageId: id },
    });
    res.status(200).json(learningFacts);
  } catch (error) {
    console.error('Error fetching LearningFacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific LearningFact within a given package
app.get('/api/package/:id/fact/:factId', async (req, res) => {
  const { id, factId } = req.params;
  try {
    const learningFact = await LearningFact.findOne({
      where: { id: factId, learningPackageId: id },
    });

    if (learningFact) {
      res.status(200).json(learningFact);
    } else {
      res.status(404).json({ error: `LearningFact not found for ID: ${factId}` });
    }
  } catch (error) {
    console.error('Error fetching LearningFact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to create and add a new Fact to a given package
app.post('/api/package/:id/fact', async (req, res) => {
  const { id } = req.params;
  const newFactData = req.body; // Assuming you send JSON data in the request body
  newFactData.learningPackageId = id; // Set the learningPackageId

  try {
    const newFact = await LearningFact.create(newFactData);
    res.status(201).json(newFact);
  } catch (error) {
    console.error('Error creating LearningFact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an existing Fact of a given package
app.put('/api/package/:id/fact/:factId', async (req, res) => {
  const { id, factId } = req.params;
  const updatedFactData = req.body; // Assuming you send JSON data in the request body

  try {
    const [updatedCount] = await LearningFact.update(updatedFactData, {
      where: { id: factId, learningPackageId: id },
    });

    if (updatedCount > 0) {
      const updatedFact = await LearningFact.findByPk(factId);
      res.status(200).json(updatedFact);
    } else {
      res.status(404).json({ error: `LearningFact not found for ID: ${factId}` });
    }
  } catch (error) {
    console.error('Error updating LearningFact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete or mark as disabled an existing Fact of a given package
app.delete('/api/package/:id/fact/:factId', async (req, res) => {
  const { id, factId } = req.params;

  try {
    const deletedCount = await LearningFact.destroy({
      where: { id: factId, learningPackageId: id },
    });

    if (deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: `LearningFact not found for ID: ${factId}`});
    }
  } catch (error) {
    console.error('Error deleting LearningFact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Not CRUD api routes

// Start a learning session:
app.post('/api/package/:id/start-session', async (req, res) => {
  const { id } = req.params;

  try {
    // Implement the logic to start a learning session for the specified package here.
    // You can return relevant session data or the next learning fact to study.
    // Example: const nextLearningFact = await getNextLearningFact(id);
    
    res.status(200).json(/* Return relevant data or nextLearningFact */);
  } catch (error) {
    console.error('Error starting a learning session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Answer to one LearningFact:
app.post('/api/package/:id/fact/:factId/answer', async (req, res) => {
  const { id, factId } = req.params;
  const userAnswerData = req.body; // Include user's answer and other relevant data

  try {
    // Implement the logic to save user's answer and compute the next review date here.
    // Example: const result = await saveUserAnswer(id, factId, userAnswerData);
    
    res.status(200).json(/* Return relevant result or updated fact data */);
  } catch (error) {
    console.error('Error saving user answer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// End a learning session:
app.post('/api/package/:id/end-session', async (req, res) => {
  const { id } = req.params;

  try {
    // Implement the logic to end the learning session and provide a summary.
    // Example: const sessionSummary = await endLearningSession(id);
    
    res.status(200).json(/* Return relevant session summary or data */);
  } catch (error) {
    console.error('Error ending a learning session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
