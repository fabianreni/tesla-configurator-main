import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, TeslaModelConfig } from '../services/models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelConfigService } from '../services/model-config.service';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';
import { ConfiguredTesla } from '../services/configured-tesla-model';

@Component({
  selector: 'app-model-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './model-config.component.html',
  styleUrl: './model-config.component.scss'
})
export class ModelConfigComponent implements OnInit, OnDestroy {

  configuredTesla: ConfiguredTesla | null = null;
  teslaModels: TeslaModelConfig[] = [];

  selectedTeslaModel: TeslaModelConfig | null = null

  private subSink: Subscription = new Subscription();
  constructor(
    private modelConfigService: ModelConfigService,
    private configuredTeslaService: ConfiguredTeslaService
  ) { }

  ngOnInit() {
    this.initializeTeslaModels();
  }

  initializeConfiguredTesla(): void {
    const configuredTesla$ = this.configuredTeslaService.getConfiguredTesla();

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
      self.restoreSelectedInfoFromCaches();
    });

    this.subSink.add(subscription);
  }

  onModelCodeChange(selectedModel: string | null): void {
    if (!selectedModel) {
      return;
    }

    const findedModel = this.findSelectedModel(selectedModel);

    if (!findedModel) {
      this.resetConfigAndSelectedInfo();
      return;
    }

    this.selectedTeslaModel = findedModel;
    this.configuredTeslaService.setSelectedTeslaModel(this.selectedTeslaModel);
  }

  onModelColorChange(selectedColor: string | null): void {
    const findedColor = this.selectedTeslaModel?.colors.find((color: Color) => {
      return color.code === selectedColor;
    });

    if (!findedColor) {
      this.configuredTeslaService.resetColor();
      return;
    }

    this.configuredTeslaService.setSelectedTeslaColor(findedColor);
  }

  private initializeTeslaModels(): void {
    const teslaModels$ = this.modelConfigService.getTeslaModelConfig();
    const self = this;

    const subscription = teslaModels$.subscribe((teslaModels) => {
      self.teslaModels = teslaModels;
      self.initializeConfiguredTesla();
    });

    this.subSink.add(subscription);
  }

  private findSelectedModel(selectedModel: string | null): TeslaModelConfig | null {
    if (!selectedModel) {
      return null;
    }

    const findedModel = this.teslaModels.find((model: TeslaModelConfig) => {
      return model.code === selectedModel;
    });

    if (!findedModel) {
      return null;
    }

    return findedModel;
  }

  private restoreSelectedInfoFromCaches(): void {
    if (!this.configuredTesla) { return; }

    const findedModel = this.findSelectedModel(this.configuredTesla.modelCode);
    if (!findedModel) {
      return;
    }

    this.selectedTeslaModel = findedModel;

    if (!this.configuredTesla.modelColor) { return; }
  }

  private resetConfigAndSelectedInfo(): void {
    this.configuredTeslaService.resetConfiguredTesla();
    this.selectedTeslaModel = null;
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
