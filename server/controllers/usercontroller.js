const User = require('../models/user')
const {verifyPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
  static register(req,res,next){
    const {email, password} = req.body
    const input = {email, password}
    User.create(input)
      .then(newUser => {
        res.status(200).json(newUser)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static login(req,res) {
    User.findOne({
      username: req.body.username
    })
      .then(user => {
        if(user) {
          if(verifyPassword(req.body.password, user.password)) {
            const payload = {
              username : user.username,
              id: user.id
            }
            const token = generateToken(payload)
            res.json({token:token})
          }
          else{
            res.json('wrong username/password')
          }
        }
        else{
          res.json('wrong username/password')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = UserController