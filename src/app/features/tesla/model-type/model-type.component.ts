import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Config, TeslaModelType } from '../services/models';
import { ModelConfigService } from '../services/model-config.service';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';
import { ConfiguredTesla } from '../services/configured-tesla-model';

@Component({
  selector: 'app-model-type',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './model-type.component.html',
  styleUrl: './model-type.component.scss'
})
export class ModelTypeComponent implements OnInit, OnDestroy {
  teslaType: TeslaModelType | null = null;
  selectedTeslaTypeConfig: Config | null = null;
  selectedTeslaTypeConfigId: number | null = null;
  configuredTesla: ConfiguredTesla | null = null;

  private subSink: Subscription = new Subscription();

  constructor(
    private modelConfigService: ModelConfigService,
    private configuredTeslaService: ConfiguredTeslaService) { }

  ngOnInit() {
    this.initializeConfiguredTesla();
  }

  public initializeConfiguredTesla(): void {
    const configuredTesla$ = this.configuredTeslaService.configuration$;

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
      this.initializeTeslaType();
    });

    this.subSink.add(subscription);
  }

  private initializeTeslaType(): void {
    if (!this.configuredTesla || !this.configuredTesla.modelCode) { return; }
    const teslaType$ = this.modelConfigService.getTeslaTypesDataByApi(this.configuredTesla.modelCode);

    const self = this;

    const subscription = teslaType$.subscribe((teslaType: TeslaModelType) => {
      self.teslaType = teslaType;
      this.restoreDataFromCaches();
    });

    this.subSink.add(subscription);
  }

  private restoreDataFromCaches(): void {
    if (!this.configuredTesla || !this.configuredTesla.typeConfig) { return; }
    this.selectedTeslaTypeConfigId = this.configuredTesla.typeConfig.id;

    if (!this.teslaType) { return; }
    this.teslaType.towHitch = this.configuredTesla.towHitch;
    this.teslaType.yoke = this.configuredTesla.yoke;

    const findedConfig = this.findSelectedConfig()

    if (!findedConfig) {
      return;
    }

    this.selectedTeslaTypeConfig = findedConfig;
  }

  private findSelectedConfig(): Config | null {
    if (!this.teslaType) {
      return null;
    }
    const findedConfig = this.teslaType.configs.find((teslaTypeConfig: Config) => {
      return teslaTypeConfig.id == this.selectedTeslaTypeConfigId
    });

    if (!findedConfig) {
      return null;
    }

    return findedConfig;
  }

  onTeslaTypeConfigChange(): void {
    if (!this.teslaType) {
      return;
    }

    const findedConfig = this.findSelectedConfig()

    if (!findedConfig) {
      return;
    }

    this.selectedTeslaTypeConfig = findedConfig;
    this.configuredTeslaService.setSelectedTeslaType(
      this.selectedTeslaTypeConfig, this.teslaType.towHitch, this.teslaType.yoke);
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
