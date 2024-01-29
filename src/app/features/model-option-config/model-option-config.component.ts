import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Config, TeslaModelOptionConfig } from '../services/models';
import { ModelConfigService } from '../services/model-config.service';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';
import { ConfiguredTesla } from '../services/configured-tesla-model';

@Component({
  selector: 'app-model-option-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './model-option-config.component.html',
  styleUrl: './model-option-config.component.scss'
})
export class ModelOptionConfigComponent implements OnInit, OnDestroy {
  teslaOptionsConfig: TeslaModelOptionConfig | null = null;
  selectedTeslaModelOptionConfig: Config | null = null;
  
  configuredTesla: ConfiguredTesla | null = null;

  private subSink: Subscription = new Subscription();

  constructor(
    private modelConfigService: ModelConfigService,
    private configuredTeslaService: ConfiguredTeslaService) { }

  ngOnInit() {
    this.initializeConfiguredTesla();
  }

  onTeslaOptionConfigChange(selectedTeslaTypeConfig: string): void {
    if (!this.teslaOptionsConfig) {
      return;
    }

    const selectedTeslaTypeConfigId = Number(selectedTeslaTypeConfig);

    const findedConfig = this.findSelectedConfig(selectedTeslaTypeConfigId);

    if (!findedConfig) {
      this.resetConfigAndSelectedInfo();
      return;
    }

    this.selectedTeslaModelOptionConfig = findedConfig;
    this.configuredTeslaService.setSelectedTeslaType(
      this.selectedTeslaModelOptionConfig);
  }

  onTeslaIncludeTowChange(): void {
    if (!this.teslaOptionsConfig) { return; }
    this.configuredTeslaService.setTowHitch(this.teslaOptionsConfig.towHitch);
  }

  onTeslaYokeChange(): void {
    if (!this.teslaOptionsConfig) { return; }
    this.configuredTeslaService.setYoke(this.teslaOptionsConfig.yoke);
  }

  private initializeConfiguredTesla(): void {
    const configuredTesla$ = this.configuredTeslaService.getConfiguredTesla();

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
      this.initializeTeslaOptionConfig();
    });

    this.subSink.add(subscription);
  }


  private initializeTeslaOptionConfig(): void {
    if (!this.configuredTesla || !this.configuredTesla.modelCode) { return; }
    const teslaOptionConfig$ = this.modelConfigService.getTeslaOptionsConfig(this.configuredTesla.modelCode);

    const self = this;

    const subscription = teslaOptionConfig$.subscribe((teslaOptionConfig: TeslaModelOptionConfig) => {
      self.teslaOptionsConfig = teslaOptionConfig;
      this.getAndRestoreSelectedInfoFromCaches();
    });

    this.subSink.add(subscription);
  }

  private findSelectedConfig(selectedTeslaTypeConfigId: number | null): Config | null {
    if (!selectedTeslaTypeConfigId || !this.teslaOptionsConfig) {
      return null;
    }

    const findedConfig = this.teslaOptionsConfig.configs.find((teslaTypeConfig: Config) => {
      return teslaTypeConfig.id == selectedTeslaTypeConfigId;
    });

    if (!findedConfig) {
      return null;
    }

    return findedConfig;
  }

  private getAndRestoreSelectedInfoFromCaches(): void {
    const configuredTesla$ = this.configuredTeslaService.getConfiguredTesla();

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
      this.restoreDataFromCaches();
    });

    this.subSink.add(subscription);
  }

  private restoreDataFromCaches(): void {
    if (!this.configuredTesla || !this.configuredTesla.config) {
      this.setConfiguredTeslaInitialTowHitchAndYoke();
    }

    this.restoreDataFromCachesInternal();
  }

  private restoreDataFromCachesInternal(): void {
    if (!this.configuredTesla || !this.configuredTesla.config || !this.teslaOptionsConfig) { return; }

    const findedConfig = this.findSelectedConfig(this.configuredTesla.config.id);

    if (!findedConfig) {
      return;
    }

    this.selectedTeslaModelOptionConfig = findedConfig;
    this.teslaOptionsConfig.towHitch = this.configuredTesla.towHitch;
    this.teslaOptionsConfig.yoke = this.configuredTesla.yoke;
  }

  private setConfiguredTeslaInitialTowHitchAndYoke(): void {
    if (this.teslaOptionsConfig) {
      this.configuredTeslaService.setTowHitch(this.teslaOptionsConfig.towHitch);
      this.configuredTeslaService.setYoke(this.teslaOptionsConfig.yoke);
    }
  }

  private resetConfigAndSelectedInfo(): void {
    this.configuredTeslaService.resetOptionConfig();
    this.selectedTeslaModelOptionConfig = null;
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
