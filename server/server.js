const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const apiRoutes = require('./routes/api');
const morgan = require('morgan');

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/network', apiRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log('waiting for ip address')
})
















/*

const {exec} = require('child_process');

exec('ping 192.168.5.1', (error, stdout, stderr) => {
    if(error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if(stderr) {
        console.log(`stderr: ${stderr.message}`);
        return;
    }
    if(stdout == "request timed out") {
        console.log('working on it')
    }
    console.log('nothing happen')
});
*/
