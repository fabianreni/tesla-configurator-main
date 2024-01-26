import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeslaModel, TeslaType } from './models';
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

  public getTeslaTypesDataByApi(code: string): Observable<TeslaType> {
    let url = '/options/:id';
    url = url.replace(':id', code)
    const rawTeslaTypeData$ = this.httpClient.get<TeslaType>(url);

    return rawTeslaTypeData$;
  }

}
