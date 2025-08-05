// src/auth/auth.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService) { }

  async signup(user: SignupDto) {
    try {
      const tokenRes = await axios.post(`https://${this.config.get('AUTH0_DOMAIN')}/oauth/token`, {
        client_id: this.config.get('AUTH0_CLIENT_ID'),
        client_secret: this.config.get('AUTH0_CLIENT_SECRET'),
        audience: `https://${this.config.get('AUTH0_DOMAIN')}/api/v2/`,
        grant_type: 'client_credentials',
      });

      const accessToken = tokenRes.data.access_token;

      await axios.post(
        `https://${this.config.get('AUTH0_DOMAIN')}/api/v2/users`,
        {
          email: user.email,
          password: user.password,
          connection: this.config.get('AUTH0_CONNECTION'),
          user_metadata: {
            name: user.name,
            phone: user.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return { message: 'User created in Auth0' };

    } catch (error) {
      console.error('Signup error:', error?.response?.data || error.message);

      // Return a more readable error to the frontend
      throw new InternalServerErrorException(
        'Signup failed: ' + (error?.response?.data?.message || 'Unknown error')
      );
    }
  }
}

