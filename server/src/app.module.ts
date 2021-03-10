import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { configuration, configValidationSchema } from './config/config';

import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { RoleModule } from './features/role/role.module';
import { CourseModule } from './features/course/course.module';
import { LessonModule } from './features/lesson/lesson.module';
import { TagModule } from './features/tag/tag.module';
import { TagTypeModule } from './features/tag-type/tag-type.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    CourseModule,
    LessonModule,
    TagModule,
    TagTypeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'src/config/.env'),
      load: [ configuration ],
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/gql/schema.gql'),
      playground: true,
    }),
    TypeOrmModule.forRoot({}),
  ],
})
export class AppModule {
}
