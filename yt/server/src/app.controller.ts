import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {DataService} from "./data/data.service";
import {VideoService} from "./video/video.service";
import {Video} from "@prisma/client";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly videoService: VideoService,
      ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/videos')
  getVideos(): Promise<Video[]> {
    // return Promise.resolve([]);
    return this.videoService.videos({
        include: {
          channel: true
        },
     where: { whenAt: {
         gte: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
       }},
      orderBy: {
        whenAt: 'desc'
      }
    })
  }
}
