"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var prisma = new client_1.PrismaClient();
// Arrays for generating random data
var firstNames = [
    'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
    'Lucas', 'Isabella', 'Mason', 'Mia', 'Ethan', 'Charlotte', 'Alexander', 'Amelia',
    'Daniel', 'Harper', 'Michael', 'Evelyn'
];
var lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];
var cities = [
    'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City', 'Calabar',
    'Warri', 'Kaduna', 'Jos', 'Enugu', 'Abeokuta', 'Onitsha', 'Uyo', 'Owerri',
    'Maiduguri', 'Ado-Ekiti', 'Ilorin', 'Akure', 'Sokoto'
];
var states = [
    'Lagos', 'FCT', 'Rivers', 'Kano', 'Oyo', 'Edo', 'Cross River', 'Delta',
    'Kaduna', 'Plateau', 'Enugu', 'Ogun', 'Anambra', 'Akwa Ibom', 'Imo',
    'Borno', 'Ekiti', 'Kwara', 'Ondo', 'Sokoto'
];
var localGovts = [
    'Ikeja', 'Abuja Municipal', 'Port Harcourt', 'Kano Municipal', 'Ibadan North',
    'Oredo', 'Calabar Municipal', 'Warri South', 'Kaduna North', 'Jos North',
    'Enugu North', 'Abeokuta South', 'Onitsha North', 'Uyo', 'Owerri Municipal',
    'Maiduguri', 'Ado-Ekiti', 'Ilorin East', 'Akure South', 'Sokoto North'
];
var interests = [
    'Reading', 'Traveling', 'Cooking', 'Photography', 'Music', 'Sports',
    'Art', 'Dancing', 'Movies', 'Gaming', 'Fitness', 'Technology',
    'Fashion', 'Food', 'Nature', 'Writing', 'Yoga', 'Hiking',
    'Swimming', 'Volunteering'
];
var hobbies = [
    'Playing guitar', 'Painting', 'Gardening', 'Chess', 'Running',
    'Cycling', 'Singing', 'Baking', 'Photography', 'Writing poetry',
    'Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Cooking',
    'Reading novels', 'Watching movies', 'Learning languages',
    'Collecting stamps', 'DIY crafts'
];
var complexions = [
    'Light', 'Fair', 'Medium', 'Olive', 'Brown', 'Dark'
];
var bios = [
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
var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};
// Helper function to get random number between min and max
var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Helper function to get random date between two dates
var getRandomDate = function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
// Function to generate random user data
var generateUserData = function (index) {
    var firstName = getRandomItem(firstNames);
    var lastName = getRandomItem(lastNames);
    var city = getRandomItem(cities);
    var state = getRandomItem(states);
    var localGovt = getRandomItem(localGovts);
    // Generate a random date between 1980 and 2000 for date of birth
    var dob = getRandomDate(new Date(1980, 0, 1), new Date(2000, 11, 31));
    return {
        email: "".concat(firstName.toLowerCase(), ".").concat(lastName.toLowerCase()).concat(index, "@example.com"),
        username: "".concat(firstName.toLowerCase()).concat(index),
        password: bcrypt.hashSync('password123', 10), // Same password for all demo users
        role: 'user',
        isVerified: true,
        profile: {
            firstname: firstName,
            lastname: lastName,
            middlename: Math.random() > 0.5 ? getRandomItem(firstNames) : null,
            dob: dob,
            phoneNum: "080".concat(getRandomNumber(10000000, 99999999)),
            sex: Math.random() > 0.5 ? 'Male' : 'Female',
            imageUpload: "https://i.pravatar.cc/300?img=".concat(index + 1), // Placeholder avatar
            address: "".concat(getRandomNumber(1, 100), " ").concat(city, " Street"),
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, userData, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting to seed demo data...');
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 20)) return [3 /*break*/, 6];
                    userData = generateUserData(i);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.user.create({
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
                        })];
                case 3:
                    user = _a.sent();
                    console.log("Created user: ".concat(user.email));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error creating user ".concat(userData.email, ":"), error_1);
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log('Demo data seeding completed!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('Error seeding demo data:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
