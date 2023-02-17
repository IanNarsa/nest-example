import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

@Injectable()
export class ProductsService {
  
  async create(req) {
    try {
      const entityManager = getManager()

      var cekUser = await entityManager.query(`select user_type from w_user where username = '`+req.usernameStaff+`';`)

      console.log(" cek User", cekUser);
      if (cekUser[0].user_type === 'staff') {
        await entityManager.query(`INSERT INTO w_products
        (product_name, product_category)
        VALUES('`+req.producName+`', '`+req.productCategory+`');`)
        return {status:"00", message:"success insert data"}
      } else {
        return {status:"01", message:"you can't insert data"}
      }
      
    } catch (error) {
      return {status:"05", message:"Internal server error"}
    }
    
  }

  async findAll() {
    try {
      const entityManager = getManager()
      var products = await entityManager.query(`select * from w_products`)
      return {status:"00", data: products}
      
    } catch (error) {
      return {status:"05", message:"Internal server error"}
    }
  }

  async findOne(id: number) {
    try {
      const entityManager = getManager()
      var products = await entityManager.query(`select * from w_products where id = `+id+`;`)
      return {status:"00", data: products}
      
    } catch (error) {
      return {status:"05", message:"Internal server error"}
    }
  }

  async update(req) {
    try {

      if (!req.productName || !req.productCategory || !req.idProduct) {
        return {status:"01", data: products, message:"pelase complate your payload"}
      }
      const entityManager = getManager()
      await entityManager.query(`UPDATE public.w_products
                                                SET product_name='`+req.productName+`', product_category='`+req.productCategory+`' 
                                                where id=`+req.idProduct+`;`)
      var products = await entityManager.query(`select * from w_products where id = `+req.idProduct+`;`)
      return {status:"00", data: products, message:"success edit data"}
      
    } catch (error) {
      return {status:"05", message:"Internal server error"}
    }

  }

  async remove(req) {
    try {
      
      if (!req.idProduct) {
        return {status:"01", data: products, message:"pelase complate your payload"}
      }
      const entityManager = getManager()
      var products = await entityManager.query(`select * from w_products where id = `+req.idProduct+`;`)
      await entityManager.query(`DELETE from w_products where id=`+req.idProduct+`;`)

      return {status:"00", data: products, message:"success delete data"}
      
    } catch (error) {
      console.log("error delete product ",error);
      
      return {status:"05", message:"Internal server error"}
    }
  }
}
