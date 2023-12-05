const { Router } = require('express');

const {registerUser, getAll} = require('../controllers/user.controller');

const router = Router();

router.get('/', getAll);

module.exports = router;
