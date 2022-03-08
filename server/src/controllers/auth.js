const { user } = require("../../models")
const joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().min(6).required(),
    password: joi.string().min(6).required(),
  })

  const { error } = schema.validate(req.body)

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    })

  try {

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)

    res.status(200).send({
      status: "Success",
      data: {
        name: newUser.name,
        token
      }
    })

  } catch (error) {

    console.log(error)
    res.status(500).send({
      status: "Failed",
      message: "Server Error"
    })

  }

}

exports.login = async (req, res) => {

  const schema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(6).required(),
  })

  const { error } = schema.validate(req.body)

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message
      }
    })

  try {

    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })

    const isValid = await bcrypt.compare(req.body.password, userExist.password)

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY)

    res.status(200).send({
      status: "Success",
      data: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
        token
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).send({
      status: "Failed",
      message: "Server Error",
    })

  }

}

exports.checkAuth = async (req, res) => {

  try {

    const id = req.user.id

    const dataUser = await user.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"]
      }
    })

    if (!dataUser) {
      return res.status(404).send({
        status: "failed"
      })
    }

    res.send({
      status: "Success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          role: dataUser.role
        }
      }
    })

  } catch (error) {

    console.log(error)

    res.status({
      status: "Failed",
      message: "Server Error"
    })

  }

}