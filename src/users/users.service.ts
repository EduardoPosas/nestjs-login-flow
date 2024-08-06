import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/CreateUser.dto";

@Injectable()
export class UsersService {
  // inject the user repository
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: User["email"]): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }
}
