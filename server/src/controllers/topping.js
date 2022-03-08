const { topping } = require("../../models")

exports.getToppings = async (req, res) => {

  try {

    let products = await topping.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      }
    })

    products = JSON.parse(JSON.stringify(products))

    products = products.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        products
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

exports.getTopping = async (req, res) => {

  try {

    const { id } = req.params

    let product = await topping.findAll({
      where: {
        id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      }
    })

    product = JSON.parse(JSON.stringify(product))

    product = product.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.status(200).send({
      status: "success",
      data: {
        product: product[0]
      }
    })

  } catch (error) {

    console.log(error)

    res.send({
      status: "Failed",
      message: "Server Error",
    })

  }

}

exports.addToppings = async (req, res) => {

  try {

    const { name, price } = req.body

    let product = await topping.create({
      name,
      price,
      image: req.file.filename
    })

    product = JSON.parse(JSON.stringify(product))

    product = {
      ...product,
      image: process.env.PATH_FILE + product.image
    }

    res.status(201).send({
      status: "Success",
      data: {
        product
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }

}

exports.editTopping = async (req, res) => {

  try {

    const { id } = req.params

    await topping.update({
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename
    }, {
      where: {
        id
      }
    })

    let product = await topping.findAll({
      where: {
        id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      }
    })

    product = JSON.parse(JSON.stringify(product))

    product = product.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        product: product[0]
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).send({
      status: "Failed",
      message: "Server error"
    })

  }

}

exports.delTopping = async (req, res) => {

  try {

    const { id } = req.params

    await topping.destroy({
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
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }

}
