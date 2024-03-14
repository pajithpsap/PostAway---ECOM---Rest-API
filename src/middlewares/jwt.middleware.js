import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  // 1. Read the token.
  const {jwtToken}=req.cookies;

  
 
  if (!jwtToken) {
    return res.status(401).send('Unauthorized');
  }
  // 3. check if token is valid.
  try {
    const payload = jwt.verify(
      jwtToken,
      'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz'
    );
    req.userID = payload.userID;
  } catch (err) {
    // 4. return error.
    console.log(err);
    return res.status(401).send('Unauthorized');
  }
  // 5. call next middleware
  next();
};

export default jwtAuth;
