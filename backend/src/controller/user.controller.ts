import { Controller, Post, Body } from '@midwayjs/core';

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
