const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
				 name:req.body.name});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','name','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.get('/api/users/:id/entries', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('entries','users.id','entries.user_id')
    .where('users.id',id)
    .orderBy('created','desc')
    .select('entry','username','name','created').then(entries => {
      res.status(200).json({entries:entries});
    }).catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/users/:id/entries', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('entries').insert({user_id: id, entry:req.body.entry, created: new Date()});
  }).then(ids => {
    return knex('entries').where('id',ids[0]).first();    
  }).then(entry => {
    res.status(200).json({entry:entry});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});
/*
app.delete('/api/users/:userId/entries/:entryId', (req,res) => {
  let userId = parseInt(req.params.userId);
  let entryId = parseInt(req.params.entryId); 
  knex('users')
  	.where('id', userId).first().then(user => {
  		return knex('entries').where({'user_id':userId, 'id': entryId}).first().del();
  	}).then(entries => {
  		res.sendStatus(200);
  	}).catch(error => {
  		console.log(error);
  		res.status(500).send({error});
  	});
});  
*/ 
app.listen(3000, () => console.log('Server listening on port 3000!'));
