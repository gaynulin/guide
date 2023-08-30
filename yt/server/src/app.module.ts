import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {DataModule} from './data/data.module';
import {CacheModule} from "@nestjs/cache-manager";
import type { RedisClientOptions } from 'redis';
// import * as redisStore from 'cache-manager-redis-store';
import { redisStore } from 'cache-manager-redis-yet';
import { PrismaService } from './prisma/prisma.service';
import { ChannelService } from './channel/channel.service';
import { ApiService } from './api/api.service';
import {HttpModule, HttpService} from "@nestjs/axios";
import { SubscriptionService } from './subscription/subscription.service';
import { PlaylistService } from './playlist/playlist.service';
import { VideoService } from './video/video.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => ({
                store: await redisStore({
                    socket: {
                        host: 'localhost',
                        port: 6479,
                    },
                }),
            }),
        }),
        ConfigModule.forRoot(),
        DataModule,
        HttpModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, ChannelService, ApiService, SubscriptionService, PlaylistService, VideoService],
})
export class AppModule {
}
