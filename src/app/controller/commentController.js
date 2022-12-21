const Comments = require("../model/Comments");
const { multipleMongooseToObject } = require("../../util/mongoose");

class commentController {
  //GET all comment of a book
  index(req, res, next) {
    Comments.find({ cmtForBook: req.params.slug }, (err, comment) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json(comment);
    });
  }

  //POST a comment
  addComment(req, res, next) {
    const { rating, belongTo, content, cmtForBook } = req.body;
    const comment = new Comments({
      rating,
      belongTo,
      content,
      cmtForBook,
    });
    comment.save((err, comment) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json(comment);
    });
  }
}

module.exports = new commentController();
