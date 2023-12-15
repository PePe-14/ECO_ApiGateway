import { Body, Controller, Delete, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    CreateUserRequest,
    CreateUserResponse,
    DeleteUserRequest,
    DeleteUserResponse,
    Empty,
    FindOneUserRequest,
    FindOneUserResponse,
    GetAllUsersResponse,
    UserServiceClient,
    USER_SERVICE_NAME
} from './users.pb';

@Controller('users')
export class UserController implements OnModuleInit {
    private userService: UserServiceClient;

    constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>('UserService');
    }

    @Get()
    getAllUsers(): Observable<GetAllUsersResponse> {
        const request: Empty = {};
        return this.userService.getAllUsers(request);
    }

    @Get('id')
    findOneUser(@Body() id: FindOneUserRequest): Observable<FindOneUserResponse> {
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() body: CreateUserRequest): Observable<CreateUserResponse> {
        return this.userService.createUser(body);
    }

    @Delete()
    deleteUser(@Body() id: DeleteUserRequest): Observable<DeleteUserResponse> {
        return this.userService.deleteUser(id);
    }
}
