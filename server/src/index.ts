import express from 'express';
import cors from 'cors';
import router from './routes'; 
import { sequelize } from './config/database';
import { Category, CategoryAttributes} from './models/Category';
import errorHandler from './middleware/ErrorHandingMiddleware';

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router); 
app.use(errorHandler);

 const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    await Category.initializeDefaultCategories(); // Создание дефолтных категорий

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch(error) {
    console.error('Unable to synchronize models with the database:', error);
  }
 }
 start()
