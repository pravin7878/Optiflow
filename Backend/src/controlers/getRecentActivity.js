const getRecentActivity = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("userId", "name email"); 

    res.status(200).json({ activities });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getRecentActivity