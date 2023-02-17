import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('detail/:username')
  showDetail(@Param() param){
    console.log("param ",param.username);
    
    return this.usersService.getUserDetail(param.username)
  }

  @Post('insert')
  insertUsers(@Request() req){
    return this.usersService.insertUser(req.body)
  }
}
