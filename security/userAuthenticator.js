const jwt = require('./jwt');
const delay = require('delay');
const fetch = require("node-fetch");
const yargs = require('yargs');

class UserAuthenticator {

  verify(req, res) {
    delay(100).then(() => {
      res.status(201).json({
        msg: 'Verified',
        email: req.usuario
      });
    });
  }

  login(req, res) {
    let data = req.body;

    fetch(`http://localhost:${yargs.argv.port}/users?email=${data.email}`)
      .then(res => res.json())
      .then(list => {
        console.log(list);
        console.log(list.length);
        if (list.length == 1 && list[0].password === data.password) {
          console.log('Login Data Valid');
          const token = jwt.tokenGeneration(data);
          res.status(201).json(token);

        } else {
          console.log('Login attempt failed');
          res.status(401).send('login attempt failed');
        }
      })
      .catch(err => console.error(err));
  }

}

module.exports = UserAuthenticator;