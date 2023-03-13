const { check, body } = require("express-validator");

const ResponseData = require("./ResponseData");

const emailValidator = [
  check("email", "Email is required.").isLength({ min: 5 }),
  check("email", "Please enter valid email.").isEmail(),
];
const mobileValidator = [
  check("mobile", "Mobile is required.").isLength({ min: 8 }),
];

const reqStringValidator = (key, minLength = 1, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isLength({ min: minLength }),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isLength({ min: minLength })
        .withMessage(key + " minimum length should be " + minLength + "."),
    ];
  }
};

const reqDate = (key, minLength = 1, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isDate(),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isDate()
        .withMessage(key + " should be a valid date."),
    ];
  }
};

const reqBoolean = (key, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isBoolean(),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isBoolean()
        .withMessage(key + " should be boolean (true or false)."),
    ];
  }
};

const reqPassword = (key, minLength = 8, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isStrongPassword(),
      check(key, msg).isLength({ min: minLength }),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isLength({ min: minLength })
        .withMessage(
          key + " minimum length should be " + minLength + " charachter long."
        ),
      check(key)
        .isStrongPassword({ minNumbers: 1, minUppercase: 0, minSymbols: 0 })
        .withMessage(
          "To protect your account, your password needs to be between 8 and 30 characters long and contain at least one letter and one number."
        ),
    ];
  }
};

const reqNumberValidator = (key, minLength = 1, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isLength({ min: minLength }),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isNumeric()
        .withMessage(key + " should be in numeric format."),
      check(key)
        .isLength({ min: minLength })
        .withMessage(key + " minimum length should be " + minLength + "."),
    ];
  }
};

const checkIsExists = (req, res, next, field) => {
  if (!req.body[field] || req.body[field] === "") {
    return ResponseData.error(res, field + " is required", null);
  }
  if (req.body[field] && req.body[field].length < 3) {
    return ResponseData.error(
      res,
      field + " minimum length shuold be 3 character long.",
      null
    );
  }
};

module.exports = {
  emailValidator,
  mobileValidator,
  reqStringValidator,
  reqNumberValidator,
  reqBoolean,
  reqPassword,
  checkIsExists,
  reqDate,
};
