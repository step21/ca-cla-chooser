const express = require('express');
const app = express();
const port = 4000;

//app.get('/', function(req, res){
//res.sendFile(__dirname + '/privacy.html');
//});

app.use(express.static('./'));

app.listen(port, () => {
    console.log(`Contributoragreements Chooser listening at http://localhost:${port}`);
});

