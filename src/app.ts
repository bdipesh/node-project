import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRoutes from './routes/userRoute'
import batchRoutes from './routes/batchRoute'
import courseRoutes from './routes/course'
import noticeRoutes from './routes/noticeRoute'
import attendanceRoutes from './routes/attendanceRoute'
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use('/static', express.static('uploads'));
app.use(express.static(path.join(__dirname, '../uploads')));

app.use(logger('dev'));
app.use(cookieParser());

// app.use('/api/v1/root', swaggerUi.serve, swaggerUi.setup(swaggerDocument
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/batch', batchRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/notice', noticeRoutes);
app.use('/api/v1/attendance', attendanceRoutes);






export default app;
