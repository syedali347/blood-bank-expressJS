// headerMiddleware.js

const headerMiddleware = (req, res, next) => {
    // Set common headers for all API requests
    // res.header('Content-Type', 'application/json');
    // res.header('X-API-Version', '1.0');
    
    // Continue to the next middleware or route handler
    next();
  };
  
  module.exports = headerMiddleware;
  