import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeslaModelConfig, TeslaModelOptionConfig } from './models';
import { Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelConfigService {

  private teslaOptioncConfigSubject: ReplaySubject<TeslaModelOptionConfig> | null = null;
  private teslaModelOptionConfig: TeslaModelOptionConfig | null = null;

  constructor(
    public httpClient: HttpClient
  ) { }

  getTeslaModelConfig(): Observable<TeslaModelConfig[]> {
    const teslaOptionConfig$ = this.getTeslaModelsByApi();

    const config$ = teslaOptionConfig$.pipe(
      map((config: TeslaModelConfig[]) => {
        return config;
      }),
      catchError((err) => {
        console.error('An error occurred while loading the models:', err);
        throw err;
      })
    );

    return config$;
  }

  getTeslaOptionsConfig(code: string): Observable<TeslaModelOptionConfig> {
    if (this.canLoadFromCache(code) && this.teslaOptioncConfigSubject) {
      return this.teslaOptioncConfigSubject.asObservable();
    }

    return this.getTeslaOptioncConfigInternal(code);
  }

  private canLoadFromCache(code: string): boolean {
    if (this.teslaModelOptionConfig && this.teslaModelOptionConfig.code === code) {
      return true;
    }

    return false;
  }

  private getTeslaModelsByApi(): Observable<TeslaModelConfig[]> {
    const url = '/models';
    const rawTeslaModelData$ = this.httpClient.get<TeslaModelConfig[]>(url);

    return rawTeslaModelData$;
  }

  private getTeslaOptioncConfigByApi(code: string): Observable<TeslaModelOptionConfig> {
    let url = '/options/:id';
    url = url.replace(':id', code);
    const rawTeslaTypeData$ = this.httpClient.get<TeslaModelOptionConfig>(url);

    return rawTeslaTypeData$;
  }

  private getTeslaOptioncConfigInternal(code: string): Observable<TeslaModelOptionConfig> {
    const teslaOptionConfig$ = this.getTeslaOptioncConfigByApi(code);

    const self = this;
    const config$ = teslaOptionConfig$.pipe(
      map((config: TeslaModelOptionConfig) => {
        self.teslaModelOptionConfig = config;
        self.teslaModelOptionConfig.code = code;
        self.setConfig();
        
        return self.teslaModelOptionConfig;
      }),
      catchError((err) => {
        console.error('An error occurred while loading the options:', err);
        throw err;
      })
    );

    return config$;
  }

  private setConfig(): void {
    if (!this.teslaOptioncConfigSubject) {
      this.teslaOptioncConfigSubject = new ReplaySubject<TeslaModelOptionConfig>(1);
    }

    if (this.teslaModelOptionConfig) {
      this.teslaOptioncConfigSubject.next(this.teslaModelOptionConfig);
    }
  }
}
