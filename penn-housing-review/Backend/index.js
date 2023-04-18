/**
 * This module will start the expres server
 */

// import the express webapp
const webapp = require('./server');
const port = 8080;
webapp.listen(port, () => {
    console.log(`Server started on port ${port}`);
});