import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeslaModelConfig, TeslaModelType } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelConfigService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getTeslaModelsByApi(): Observable<TeslaModelConfig[]> {
    const url = '/models';
    const rawTeslaModelData$ = this.httpClient.get<TeslaModelConfig[]>(url);

    return rawTeslaModelData$;
  }

  getTeslaTypesDataByApi(code: string): Observable<TeslaModelType> {
    let url = '/options/:id';
    url = url.replace(':id', code)
    const rawTeslaTypeData$ = this.httpClient.get<TeslaModelType>(url);

    return rawTeslaTypeData$;
  }

}
