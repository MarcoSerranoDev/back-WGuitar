const { Router } = require("express");
const router = Router();

const UserCtr = require("../controllers/user.controller");

router.post("/signup", UserCtr.singUp);
router.get("/confirm/:token", UserCtr.confirm);

module.exports = router;
