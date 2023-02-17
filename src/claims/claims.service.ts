import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Injectable()
export class ClaimsService {

  async create(req) {
    try {
      const entityManager = getManager()
      var user = await entityManager.query(`SELECT id_user, user_type from w_user where username = '`+req.username+`'`)
      var checkProduct = await entityManager.query(`SELECT id from w_products where id = `+req.productId+`;`)

      if (checkProduct.length >0) {
        if (user[0].user_type === 'staff') {
          return {status:"01", message:"you can't insert data"}
        }
        await entityManager.query(`INSERT INTO public.w_warranty_claim
                                                (product_id, user_id, status, created_at)
                                                VALUES(`+req.productId+`, `+user[0].id_user+`, 'PENDING', '`+new Date().toISOString()+`'); `)
  
       return {status:"00", message:"Success create warranty claim"};
      }else{
        return {status:"03", message:"Data not found"};
      }
      
    } catch (error) {
      console.log("error create claim ",error);
      return {status:"05", message:"Internal server error"};
    }
    
  }

  async findAll(username: string) {
    try {
      const entityManager = getManager()
      var user = await entityManager.query(`SELECT user_type from w_user where username = '`+username+`'`)
      if (user.length === 0) {
        return {status:"03", message:"Data not found"};
      }

      if (user[0].user_type === 'staff') {
        var result = await entityManager.query(`select wwc.id as claim_id, wu.username , wp.product_name , wp.product_category , wwc.status , wwc.created_at, wwc.updated_at  from w_warranty_claim wwc 
                inner join w_products wp 
                on wp.id = wwc.product_id 
                inner join w_user wu 
                on wu.id_user = wwc.user_id `)
        return {status:"00", data:result};
      } else {
        return {status:"04", message:"Can't view data, staff only"};
      }

    
    } catch (error) {
      console.log("error get warranty claim", error);
      return {status:"05", message:"Internal server error"};
    }
    
  }


  async update(req) {
    try {
      const entityManager = getManager()
      var user = await entityManager.query(`SELECT user_type from w_user where username = '`+req.usernameStaff+`'`)
      if (user.length === 0) {
        return {status:"03", message:"Data not found"};
      }

      if (req.status !== "APPROVE" && req.status !== "REJECT") {
        return {status:"02", message:"please input status APPROVE or REJECT"}
      }

      if (user[0].user_type === 'staff') {
        await entityManager.query(`UPDATE public.w_warranty_claim
                                  SET status='`+req.status+`', updated_at='`+new Date().toISOString()+`' 
                                  where id = `+req.id+`;`)

        var result = await entityManager.query(`select wwc.id , wu.username , wp.product_name , wp.product_category , wwc.status , wwc.created_at, wwc.updated_at  from w_warranty_claim wwc 
        inner join w_products wp 
        on wp.id = wwc.product_id 
        inner join w_user wu 
        on wu.id_user = wwc.user_id 
        where wwc.id = `+req.id+`;`)

        return {status:"00", data:result, message:"success update status"};
      } else {
        return {status:"04", message:"Can't view data, staff only"};
      }
      
      
    } catch (error) {
      console.log("error ",error);
      
      return {status:"05", message:"Internal server error"};
    }
  }

}
