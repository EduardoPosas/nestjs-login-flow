import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entity/user.entity";
import CreateUserDto from "./dto/CreateUser.dto";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":email")
  async getUserByEmail(@Param("email") email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
