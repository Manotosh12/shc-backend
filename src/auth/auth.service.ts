// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService) {}

  async signup(user: { email: string; password: string; name: string; phone: string }) {
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
  }
}
