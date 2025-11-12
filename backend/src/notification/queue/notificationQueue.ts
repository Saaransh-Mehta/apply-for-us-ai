import { Queue } from "bullmq";
import 'dotenv/config'
const connection = {
    host:process.env.REDIS_HOST,
    port:parseInt(process.env.REDIS_PORT || "6379"),
}

const notificationQueue = new Queue('notificationQueue',{connection})
export default notificationQueue;