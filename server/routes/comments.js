const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"comments work 15:11"});
})

module.exports = router;