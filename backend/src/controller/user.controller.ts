import { Controller, Post, Body } from '@midwayjs/core';
//import { Inject } from '@midwayjs/decorator';
//import { MysqlService } from '../service/mysql.service';

@Controller('/')
export class UserController {
  //@Inject()
  //mysqlService: MysqlService;

  @Post('/checkpoint')
  async login(@Body() body: any): Promise<boolean> {
    const username: string[] = ['lxy', 'dzy', 'ykf', 'zyf'];
    const password: number[] = [231250108, 231250033, 231250097, 231250116];
    let istrue = false;

    if (username.includes(body.username) && password.includes(body.password)) {
      istrue = true;
    }
    return istrue;
  }
}
//这里写校验逻辑
