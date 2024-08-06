import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: "first_name", type: "varchar", length: 60 })
  firstName: string;
  @Column({ name: "last_name", type: "varchar", length: 60 })
  lastName: string;
  @Column({ type: "varchar", length: 100 })
  email: string;
  @Column({ type: "varchar", length: 60 })
  password: string;
}
