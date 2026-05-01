const cron = require("node-cron");
const { subDays, set } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const startCleanupJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const sevenDays = subDays(new Date(), 7);
      const cuttOffDate = set(sevenDays, {
        hours: 12,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      const result = await ConnectionRequestModel.deleteMany({
        status: "interested",
        createdAt: { $lt: cuttOffDate },
      });
      console.log(
        `[Cron Job] Cleanup successful: ${result.deletedCount} old requests removed.`,
      );
    } catch (err) {
      console.log("Error: " + err);
    }
  });
};
module.exports = startCleanupJob;
