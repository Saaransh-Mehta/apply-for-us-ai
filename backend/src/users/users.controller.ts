import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Post('sync')
    syncUser(@Body() body:any,@Res() res:Response){
        const {clerkId,email,fullname} = body
        const newUser = this.userService.syncUser(clerkId,email,fullname)
        res.status(200).json(newUser)

    }
}
