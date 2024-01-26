import { Injectable } from '@angular/core';
import { Color, Config, ConfiguredTesla, TeslaModel } from './models';
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

  setSelectedTeslaModel(selectedTeslaModel: TeslaModel): void {
    this.configuredTesla.modelCode = selectedTeslaModel.code;
    this.configuredTesla.modelDescription = selectedTeslaModel.description;
    this.configuredTesla.modelColor = null;
    this.setConfiguredTesla();
  }

  setSelectedTeslaColor(selectedTeslaColor: Color): void {
    this.configuredTesla.modelColor = selectedTeslaColor;
    this.setConfiguredTesla();
  }

  setSelectedTeslaType(selectedTeslaType: Config, towHitch: boolean, yoke: boolean): void {
    this.configuredTesla.typeConfig = selectedTeslaType;
    this.configuredTesla.towHitch = towHitch;
    this.configuredTesla.yoke = yoke;
    this.setConfiguredTesla();
  }
}
