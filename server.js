const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
// Routes
const mountRoutes = require('./routes');
const limiter = require('./utils/limiter');
const corsOptions = require('./utils/cors');


// Connect with db
dbConnection();

// express app
const app = express();


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// compress all responses
app.use(compression());


// Middlewares
app.use(express.json());

// Logging middleware
if (process.env.NODE_ENV === 'development') { app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') { app.use(morgan('combined', {stream: process.stdout}))}


app.use(limiter);

// Mount Routes
mountRoutes(app);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
