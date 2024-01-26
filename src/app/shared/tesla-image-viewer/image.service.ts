import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageFolderURL = "https://interstate21.com/tesla-app/images/";
  constructor() { }

  public getTeslaModelImage(teslaModelCode: string, teslaModelColore: string): string {
    return this.imageFolderURL + teslaModelCode + "/" + teslaModelColore + ".jpg";
  }
}
