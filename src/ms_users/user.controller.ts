import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { USER_SERVICE_NAME ,CreateUserRequest, CreateUserResponse, FindOneUserRequest, FindOneUserResponse, DeleteUserRequest, DeleteUserResponse, UserServiceController } from './users.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { isObservable, lastValueFrom } from 'rxjs';

@Controller('users')
export class UserController implements OnModuleInit {
    private userService: UserServiceController;

    constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}
  
    onModuleInit() {
      this.userService = this.client.getService<UserServiceController>(USER_SERVICE_NAME);
    }
  
    @Post()
    async createUser(@Body() request: CreateUserRequest): Promise<CreateUserResponse> {
        const user = this.userService.createUser({
            username: request.username,
            password: request.password,
            email: request.email,
        });

        if (!isObservable(user)) {
            return user;
        }
        const data = await lastValueFrom(user);
        return data;
    }

    @Delete(':id')
    async deleteUser(@Param('id') request: DeleteUserRequest): Promise<DeleteUserResponse> {
        const user = this.userService.deleteUser({ id: request.id });

        if (!isObservable(user)) {
            return user;
        }
        const data = await lastValueFrom(user);
        return data;
    }

    @Get(':id')
    async findOneUser(@Param('id')request: FindOneUserRequest): Promise<FindOneUserResponse> {
    
      const user = this.userService.findOneUser({ id: request.id });
      if (!isObservable(user)) {
        return user;
    }
    const data = await lastValueFrom(user);
    return data;
  }
}
