import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../application/services/user.service';

describe('UserController', () => {
  let userController: UserController;
  let createUserRequestDto: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
    createUserRequestDto = {
      email: 'test@test.com',
      username: 'testing'
    }
  });

  // describe('GET /', () => {
  //   xit('should return an array of users', () => {
  //     // expect(userController.getUsers()).toEqual([]);
  //   });
  // });

  describe('POST /', () => {
    it('should create a new user', () => {
      expect(userController.createUser(createUserRequestDto)).toBeDefined();
    });
  });

  // describe('GET /:id', () => {
  //   xit('should return a user by id', () => {
  //     // expect(userController.getUserById()).toBeDefined();
  //   });
  // });

  // describe('DELETE /:id', () => {
  //   xit('should delete a user by id', () => {
  //     // expect(userController.deleteUser()).toBeDefined();
  //   });
  // });
});
