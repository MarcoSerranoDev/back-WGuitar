const { Router } = require("express");
const router = Router();
const stateCtr = require("../controllers/states.controller");

router.get("/getStates", stateCtr.getStates);

module.exports = router;
