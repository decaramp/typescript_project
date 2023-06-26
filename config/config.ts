import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

export const config = {
    JWT_SECRET: process.env.JWT_SECRET
}

// export default {
//     PORT: 3000,
// }




// export default {
//     PORT: 3000,
//     MONGO_URI: 'mongodb+srv://benn1234:benn1234@benncluster.btncfea.mongodb.net/rest-api-typescript?retryWrites=true&w=majority',
//     saltWorkFactor: 10,
//     // MONGODB_URI: 'mongodb://localhost:27017/rest-api-typescript'

// };

