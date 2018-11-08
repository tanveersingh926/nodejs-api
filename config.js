/*
 * Create and export configuration variables
 *
 */

 
// Container for all the environments
let environments = {}

// Staging (default) environment
environments.staging = {
    'port' : 3003,
    'envName' : 'staging' 
}

// Production environment
environments.production = {
    'port' : 5003,
    'envName' : 'production' 
}

// Determine which environment was passed as a command-line arguement
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the modules
module.exports = environmentToExport;