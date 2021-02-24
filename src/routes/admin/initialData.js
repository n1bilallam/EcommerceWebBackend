const express = require("express");
const { initialData } = require("../../controller/admin/initialData");
const { requireSignin, adminMiddelware } = require("../../c_middelware");
const router = express.Router();

router.post("/initialdata", requireSignin, adminMiddelware, initialData);

module.exports = router;
