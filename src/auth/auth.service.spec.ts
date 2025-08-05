// src/auth/auth.service.spec.ts
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthService', () => {
  let authService: AuthService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const values = {
        AUTH0_DOMAIN: 'example.auth0.com',
        AUTH0_CLIENT_ID: 'test-client-id',
        AUTH0_CLIENT_SECRET: 'test-client-secret',
        AUTH0_CONNECTION: 'Username-Password-Authentication',
      };
      return values[key];
    }),
  };

  beforeEach(() => {
    configService = mockConfigService as unknown as ConfigService;
    authService = new AuthService(configService);
    jest.clearAllMocks();
  });

  const signupDto: SignupDto = {
    email: 'test@example.com',
    password: 'securepass',
    name: 'John Doe',
    phone: '9876543210',
  };

  it('should create user successfully in Auth0', async () => {
    mockedAxios.post.mockImplementation((url, data) => {
      if (url.includes('/oauth/token')) {
        return Promise.resolve({
          data: { access_token: 'mock-access-token' },
        });
      }

      if (url.includes('/api/v2/users')) {
        return Promise.resolve({ data: { user_id: 'auth0|123' } });
      }

      return Promise.reject(new Error('Unknown URL'));
    });

    const result = await authService.signup(signupDto);

    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/oauth/token'),
      expect.objectContaining({
        client_id: 'test-client-id',
        client_secret: 'test-client-secret',
      }),
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/api/v2/users'),
      expect.objectContaining({
        email: signupDto.email,
        password: signupDto.password,
        user_metadata: {
          name: signupDto.name,
          phone: signupDto.phone,
        },
      }),
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer mock-access-token',
        },
      }),
    );

    expect(result).toEqual({ message: 'User created in Auth0' });
  });

  it('should throw InternalServerErrorException on error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Email already exists',
        },
      },
    });

    await expect(authService.signup(signupDto)).rejects.toThrow(
      new InternalServerErrorException('Signup failed: Email already exists'),
    );

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
