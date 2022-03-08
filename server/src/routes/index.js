const express = require('express')

const router = express.Router()

const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  countUsers
} = require('../controllers/user')
const {
  addBeverages,
  getBeverages,
  editBeverage,
  delBeverage,
  getBeverage
} = require('../controllers/beverage')
const {
  addToppings,
  getToppings,
  getTopping,
  editTopping,
  delTopping
} = require('../controllers/topping')
const {
  getTransactions,
  getTransaction,
  getTransactionn,
  addTransaction,
  editTransaction,
  delTransaction,
  getTransactionx,
  countTransactions,
  sumTransactions
} = require('../controllers/transaction')
const { register, login, checkAuth } = require('../controllers/auth')

const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

router.get('/users', getUsers)
router.get('/profile/:id', getUser)
router.get('/beverages', getBeverages)
router.get('/beverage/:id', auth, getBeverage)
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.get('/transactions', getTransactions)
router.get('/transactionx', getTransactionx)
router.get('/transactionn/:id', getTransactionn)
router.get('/transaction/:id', getTransaction)
router.get('/check-auth', auth, checkAuth)

router.get('/count-users', countUsers)
router.get('/count-trxs', countTransactions)

router.get('/sum-trxs', sumTransactions)

router.post('/user', addUsers)
router.post('/register', register)
router.post('/login', login)
router.post('/beverage', auth, uploadFile("image"), addBeverages)
router.post('/topping', auth, uploadFile("image"), addToppings)
router.post('/transaction', auth, addTransaction)

router.patch('/user/:id', auth, uploadFile("image"), updateUser)
router.patch('/beverage/:id', auth, uploadFile("image"), editBeverage)
router.patch('/topping/:id', auth, uploadFile("image"), editTopping)
router.patch('/transaction/:id', auth, editTransaction)

router.delete('/user/:id', auth, deleteUser)
router.delete('/beverage/:id', auth, delBeverage)
router.delete('/topping/:id', auth, delTopping)
router.delete('/transaction/:id', auth, delTransaction)

module.exports = router