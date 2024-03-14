const express = require('express')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path');


const app = express()

// Serve static files from the React app

const registration_flow = require('./routes/Registrationroutes');
const UserPage = require('./routes/UserPageRoutes')
const MainPage = require('./routes/MainPageRoutes')
const CheckOutPage = require('./routes/CheckOutRoutes')

app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions));

// Define the 'public' folder as a static folder
app.use(express.static('public'));

app.use(express.json());

//Initiate a session with a secret key
app.use(session({
  secret: 'comp5347',
  resave: false,
  saveUninitialized: true
}))

//Registration flow
app.use('/', registration_flow);

//UserPage
app.use('/UserPage',UserPage)

app.use('/MainPage',MainPage)

app.use('/CheckOut',CheckOutPage)

// Start the server listening on port 3000
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
