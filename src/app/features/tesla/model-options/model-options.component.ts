import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Config, ConfiguredTesla, TeslaType } from '../services/models';
import { ModelConfigService } from '../services/model-config.service';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';

@Component({
  selector: 'app-model-options',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './model-options.component.html',
  styleUrl: './model-options.component.scss'
})
export class ModelOptionsComponent implements OnInit, OnDestroy {
  teslaType: TeslaType | null = null;
  selectedTeslaTypeConfig: Config | null = null;
  selectedTeslaTypeConfigId: number | null = null;

  private configuredTesla: ConfiguredTesla | null = null;
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

    const subscription = teslaType$.subscribe((teslaType: TeslaType) => {
      self.teslaType = teslaType;
    });

    this.subSink.add(subscription);
  }

  onTeslaTypeConfigChange(): void {
    if (!this.teslaType) {
      return;
    }

    const findedConfig = this.teslaType?.configs.find((teslaTypeConfig: Config) => {
      return teslaTypeConfig.id == this.selectedTeslaTypeConfigId
    });

    if (!findedConfig) {
      this.selectedTeslaTypeConfig = null;
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
