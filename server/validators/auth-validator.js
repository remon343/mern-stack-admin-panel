const { z } = require("zod");

//Creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, {
      message: "Username must be at least 3 chars",
    })
    .max(255, { message: "Username must not be more than 255 chars long" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {
      message: "Email must be at least 3 chars",
    })
    .max(255, { message: "Email must not be more than 255 chars long" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(3, {
      message: "Phone number must be at least 10 chars",
    })
    .max(255, { message: "Phone number must not be more than 20 chars long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, {
      message: "Password must be at least 6 chars",
    })
    .max(255, { message: "Password must not be more than 1024 chars long" }),
});

module.exports = signupSchema;