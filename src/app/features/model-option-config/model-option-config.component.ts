import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
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
  @Input() modelCode?: string;

  teslaOptionConfig: TeslaModelOptionConfig | null = null;
  selectedTeslaTypeConfig: Config | null = null;
  configuredTesla: ConfiguredTesla | null = null;

  private subSink: Subscription = new Subscription();

  constructor(
    private modelConfigService: ModelConfigService,
    private configuredTeslaService: ConfiguredTeslaService) { }

  ngOnInit() {
    this.initializeTeslaOptionConfig();
  }

  onTeslaOptionConfigChange(selectedTeslaTypeConfig: string): void {
    if (!this.teslaOptionConfig) {
      return;
    }

    const selectedTeslaTypeConfigId = Number(selectedTeslaTypeConfig);

    const findedConfig = this.findSelectedConfig(selectedTeslaTypeConfigId);

    if (!findedConfig) {
      this.configuredTeslaService.resetOptionConfig();
      this.selectedTeslaTypeConfig = null;
      return;
    }

    this.selectedTeslaTypeConfig = findedConfig;
    this.configuredTeslaService.setSelectedTeslaType(
      this.selectedTeslaTypeConfig);
  }

  onTeslaIncludeTowChange(): void {
    if (!this.teslaOptionConfig) { return; }
    this.configuredTeslaService.setTowHitch(this.teslaOptionConfig.towHitch);
  }

  onTeslaYokeChange(): void {
    if (!this.teslaOptionConfig) { return; }
    this.configuredTeslaService.setYoke(this.teslaOptionConfig.yoke);
  }

  private initializeTeslaOptionConfig(): void {
    if (!this.modelCode) { return; }

    const teslaOptionsConfig$ = this.modelConfigService.getTeslaOptionsConfig(this.modelCode);

    const self = this;
    const subscription = teslaOptionsConfig$.subscribe((teslaOptionsConfig) => {
      self.teslaOptionConfig = teslaOptionsConfig;
      this.restoreDataFromCaches();
    });

    this.subSink.add(subscription);
  }

  private findSelectedConfig(selectedTeslaTypeConfigId: number | null): Config | null {
    if (!selectedTeslaTypeConfigId || !this.teslaOptionConfig) {
      return null;
    }

    const findedConfig = this.teslaOptionConfig.configs.find((teslaTypeConfig: Config) => {
      return teslaTypeConfig.id == selectedTeslaTypeConfigId;
    });

    if (!findedConfig) {
      return null;
    }

    return findedConfig;
  }

  private restoreDataFromCaches(): void {
    const configuredTesla$ = this.configuredTeslaService.getConfiguredTesla();

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
      this.restoreDataFromCachesInternal();
    });

    this.subSink.add(subscription);
  }

  private restoreDataFromCachesInternal(): void {
    if (!this.configuredTesla || !this.configuredTesla.config) {
      if (this.teslaOptionConfig) {
        this.configuredTeslaService.setTowHitch(this.teslaOptionConfig.towHitch);
        this.configuredTeslaService.setYoke(this.teslaOptionConfig.yoke);
      }
    }

    if (!this.configuredTesla || !this.configuredTesla.config || !this.teslaOptionConfig) { return; }

    const findedConfig = this.findSelectedConfig(this.configuredTesla.config.id);

    if (!findedConfig) {
      return;
    }

    this.selectedTeslaTypeConfig = findedConfig;
    this.teslaOptionConfig.towHitch = this.configuredTesla.towHitch;
    this.teslaOptionConfig.yoke = this.configuredTesla.yoke;;
  }

  private setTowHitchAndYoke(): void {
    if (!this.teslaOptionConfig) { return; }
    this.configuredTesla?.setTowHitch(this.teslaOptionConfig.towHitch);
    this.configuredTesla?.setYoke(this.teslaOptionConfig.towHitch);
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
