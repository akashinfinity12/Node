const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

// defining the schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  isGold: { type: Boolean, required: true },
});

// creating a collection
const Customer = mongoose.model("Customer", customerSchema);

// Joi Validation
function schemaValidation(object) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required().min(10).max(10),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(object);
}

function putSchemaValidation(object) {
  const schema = Joi.object({
    name: Joi.string(),
    phone: Joi.string().min(10).max(10),
    isGold: Joi.boolean(),
  });
  return schema.validate(object);
}

// Routes
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const isValid = schemaValidation(req.body);
  if (isValid.error) return res.status(400).send(isValid.error.message);

  const customer = new Customer(req.body);
  const result = await customer.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");

  const isValid = putSchemaValidation(req.body);
  if (isValid.error) return res.status(400).send(isValid.error.message);

  const result = await Customer.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");

  const result = await Customer.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
