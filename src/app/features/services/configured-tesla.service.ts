import { Injectable } from '@angular/core';
import { Color, Config, TeslaModelConfig } from './models';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ConfiguredTesla } from './configured-tesla-model';

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

  resetConfiguredTesla(): void {
    this.configuredTesla.reset();
    this.setConfiguredTesla();
  }

  setSelectedTeslaModel(selectedTeslaModel: TeslaModelConfig): void {
    this.configuredTesla.reset();
    this.configuredTesla.modelCode = selectedTeslaModel.code;
    this.configuredTesla.modelDescription = selectedTeslaModel.description;
    this.configuredTesla.setTotalPrice();
    this.setConfiguredTesla();
  }

  setSelectedTeslaColor(selectedTeslaColor: Color): void {
    this.configuredTesla.modelColor = selectedTeslaColor;
    this.configuredTesla.setTotalPrice();
    this.setConfiguredTesla();
  }

  setSelectedTeslaType(selectedTeslaType: Config, towHitch: boolean, yoke: boolean): void {
    this.configuredTesla.typeConfig = selectedTeslaType;
    this.configuredTesla.towHitch = towHitch;
    this.configuredTesla.yoke = yoke;
    this.configuredTesla.setTotalPrice();
    this.setConfiguredTesla();
  }

  resetType(): void {
    this.configuredTesla.typeConfig = null;
    this.configuredTesla.towHitch = false;
    this.configuredTesla.yoke = false;
    this.setConfiguredTesla();
  }

  isModelConfigSelected(): boolean {
    if (this.configuredTesla.modelCode && this.configuredTesla.modelColor) {
      return true;
    }

    return false;
  }

  isTypeConfigSelected(): boolean {
    if (this.configuredTesla.typeConfig) {
      return true;
    }

    return false;
  }

  private setConfiguredTesla(): void {
    if (this.configuredTesla === null) {
      return;
    }

    this.configuration.next(this.configuredTesla);
  }

}
