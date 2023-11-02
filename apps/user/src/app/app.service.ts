import { Get, Injectable, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>) {}

  async hashPassword(password:string):Promise<string>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
  }
  async create(user:UserDto){
    user.password=await this.hashPassword(user.password)
    const result=await this.userRepo.insert(user)
    return result.raw[0]
  }


  async generateToken(user:User){
    const payload={
      id:user.id,
      email:user.email
    }
    return jwt.sign(payload,process.env.JWT_SECRET)
  }

  async login(email:string,password:string){
    const user=await this.userRepo.findOne({where:{email}})
    if(!user){
      throw new Error("User not found")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      throw new Error("Wrong password")
    }
    return this.generateToken(user)
  }

  async findById(id:number){
    return this.userRepo.findOne({where:{id}})
  }
  async updateById(id:number,user:UserDto){
    return this.userRepo.update({id},user)
  }
}
