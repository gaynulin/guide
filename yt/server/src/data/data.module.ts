import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import {HttpModule} from "@nestjs/axios";
import {ApiService} from "../api/api.service";
import {ChannelService} from "../channel/channel.service";
import {PrismaService} from "../prisma/prisma.service";
import {SubscriptionService} from "../subscription/subscription.service";
import {PlaylistService} from "../playlist/playlist.service";
import {VideoService} from "../video/video.service";

@Module({
  imports: [HttpModule],
  providers: [DataService,
    VideoService, ApiService, PlaylistService, ChannelService, SubscriptionService, PrismaService],
  controllers: [DataController]
})
export class DataModule {}
