import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly imageFolderURL = "https://interstate21.com/tesla-app/images/";
  constructor() { }

  getTeslaModelImage(teslaModelCode: string, teslaModelColore: string): string {
    return `${this.imageFolderURL}${teslaModelCode}/${teslaModelColore}.jpg`;
  }
}
