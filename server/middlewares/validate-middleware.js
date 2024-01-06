const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // res.status(400).json({ msg: err.issues[0].message });
    next(err.issues[0]);
  }
};

module.exports = validate;
