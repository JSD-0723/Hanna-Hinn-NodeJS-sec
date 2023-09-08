// Imports
const path = require("path");

/**
 *  Helper Function for Navigation
 *  returns file path for where the application is running (root directory)
 *  its a better way than calling __dirname, ".."
 */

// exports
module.exports = path.dirname(require.main.filename);
