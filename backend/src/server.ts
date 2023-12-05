import express from 'express';
import cors from 'cors';
import AWS from 'aws-sdk';
import bodyParser from 'body-parser';

AWS.config.update({
  region: 'sa-east-1',
  accessKeyId: 'AKIAWEHDUIEUFQ2O7EYS',
  secretAccessKey: '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',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const app = express();
app.use(bodyParser.json({ limit: '35mb' }));
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  }),
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  })
);

app.put('/api/save-user', (req, res) => {
  console.log(req.body.user);
  const params = {
    TableName: 'usersInfo',
    Item: {
      userId: req.body.user.attributes.sub,
      email: req.body.user.email,
      likedProducts: [],
      purchased: [],
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      res.send(data);
      console.log('Item added:', data);
    }
  });
});

app.post('/api/products', (req, res) => {
  console.log(req.body);
  const params = {
    TableName: 'products',
    Item: req.body.newProduct,
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      res.send(data);
      console.log('Item added:', data);
    }
  });
});
app.put('/api/products', (req, res) => {
  console.log(req.body);
  const params = {
    TableName: 'products',
    Item: req.body.newProduct,
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      res.send(data);
      console.log('Item edited:', data);
    }
  });
});
app.get('/api/products', (req, res) => {
  const getAllParams = {
    TableName: 'products',
  };
  dynamodb.scan(getAllParams, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      res.send(data);
    }
  });
});
app.get('/api/products/:id', (req, res) => {
  req.params.id;
  res.send('helooooo');
});

const port = 500;
app.listen(port, () => {
  console.log(`Website Hogart serve on port http://localhost:${port}`);
});
