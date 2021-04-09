const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

const validateId = (dataModel) => {
  return async (req, res, next) => {
    const { id } = req.params;
    let data = null;
    switch (dataModel) {
      default:
        res.json({ message: "No data model provided" });
        break;
      case "actions":
        data = await Actions.get(id);
        break;
      case "projects":
        data = await Projects.get(id);
        break;
    }
    if (!data || !id) {
      res.status(404).json({
        message: `${dataModel} requested with id ${id} doesn't exist`,
      });
    } else {
      next();
    }
  };
};

const validateProject = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Project id, description, and notes are required" });
  } else {
    next();
  }
};

const validateAction = (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({ message: "Project id, description, and notes are required" });
  } else {
    next();
  }
};

module.exports = {
  validateId,
  validateProject,
  validateAction,
};
