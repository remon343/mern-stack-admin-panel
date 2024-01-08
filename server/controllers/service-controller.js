const Service = require("../models/services-model");

const services = async (req, res,next) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No Services found" });
      return;
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = services;
