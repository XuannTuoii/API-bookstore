const Orders = require("../model/Order");
const { multipleMongooseToObject } = require("../../util/mongoose");

class OerderController {
  //Get all order of user A
  index(req, res, next) {
    const { slug } = req.params;
    console.log("userName:::::::", slug);
    Orders.find({ userId: slug }, (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json(order);
    });
  }

  //POST an order
  addOrder(req, res, next) {
    const {
      userId,
      bookId,
      number,
      author,
      bookSlug,
      userName,
      email,
      bookName,
      bookImg,
      dateCreateOrder,
    } = req.body;
    const order = new Orders({
      userId,
      bookId,
      number,
      userName,
      author,
      bookSlug,
      email,
      bookName,
      bookImg,
      dateCreateOrder,
    });
    order.save((err, order) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json("Mua thanh cong");
    });
  }
  //DELETE an order
  deleteOrder(req, res, next) {
    const { listOrderId } = req.body;
    console.log("listOrderId", listOrderId);
    Orders.deleteMany({ _id: { $in: listOrderId } }, (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json("Delete Success");
    });
    // Orders.findByIdAndDelete(id, (err, order) => {
    //   if (err) {
    //     return res.status(500).json({ message: "Internal Server Error" });
    //   }
    //   return res.status(200).json("Delete Success");
    // });
  }
}
module.exports = new OerderController();
