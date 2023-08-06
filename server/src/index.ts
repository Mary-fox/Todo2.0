import express from 'express';
import cors from 'cors';
// import categoryRoutes from './routes/categoryRoutes';
// import taskRoutes from './routes/taskRouter';
import router from './routes'; 
import  sequelize  from '../src/config/database';

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
// app.use('/api', (req, res) => {
//   res.send('Server is up and running!');
// });

// Add your routes here
// app.use('/api/categories', categoryRoutes);
// app.use('/api/tasks', taskRoutes);
app.use('/api', router); // Используем главный роутер с префиксом /api

 // Подставьте путь к файлу с вашим объектом sequelize

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