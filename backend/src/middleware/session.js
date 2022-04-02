const User = require('../app/models/User')

const requiredLogin = (req, res, next) => {
    try {
        const status = req.session.logged
        if (status === true) {
            next();
          } else {
            return res.status(401).json('Required Login')
          }      
    } catch (error) {
        res.status(500).json(error)
    }
}

const managerRole = async(req, res, next) => {
  try {
    const access = ['623ec78019af8a0d9cd33b7e', '623ec6b919af8a0d9cd33b74']
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
    const access = ['623ec78019af8a0d9cd33b7e', '623ec63819af8a0d9cd33b6e']
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