import mongoose from 'mongoose';
import config from  'config';
import logger from './logger';

async function connect() {
    try {
    
    const MONGO_URI = 'mongodb+srv://benn1234:benn1234@benncluster.btncfea.mongodb.net/rest-api-typescript?retryWrites=true&w=majority';

    await mongoose.connect(MONGO_URI, () => logger.info('Connected to DataBase'))
    }   catch (err){
        logger.info('Could not connect to DataBase ' + err);
        process.exit(1)
    }
}

export default connect