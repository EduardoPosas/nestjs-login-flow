import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { UtilsService } from "src/common/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import Resource from "src/common/resources/Resource.dto";
import SignupDto from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private utilsService: UtilsService,
    private jwtService: JwtService,
  ) {}

  async signin(email: string, password: string): Promise<Resource> {
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
    const payload = {
      sub: user.email,
      userName: user.firstName,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);

    // return response with token
    return {
      error: false,
      message: "Usuario Autenticado",
      accessToken,
    };
  }

  async signup(signupDto: SignupDto): Promise<Resource> {
    const { email, password } = signupDto;
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
    await this.usersService.createUser({
      ...signupDto,
      password: hashedPassword,
    });

    return { error: false, message: "Usuario creado" };
  }
}
