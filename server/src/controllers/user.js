const { user } = require("../../models")
const bcrypt = require("bcrypt")

exports.getUsers = async (req, res) => {

  try {

    let users = await user.findAll({

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      }

    })

    users = JSON.parse(JSON.stringify(users))

    users = users.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        users
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

exports.getUser = async (req, res) => {

  try {

    const { id } = req.params

    let data = await user.findAll({
      where: {
        id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })

    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        user: data[0]
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

exports.addUsers = async (req, res) => {

  try {

    await user.create(req.body)

    res.status(201).send({
      status: "Success",
      message: "Successfully added a user",
    })

  } catch (error) {

    console.log(error)

    res.status(500).send({
      status: "Failed",
      message: "Server Error",
    })

  }

}

exports.updateUser = async (req, res) => {

  try {

    const { id } = req.params
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    await user.update({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      image: req.file.filename
    }, {
      where: {
        id
      }
    })

    let newData = await user.findAll({
      where: {
        id
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      }
    })

    newData = JSON.parse(JSON.stringify(newData))

    newData = newData.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        user: newData[0]
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        id
      }
    })

  } catch (error) {

    console.log(error)

    res.send({
      status: "Failed",
      message: "Server Error",
    })

  }
};

exports.countUsers = async (req, res) => {

  try {

    let users = await user.count({
      where: {
        role: "customer"
      }
    })

    res.status(200).send({
      status: "Success",
      users
    })

  } catch (error) {

    console.log(error)

    res.status(500).send({
      status: "Failed",
      message: "Server Error"
    })

  }

}
