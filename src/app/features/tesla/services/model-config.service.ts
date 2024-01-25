import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeslaModel } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelConfigService {

  constructor(
    public httpClient: HttpClient
  ) { }

  public getTeslaModelsByApi(): Observable<TeslaModel[]> {
    const url = '/models';
    const rawTeslaModelData$ = this.httpClient.get<TeslaModel[]>(url);

    return rawTeslaModelData$;
  }

}
