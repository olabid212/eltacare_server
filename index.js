const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');  // Ensure this path is correct
const applicationRoutes = require('./routes/applicationRoute');
const enquiryRoute = require("./routes/enquiryRoute")
const scheduleRoute = require("./routes/scheduleRoute")
const cors = require("cors");
dotenv.config();  // Load environment variables before using them

const connectDB = require("./config/db");
connectDB();  // Connect to DB after loading env variables

const app = express();
const PORT = process.env.PORT || 9876;  // Default to 9876 if no PORT env variable is set

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173' || "https://elta-healthcare.vercel.app/" || "https://eltahealthcare-website.vercel.app/", // Update this as needed
    credentials: true,  // If your frontend is using cookies for authentication, set this to true
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']  // Add 'Authorization' if using auth tokens
}));

// Test route
app.get('/', (req, res) => {
    res.send('Swagger is working');
});

// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Application routes
app.use('/api', applicationRoutes);
app.use('/api', enquiryRoute)
app.use('/api', scheduleRoute)



// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api`));
