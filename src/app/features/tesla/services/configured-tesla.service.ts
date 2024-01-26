import { Injectable } from '@angular/core';
import { Color, ConfiguredTesla, TeslaModel } from './models';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguredTeslaService {

  public configuration$: Observable<ConfiguredTesla>;

  private configuration: Subject<ConfiguredTesla> = new ReplaySubject<ConfiguredTesla>(1);
  private configuredTesla: ConfiguredTesla;
  constructor() {
    this.configuration$ = this.configuration.asObservable();
    this.configuredTesla = new ConfiguredTesla();
  }

  private setConfiguredTesla(): void {
    if (this.configuredTesla === null || this.configuredTesla.modelCode === null || this.configuredTesla.modelColor === null) {
      return;
    }
    this.configuration.next(this.configuredTesla)
  }

  setSelectedTeslaModel(selectedTeslaModel: TeslaModel,) {
    this.configuredTesla.modelCode = selectedTeslaModel.code;
    this.configuredTesla.modelDescription = selectedTeslaModel.description;
    this.configuredTesla.modelColor = null;
    this.setConfiguredTesla();
  }

  setSelectedTeslaColor(selectedTeslaColor: Color) {
    this.configuredTesla.modelColor = selectedTeslaColor;
    this.setConfiguredTesla();
  }
}
