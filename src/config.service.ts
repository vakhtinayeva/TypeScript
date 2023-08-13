import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string): string {
    const value = this.env[key];

    if (!value) {
      throw new Error(`Config error - missing env.${key}`);
    }
    return value;
  }

  public getPort() {
    return this.getValue('PORT');
  }

  public getAWSBucket() {
    return this.getValue('AWS_PUBLIC_BUCKET_NAME');
  }

  public getJWTSecret() {
    return this.getValue('JWT_SECRET');
  }

  public getGoogleConfig() {
    return {
      clientID: this.getValue('GOOGLE_CLIENT_ID'),
      clientSecret: this.getValue('GOOGLE_SECRET'),
      callbackURL: this.getValue('GOOGLE_CALLBACK_URL'),
    };
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DATABASE'),
      entities: ['dist/src/models/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['../migrations/*.ts'],
    };
  }
}

const configService = new ConfigService(process.env);
export { configService };
