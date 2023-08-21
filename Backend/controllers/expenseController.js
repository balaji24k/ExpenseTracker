const Expenses = require("../models/expense");

exports.postData = (req, res, next) => {
  // console.log(req.body, "post");
  Expenses.create(req.body)
		.then((result) => {
			res.json(result);
		}).catch((err) => {
			res.json(err);
		});
};

exports.getData = (req, res, next) => {
  Expenses.findAll()
    .then(result => {
      // console.log("ressult>>>>>>>>", result);
      res.json(result);
    }).catch((err) => {
			res.json(err);
		});
};

exports.deleteData = (req, res, next) => {
  // console.log("delete id",req.params.id)
  Expenses.findByPk(req.params.id)
    .then(result => {
      // console.log("ressult>>>>>>>>", result);
      result.destroy();
    }).catch((err) => {
			res.json(err);
		});
};

exports.updateData = (req, res, next) => {
  console.log("update id",req.params.id);
	console.log("update body",req.body);
  Expenses.findByPk(req.params.id)
    .then(result => {
			result.expense = req.body.expense;
      result.description = req.body.description;
      result.price = req.body.price;
      // console.log("ressult>>>>>>>>", result);
      return result.save();
    })
    .then(data => {
      res.json(data)
    })
    .catch((err) => {
			res.json(err);
		});
};
