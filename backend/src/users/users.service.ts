import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import notificationQueue from 'src/notification/queue/notificationQueue';

const prisma = new PrismaClient()
@Injectable()
export class UsersService {
   async syncUser(clerkId:string,email:string,fullname?:string){
        const existingUser = await prisma.user.findUnique({
            where:{clerkId}
        })
        if(existingUser){
            return existingUser
        }
        const newUser = await prisma.user.create({
            data:{clerkId,email,fullname}
        })
        if(newUser){
            notificationQueue.add('sendWelcomeEmail',{
                email:newUser.email,
                username:newUser.fullname || "User"
            })
            
        }
        return newUser

    }
}
