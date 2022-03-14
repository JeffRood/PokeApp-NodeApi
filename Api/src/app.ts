import express, { urlencoded } from 'express'
import morgan from 'morgan';
import cors from 'cors'
import authRoutes from './routes/auth.routes';
import userRoute from './routes/user.routes';
import passportMiddleware from './middlewares/passport';
import passport from 'passport';
// Initializations
const app = express();

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.get('/api/v1', (req, res) => {
    res.send(`Run at http://localhost:${app.get('port')}`);
})


app.use(authRoutes);
app.use(userRoute);

export default app;