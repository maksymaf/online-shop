const express = require('express');
const {getAllUsers} = require('../controllers/user.controllers');
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
// userRouter.get('/:id', )
// userRouter.put('/:id', );
// userRouter.delete('/:id', );


module.exports = userRouter;
