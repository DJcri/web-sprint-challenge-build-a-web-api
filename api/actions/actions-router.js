// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const dataModel = "actions";
const Actions = require("./actions-model");
const { validateId, validateAction } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", validateAction, async (req, res) => {
  try {
    const action = await Actions.insert(req.body);
    res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/:id", validateAction, validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.update(id, req.body);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.remove(id);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
