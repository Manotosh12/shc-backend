import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with correct params and return result', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        phone: '1234567890',
      };
      const result = { id: 1, ...dto };
      jest.spyOn(authService, 'signup').mockResolvedValue(result as any);

      expect(await controller.signup(dto)).toEqual(result);
      expect(authService.signup).toHaveBeenCalledWith(dto);
    });
  });
});