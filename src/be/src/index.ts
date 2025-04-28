import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {expressjwt} from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const app = express();
app.use(express.json());

app.use(expressjwt({
    algorithms: ["RS256"],
    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://alinflorin.eu.auth0.com/.well-known/jwks.json`
    })
}));


app.get('/api/hello', async (req, res) => {
    res.send("HI!");
});


app.listen(3000, () => {
    console.log("Backend started");
});