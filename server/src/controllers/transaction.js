const { transaction, user, beverage, topping } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    let transactions = await transaction.findAll({
      include: [
        {
          model: user,
          as: "userOrder",
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'image']
          }
        },
        {
          model: beverage,
          as: "beverages",
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: topping,
          as: "toppings",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'image']
          }
        }
      ],
      attributes: {
        exclude: ['userId', 'orderId', 'updatedAt'],
      },
    })

    res.status(200).send({
      status: "Success",
      transactions
    })

  } catch (error) {

    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }
}

// get a transaction where the id is user id
exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params

    let transactions = await transaction.findAll({
      where: {
        userId: id
      },
      include: [
        {
          model: user,
          as: "userOrder",
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'image']
          }
        },
        {
          model: beverage,
          as: "beverages",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'price']
          }
        },
        {
          model: topping,
          as: "toppings",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'image', 'price']
          }
        },
      ],
      attributes: {
        exclude: ['updatedAt'],
      },
    })

    transactions = JSON.parse(JSON.stringify(transactions))

    transactions = transactions.map((item) => {
      return {
        ...item,
        beverages: {
          name: item.beverages.name,
          image: process.env.PATH_FILE + item.beverages.image
        },
        toppings: {
          name: item.toppings.name
        }
      }
    })

    res.status(200).send({
      status: "Success",
      transactions
    })

  } catch (error) {

    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }
}

// get a transaction where the id is transaction id
exports.getTransactionn = async (req, res) => {
  try {
    const { id } = req.params

    let transactions = await transaction.findAll({
      where: {
        id
      },
      include: [
        {
          model: user,
          as: "userOrder",
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'image']
          }
        },
        {
          model: beverage,
          as: "beverages",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'price']
          }
        },
        {
          model: topping,
          as: "toppings",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'image', 'price']
          }
        },
      ],
      attributes: {
        exclude: ['userId', 'orderId', 'beverageId', 'toppingId', 'updatedAt'],
      },
    })

    transactions = JSON.parse(JSON.stringify(transactions))

    transactions = transactions.map((item) => {
      return {
        ...item,
        beverages: {
          name: item.beverages.name,
          image: process.env.PATH_FILE + item.beverages.image
        },
        toppings: {
          name: item.toppings.name
        }
      }
    })

    res.status(200).send({
      status: "Success",
      transactions
    })

  } catch (error) {

    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }
}

// get all transactions where status is incomplete
exports.getTransactionx = async (req, res) => {
  try {

    let transactions = await transaction.findAll({
      where: {
        status: "Incomplete"
      },
      include: [
        {
          model: user,
          as: "userOrder",
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'image']
          }
        },
        {
          model: beverage,
          as: "beverages",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'price']
          }
        },
        {
          model: topping,
          as: "toppings",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'image', 'price']
          }
        },
      ],
      attributes: {
        exclude: ['updatedAt'],
      },
    })

    transactions = JSON.parse(JSON.stringify(transactions))

    transactions = transactions.map((item) => {
      return {
        ...item,
        beverages: {
          name: item.beverages.name,
          image: process.env.PATH_FILE + item.beverages.image
        },
        toppings: {
          name: item.toppings.name
        }
      }
    })

    res.status(200).send({
      status: "Success",
      transactions
    })

  } catch (error) {

    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }
}

exports.addTransaction = async (req, res) => {
  try {
    const { userId, address, postal, beverageId, qty, toppingId, price } = req.body

    let transactions = await transaction.create({
      userId,
      address,
      postal,
      beverageId,
      qty,
      toppingId,
      price
    })

    transactions = await transaction.findOne({
      where: {
        id: transactions.id
      },
      include: [
        {
          model: user,
          as: "userOrder",
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'image']
          }
        },
        {
          model: beverage,
          as: "beverages",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'price']
          }
        },
        {
          model: topping,
          as: "toppings",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'image', 'price']
          }
        }
      ],
      attributes: {
        exclude: ['userId', 'beverageId', 'toppingId', 'updatedAt'],
      },
    })

    res.send({
      status: 'Success',
      data: {
        transactions
      }
    })

  } catch (error) {
    console.log(error)
    res.send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
}

exports.editTransaction = async (req, res) => {

  try {

    const { id } = req.params

    await transaction.update(req.body, {
      where: {
        id
      }
    })

    let newData = await transaction.findOne({
      where: {
        id
      },
      include: [
        {
          model: user,
          as: "userOrder",
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'image']
          }
        },
        {
          model: beverage,
          as: "beverages",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'price']
          }
        },
        {
          model: topping,
          as: "toppings",
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'image', 'price']
          }
        }
      ],
      attributes: {
        exclude: ["userId", "beverageId", "toppingId", "updatedAt"],
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        transaction: newData
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

exports.delTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
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
}

exports.countTransactions = async (req, res) => {
  try {
    let transactions = await transaction.count()

    res.status(200).send({
      status: "Success",
      transactions
    })

  } catch (error) {

    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }
}

exports.sumTransactions = async (req, res) => {
  try {
    let transactions = await transaction.sum('price', {
      where: {
        status: "Completed"
      }
    })

    res.status(200).send({
      status: "Success",
      transactions
    })

  } catch (error) {

    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })

  }
}