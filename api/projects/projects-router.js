// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const dataModel = "projects";
const Projects = require("./projects-model");
const { validateId, validateProject } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id/actions", validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await Projects.getProjectActions(id);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", validateProject, async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/:id", validateProject, validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.update(id, req.body);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", validateId(dataModel), async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.remove(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
