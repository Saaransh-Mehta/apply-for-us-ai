import { Worker } from "bullmq";
import { log } from "console";
import 'dotenv/config'
import nodemailer from 'nodemailer';


console.log("Setting up notification worker...");
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }


})


const notificationWorker = new Worker('notificationQueue', async job => {
    console.log("Notification Worker processing job:", job.name);
    if (job.name === 'sendWelcomeEmail') {
        const { email, username } = job.data;
        const WELCOME_EMAIL_FORMAT=`Hello ${username} , Welcome to ApplyForMe! We're excited to have you on board. Start exploring personalized job recommendations, AI-powered resume optimization, and interview prep tools to kickstart your job search journey with us. Best of luck! - The ApplyForMe Team`;       
        console.log(`Sending welcome email to ${username} at ${email}`);
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to ApplyForMe!',
            text: WELCOME_EMAIL_FORMAT
        })



    }
},{
    connection:{
        host:process.env.REDIS_HOST,
        port:parseInt(process.env.REDIS_PORT || "6379"),
    }
})

notificationWorker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
});

notificationWorker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} has failed with error ${err.message}`);
});
export default notificationWorker;