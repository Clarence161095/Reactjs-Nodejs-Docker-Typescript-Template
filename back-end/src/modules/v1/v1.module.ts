import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import { SetModule } from './set/set.module';
import { CardModule } from './card/card.module';
import { SampleModule } from './sample/sample.module';
import { DefineModule } from './define/define.module';

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
    SetModule,
    CardModule,
    SampleModule,
    DefineModule,
  ],
})
export default class V1Module {}
