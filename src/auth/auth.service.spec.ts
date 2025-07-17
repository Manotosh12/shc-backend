import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const values: Record<string, string> = {
                AUTH0_DOMAIN: 'test-domain.auth0.com',
                AUTH0_CLIENT_ID: 'test-client-id',
                AUTH0_CLIENT_SECRET: 'test-client-secret',
                AUTH0_CONNECTION: 'Username-Password-Authentication',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a user in Auth0 and return a message', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        phone: '1234567890',
      };

      // Mock the token response
      mockedAxios.post.mockResolvedValueOnce({
        data: { access_token: 'fake-access-token' },
      });

      // Mock the user creation response
      mockedAxios.post.mockResolvedValueOnce({ data: {} });

      const result = await service.signup(user);

      expect(mockedAxios.post).toHaveBeenNthCalledWith(
        1,
        'https://test-domain.auth0.com/oauth/token',
        {
          client_id: 'test-client-id',
          client_secret: 'test-client-secret',
          audience: 'https://test-domain.auth0.com/api/v2/',
          grant_type: 'client_credentials',
        }
      );

      expect(mockedAxios.post).toHaveBeenNthCalledWith(
        2,
        'https://test-domain.auth0.com/api/v2/users',
        {
          email: user.email,
          password: user.password,
          connection: 'Username-Password-Authentication',
          user_metadata: {
            name: user.name,
            phone: user.phone,
          },
        },
        {
          headers: {
            Authorization: 'Bearer fake-access-token',
          },
        }
      );

      expect(result).toEqual({ message: 'User created in Auth0' });
    });
  });
});