import { Controller, HttpCode, Post, Body } from "@nestjs/common";
import SigninDto from "./dto/signin.dto";
import SignupDto from "./dto/signup.dto";
import { UsersService } from "src/users/users.service";
import Resource from "src/common/resources/Resource.dto";
import { UtilsService } from "src/common/utils/utils.service";

@Controller("auth")
export class AuthController {
  constructor(
    private usersService: UsersService,
    private utilsService: UtilsService,
  ) {}

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
  async signin(@Body() body: SigninDto): Promise<Resource> {
    const { email, password } = body;
    // check if user exist
    const user = await this.usersService.findOne(email);
    // if not exist
    if (!user) {
      return { error: true, message: "Usuario no existe" };
    }
    // if exist
    // check password
    const passwordMatch = await this.utilsService.passwordMatch(
      password,
      user.password,
    );
    // if wrong password
    if (!passwordMatch) {
      return { error: true, message: "Contraseña no válida" };
    }
    // correct password
    // TODO: generate jwt token

    // return response with token
    return { error: false, message: "Usuario Autenticado" };
  }

  @Post("signup")
  @HttpCode(201)
  async signup(@Body() body: SignupDto): Promise<Resource> {
    const { email, password } = body;

    // Check if user exist
    const user = await this.usersService.findOne(email);
    // if exists
    if (user) {
      return { error: true, message: "El usuario ya existe" };
    }
    // if not exist
    // Hash password
    const hashedPassword = await this.utilsService.passwordHash(password);

    // // save user in db
    await this.usersService.createUser({ ...body, password: hashedPassword });

    return { error: false, message: "Usuario creado" };
  }
}
