const router = require("express").Router();
const HoldingsModel = require("../model/HoldingsModel");

router.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.json(holdings);
  } catch (err) {
    console.error("Holdings fetch error:", err);
    res.status(500).json({ message: "Server error while fetching holdings" });
  }
});

module.exports = router;
