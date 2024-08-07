import { Controller, HttpCode, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import SigninDto from "./dto/signin.dto";
import SignupDto from "./dto/signup.dto";
import Resource from "src/common/resources/Resource.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // Define endpoints
  // @Get("users")
  // getAllUsers(): string {
  //   return "Getting all users...";
  // }

  // @Get("users/:id")
  // getUserById(@Param() params: any): string {
  //   return `Getting user with id: ${params.id}`;
  // }

  // Particular parameter token
  // @Get("users/:id")
  // getUserById(@Param("id") id: number): string {
  //   return `Getting user with id: ${id}`;
  // }

  @Post("signin")
  async signin(@Body() signinDto: SigninDto): Promise<Resource> {
    return this.authService.signin(signinDto.email, signinDto.password);
  }

  @Post("signup")
  @HttpCode(201)
  async signup(@Body() signupDto: SignupDto): Promise<Resource> {
    return this.authService.signup(signupDto);
  }
}
