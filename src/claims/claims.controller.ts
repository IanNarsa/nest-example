import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsService: ClaimsService) {}

  @Post('create')
  create(@Request() req) {
    return this.claimsService.create(req.body);
  }

  @Get('all/:username')
  findAll(@Param('username') username: string ) {
    return this.claimsService.findAll(username);
  }


  @Post('update')
  update(@Request() req) {
    return this.claimsService.update(req.body);
  }

}
