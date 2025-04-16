import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || '0D8iOSOy4xDlELZA8HolQw0DIzJhxsnJyWPEeunxRqv-zMHoo_iqQhOdVxvYFucL',
  signOptions: { 
    expiresIn: process.env.JWT_TOKEN_EXPIRY || '60480000'
  },
};
