import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import { SampleModule } from './sample/sample.module';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UsersModule,
    SampleModule,
  ],
})
export default class V1Module {}
