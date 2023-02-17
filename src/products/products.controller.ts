import { Controller, Get, Post, Param, Request } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  create(@Request() req) {
    return this.productsService.create(req.body);
  }

  @Get('all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post('edit')
  update(@Request() req) {
    return this.productsService.update(req.body);
  }

  @Post('delete')
  remove(@Request() req) {
    return this.productsService.remove(req.body);
  }
}
