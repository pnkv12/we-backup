const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.json({
        message: 'Web Enterprise API'
    })
})

router.get('*', (req, res, next) => {
    res.json({
        message: 'Not found service (404)'
    })
})

module.exports = router