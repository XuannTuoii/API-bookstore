const Books = require("../model/Books");
const { cloudinary } = require("../../util/cloudinary");
const upload = require("../../util/multer");
const { multipleMongooseToObject } = require("../../util/mongoose");

class bookController {
  //[GET] /get all book in DB
  index(req, res, next) {
    Books.find({}, (err, book) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.json(book);
    });
  }

  addBook(req, res, next) {
    const {
      name,
      author,
      type,
      pageCount,
      publishedDate,
      description,
      imgSrc,
    } = req.body;
    // save to cloudinary
    try {
      Books.find({}, async (err, books) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        for (let i = 0; i < books.length; i++) {
          if (books[i].name === name) {
            return res.status(400).json({ message: "Book already exists" });
          }
        }
        const uploadResponse = await cloudinary.v2.uploader.upload(imgSrc, {
          folder: "book",
        });
        const book = new Books({
          name: name,
          author: author,
          type: type,
          pageCount: pageCount,
          publishedDate: publishedDate,
          description: description,
          img_url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
        });
        book.save((err, book) => {
          if (err) {
            console.log("err", err);
            return res.status(500).json({ message: "Internal Server Error" });
          }
          return res.status(200).json(book);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  }
  getABook(req, res, next) {
    const { slug } = req.params;
    Books.findOne({ slug: slug }, (err, book) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json(book);
    });
  }
  updateBook(req, res, next) {
    const { slug } = req.params;
    const {
      name,
      author,
      type,
      pageCount,
      publishedDate,
      description,
      imgSrc,
    } = req.body;
    Books.find({}, async (err, books) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      for (let i = 0; i < books.length; i++) {
        if (books[i].name === name) {
          return res
            .status(400)
            .json({ message: "Tile has been already exist" });
        }
      }

      Books.findOneAndUpdate(
        { slug: slug },
        {
          name: name,
          author: author,
          type: type,
          pageCount: pageCount,
          publishedDate: publishedDate,
          description: description,
          img_url: imgSrc,
        },
        {
          new: true,
        },
        (err, book) => {
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }

          return res.status(200).json(book);
        }
      );
    });
  }
  deleteBook(req, res, next) {
    const { slug } = req.params;
    const { public_id } = req.body;
    console.log("public_id", public_id);
    if (!public_id)
      return res.status(400).json({ message: "Khong co file nao duoc chon!" });

    cloudinary.v2.uploader.destroy(public_id, function (error, result) {
      console.log("result", result, error);
    });

    Books.findOneAndDelete({ slug: slug }, (err, book) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json("Da xoa thanh cong");
    });
  }

  buyBook(req, res, next) {
    const { username, slug, number } = req.body;
  }
}

module.exports = new bookController();
