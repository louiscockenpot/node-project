// insertUsers.ts
import { User } from './models';

export const insertUsers = async () => {
  try {
    // Define user data
    const userData = [
      {
        username: "john_doe",
        email: "john@example.com",
      },
      {
        username: "jane_doe",
        email: "jane@example.com",
      },
      {
        username: "bob_smith",
        email: "bob@example.com",
      },
      {
        username: "alice_jones",
        email: "alice@example.com",
      },
    ];

    // Create instances of User model and insert them into the database
    for (const user of userData) {
      await User.create(user);
    }

    console.log('Users inserted successfully');
  } catch (error) {
    console.error('Error inserting users:', error);
  }
};

insertUsers();