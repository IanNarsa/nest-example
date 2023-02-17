import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUserDetail(req){
    const entityManager = getManager()
    var result = await entityManager.query(`select * from w_user where username = '`+req+`'`)
    
    return {status:"00", data:result}
  }

  async insertUser(req){
    console.log("req ",req);

    try {
      if (req.userType !== 'staff' && req.userType !== 'customer') {
        return {status:"02", message:"please input user type as a customer or staff"}
      } else {
        const entityManager = getManager()
        await entityManager.query(`INSERT INTO w_user
                                    ( username, full_name, user_type, created_at )
                                    VALUES('`+req.username+`', '`+req.fullName+`', '`+req.userType+`','`+new Date().toISOString()+`');`)

        return {status:"00", message:"success insert data"}  
      }
      
    } catch (error) {
      console.log("error", error);
      return {status:"05", message:"failed insert data"}
    }
  }
}
