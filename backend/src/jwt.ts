import { User } from "./models";
import * as jwt from 'jsonwebtoken';

const secret_key = "CESTUNSECRET"

const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });
  console.log(secret_key);
  return token;
};

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization.replace('Bearer', '').trim();

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, no token' });
  }

  jwt.verify(token, secret_key, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized pas valide mon reuf' });
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next();
  });
};
  
export { generateToken, verifyToken };
  
