const webapp = require('./server');

const port = process.env.PORT || 8080;
// start the web server
webapp.listen(port, () =>{
    console.log('Server running on port', port);
});