let feedbackData;
router.post("/feedback", async (req, res) => {
  const { ID, Category, Feedback } = req.body;
  try {
    if (!ID || !Category || !Feedback) {
      console.log("Missing Feedback Data");
      res.status(400).json({ error: "Please fill the fields properly" });
    } else {
     

      // Send data to the AI server
      const aiServerURL = 'http://localhost:5000/feedback'; // Replace with your AI server URL
      const response = await axios.post(aiServerURL, {
        feedback: Feedback,
      });

      if (response.status === 200) {
        const Review = response.data;
        console.log(Review);
        console.log(Review);
        feedbackData = new FeedbackData({ ID, Category, Feedback, Review });
        feedbackData.save();
        res.status(201).json({ message: "Your Feedback Successfully Posted" });
      } else {
        console.log("Error communicating with the AI server");
        res.status(500).json({ error: "Error communicating with the AI server" });
      }
    }
  } catch (err) {
    console.log("err");
    res.status(500).json({ error: "Internal server error" });
  }
});