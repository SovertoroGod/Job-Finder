const cron = require('node-cron');
const Job = require('./../model/jobModel');

exports.initCronJobs = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = new Date();
            const result = await Job.updateMany(
                {
                    deadline: { $lt: today },
                    status: "active",
                    isDeleted: false
                },
                { $set: { status: "closed" } }
            );
            console.log(`[Cron Job]: Checked deadlines. ${result.modifiedCount} jobs closed`);
        } catch (error) {
            console.error(`[Cron Error] : `, error.message);
        }
    })
};

