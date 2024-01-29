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

  private initializeTeslaModels(): void {
    const teslaModels$ = this.modelConfigService.getTeslaModelsByApi();
    const self = this;

    const subscription = teslaModels$.subscribe((teslaModels) => {
      self.teslaModels = teslaModels;
      self.initializeConfiguredTesla();
    });

    this.subSink.add(subscription);
  }

  public initializeConfiguredTesla(): void {
    const configuredTesla$ = this.configuredTeslaService.configuration$;

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
      self.restoreDataFromCaches();
    });

    this.subSink.add(subscription);
  }

  private restoreDataFromCaches(): void {
    if (!this.configuredTesla) { return; }

    const findedModel = this.findSelectedModel(this.configuredTesla.modelCode);
    if (!findedModel) {
      return;
    }

    this.selectedTeslaModel = findedModel;

    if (!this.configuredTesla.modelColor) { return; }
  }

  onModelCodeChange(selectedModel: string | null): void {
    if (!selectedModel) {
      return;
    }

    const findedModel = this.findSelectedModel(selectedModel);

    if (!findedModel) {
      this.configuredTeslaService.resetConfiguredTesla();
      this.selectedTeslaModel = null;
      return;
    }

    this.selectedTeslaModel = findedModel;
    this.configuredTeslaService.setSelectedTeslaModel(this.selectedTeslaModel);
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

  onModelColorChange(selectedColor: string | null): void {
    if (!selectedColor) { return; }
    const findedColor = this.selectedTeslaModel?.colors.find((color: Color) => {
      return color.code === selectedColor;
    });

    if (!findedColor) {
      return;
    }

    this.configuredTeslaService.setSelectedTeslaColor(findedColor);
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
