const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const { appendFile } = require('fs');
require('dotenv').config();

const app = express();

// api
const AuthAPI = require('./api/AuthRouter');
const ConstAPI = require('./api/ConstantsRouter');

// install middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.raw());

// install passport
app.use(passport.initialize());
require('./config/passport.config')(passport);

// install routers
app.use('/api/auth/', AuthAPI);
app.use('/api/constants/', ConstAPI);

// static folders
const assetFolder = path.resolve(__dirname, './build/');
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('uploads/images'));

app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder));

// database
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("MYSQL Database synchronized");
    const port = process.env.PORT || 5700;
    const server = app.listen(port, () => {
        console.log(`Server up and running on port ${port} !`)

    });
});
// run server
