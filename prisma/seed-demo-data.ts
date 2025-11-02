import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Arrays for generating random data
const firstNames = [
  'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
  'Lucas', 'Isabella', 'Mason', 'Mia', 'Ethan', 'Charlotte', 'Alexander', 'Amelia',
  'Daniel', 'Harper', 'Michael', 'Evelyn'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

const cities = [
  'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City', 'Calabar',
  'Warri', 'Kaduna', 'Jos', 'Enugu', 'Abeokuta', 'Onitsha', 'Uyo', 'Owerri',
  'Maiduguri', 'Ado-Ekiti', 'Ilorin', 'Akure', 'Sokoto'
];

const states = [
  'Lagos', 'FCT', 'Rivers', 'Kano', 'Oyo', 'Edo', 'Cross River', 'Delta',
  'Kaduna', 'Plateau', 'Enugu', 'Ogun', 'Anambra', 'Akwa Ibom', 'Imo',
  'Borno', 'Ekiti', 'Kwara', 'Ondo', 'Sokoto'
];

const localGovts = [
  'Ikeja', 'Abuja Municipal', 'Port Harcourt', 'Kano Municipal', 'Ibadan North',
  'Oredo', 'Calabar Municipal', 'Warri South', 'Kaduna North', 'Jos North',
  'Enugu North', 'Abeokuta South', 'Onitsha North', 'Uyo', 'Owerri Municipal',
  'Maiduguri', 'Ado-Ekiti', 'Ilorin East', 'Akure South', 'Sokoto North'
];

const interests = [
  'Reading', 'Traveling', 'Cooking', 'Photography', 'Music', 'Sports',
  'Art', 'Dancing', 'Movies', 'Gaming', 'Fitness', 'Technology',
  'Fashion', 'Food', 'Nature', 'Writing', 'Yoga', 'Hiking',
  'Swimming', 'Volunteering'
];

const hobbies = [
  'Playing guitar', 'Painting', 'Gardening', 'Chess', 'Running',
  'Cycling', 'Singing', 'Baking', 'Photography', 'Writing poetry',
  'Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Cooking',
  'Reading novels', 'Watching movies', 'Learning languages',
  'Collecting stamps', 'DIY crafts'
];

const complexions = [
  'Light', 'Fair', 'Medium', 'Olive', 'Brown', 'Dark'
];

const bios = [
  'Adventure seeker looking for someone to explore life with',
  'Love laughing and making others smile',
  'Passionate about life and all it has to offer',
  'Looking for genuine connections and meaningful conversations',
  'Foodie who loves trying new restaurants',
  'Music lover and concert enthusiast',
  'Fitness enthusiast with a love for outdoor activities',
  'Bookworm seeking intellectual discussions',
  'Travel addict collecting memories around the world',
  'Creative soul with an artistic perspective',
  'Sports fan with a competitive spirit',
  'Nature lover and hiking enthusiast',
  'Movie buff who quotes films in daily conversation',
  'Tech geek with a passion for innovation',
  'Animal lover and occasional pet photographer',
  'Coffee addict and casual philosopher',
  'Beach person who loves the ocean',
  'Ambitious dreamer with big goals',
  'Friendly introvert seeking meaningful connections',
  'Optimist who always sees the bright side'
];

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random number between min and max
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random date between two dates
const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to generate random user data
const generateUserData = (index: number) => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const city = getRandomItem(cities);
  const state = getRandomItem(states);
  const localGovt = getRandomItem(localGovts);
  
  // Generate a random date between 1980 and 2000 for date of birth
  const dob = getRandomDate(new Date(1980, 0, 1), new Date(2000, 11, 31));
  
  return {
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`,
    username: `${firstName.toLowerCase()}${index}`,
    password: bcrypt.hashSync('password123', 10), // Same password for all demo users
    role: 'user',
    isVerified: true,
    profile: {
      firstname: firstName,
      lastname: lastName,
      middlename: Math.random() > 0.5 ? getRandomItem(firstNames) : null,
      dob: dob,
      phoneNum: `080${getRandomNumber(10000000, 99999999)}`,
      sex: Math.random() > 0.5 ? 'Male' : 'Female',
      imageUpload: `https://i.pravatar.cc/300?img=${index + 1}`, // Placeholder avatar
      address: `${getRandomNumber(1, 100)} ${city} Street`,
      state: state,
      city: city,
      localGovt: localGovt,
      bio: getRandomItem(bios),
      interest: getRandomItem(interests),
      heightFt: getRandomNumber(4.5, 6.5),
      weightKg: getRandomNumber(50, 95),
      complexion: getRandomItem(complexions),
      hobbies: getRandomItem(hobbies)
    }
  };
};

async function main() {
  console.log('Starting to seed demo data...');

  // Create 20 demo users
  for (let i = 0; i < 20; i++) {
    const userData = generateUserData(i);
    
    try {
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          username: userData.username,
          password: userData.password,
          role: userData.role,
          isVerified: userData.isVerified,
          profile: {
            create: userData.profile
          }
        },
        include: {
          profile: true
        }
      });
      
      console.log(`Created user: ${user.email}`);
    } catch (error) {
      console.error(`Error creating user ${userData.email}:`, error);
    }
  }

  console.log('Demo data seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding demo data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });