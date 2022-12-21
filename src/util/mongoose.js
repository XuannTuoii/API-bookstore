module.exports = {
  multipleMongooseToObject: function (arrays) {
    return arrays.map((item) => item.toObject());
  },
  mongodbToObject: function (item) {
    //trong TH chỉ có 1 đối tượng chứ k phải 1 list thì sẽ convert nó về object hoặc trả về chính nó
    return item ? item.toObject() : item;
  },
};
