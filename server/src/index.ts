import express from 'express';
import cors from 'cors';
import router from './routes/index'; 
import  sequelize  from '../src/config/database';
import errorHandler from './middleware/ErrorHandingMiddleware';

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router); 
//обработка ошибок
app.use(errorHandler);

 sequelize
 .sync()
 .then(() => {
   console.log('All models were synchronized successfully.');
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
 })
 .catch((error) => {
   console.error('Unable to synchronize models with the database:', error);
 });