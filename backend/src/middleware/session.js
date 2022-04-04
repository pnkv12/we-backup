const User = require('../app/models/User')

const requiredLogin = (req, res, next) => {
    try {
        const status = req.session.logged
        console.log(status)
        if (status) {
            return next();
          } else {
            return res.status(401).json('Required Login')
          }      
    } catch (error) {
        res.status(500).json(error)
    }
}

const managerRole = async(req, res, next) => {
  try {
    const access = ['62482a63ad01d9a46b24608b', '6248fd50b7d420daa06ee42b']
    const status = req.session.role 
    if(access.includes(status)) {
      next()
    } else {
      return res.status(403).json('Permission Denied')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const coordinatorRole = async(req, res, next) => {
  try {
    const access = ['62482516ad01d9a46b246089', '6248fd50b7d420daa06ee42b']
    const status = req.session.role 
    if(access.includes(status)) {
      next()
    } else {
      return res.status(403).json('Permission Denied')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}


module.exports = {requiredLogin, managerRole, coordinatorRole}