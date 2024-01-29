import { Injectable } from '@angular/core';
import { Color, Config, TeslaModelConfig } from './models';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ConfiguredTesla } from './configured-tesla-model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguredTeslaService {

  private configuration$: Observable<ConfiguredTesla>;
  private configurationSubject: Subject<ConfiguredTesla> = new ReplaySubject<ConfiguredTesla>(1);
  private configuredTesla: ConfiguredTesla;

  constructor() {
    this.configuration$ = this.configurationSubject.asObservable();
    this.configuredTesla = new ConfiguredTesla();
  }

  getConfiguredTesla(): Observable<ConfiguredTesla> {
    return this.configuration$;
  }

  isModelConfigSelected(): boolean {
    if (this.configuredTesla.getIsModelConfigSelected()) {
      return true;
    }

    return false;
  }

  isModelOptionConfigSelected(): boolean {
    if (this.configuredTesla.getIsModelOptionConfigSelected()) {
      return true;
    }

    return false;
  }

  resetConfiguredTesla(): void {
    this.configuredTesla.reset();
    this.setConfiguredTesla();
  }

  resetColor(): void {
    this.configuredTesla.resetColorAndOptionConfig();
    this.setConfiguredTesla();
  }

  resetOptionConfig(): void {
    this.configuredTesla.resetOptionConfig();
    this.setConfiguredTesla();
  }

  setSelectedTeslaModel(selectedTeslaModel: TeslaModelConfig): void {
    this.configuredTesla.reset();
    this.configuredTesla.setModelAndDescription(selectedTeslaModel);

    this.setConfiguredTesla();
  }

  setSelectedTeslaColor(selectedTeslaColor: Color): void {
    this.configuredTesla.setSelectedTeslaColor(selectedTeslaColor);
    this.setConfiguredTesla();
  }

  setSelectedTeslaType(selectedTeslaType: Config): void {
    this.configuredTesla.setSelectedTeslaType(selectedTeslaType);
    this.setConfiguredTesla();
  }

  setTowHitch(towHitch: boolean): void {
    this.configuredTesla.setTowHitch(towHitch);
  }

  setYoke(yoke: boolean): void {
    this.configuredTesla.setYoke(yoke);
  }

  updatePrice(): void {
    this.configuredTesla.setTotalPrice();
    this.setConfiguredTesla();
  }

  private setConfiguredTesla(): void {
    this.configurationSubject.next(this.configuredTesla);
  }
}
