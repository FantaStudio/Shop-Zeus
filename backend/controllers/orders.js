class orders {
  async createOrder(req, res) {
    try {
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Создание заказа не удалось", description: "" });
    }
  }

  async fetchOrders(req, res) {
    try {
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Создание заказа не удалось", description: "" });
    }
  }
}

module.exports = new orders();
