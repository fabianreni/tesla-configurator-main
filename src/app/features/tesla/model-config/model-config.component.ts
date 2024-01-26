import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, ConfiguredTesla, TeslaModel } from '../services/models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelConfigService } from '../services/model-config.service';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';

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
  teslaModels: TeslaModel[] = [];
  selectedTeslaModelCode: string | null = null;
  selectedTeslaModel: TeslaModel | null = null
  selectedTeslaColorCode: string | null = null;

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

    this.selectedTeslaModelCode = this.configuredTesla.modelCode;

    const findedModel = this.findSelectedModel();
    if (!findedModel) {
      return;
    }

    this.selectedTeslaModel = findedModel;

    if (!this.configuredTesla.modelColor) { return; }

    this.selectedTeslaColorCode = this.configuredTesla.modelColor.code;
  }

  onModelCodeChange() {
    const findedModel = this.findSelectedModel();

    if (!findedModel) {
      return;
    }

    this.selectedTeslaModel = findedModel;
    this.selectedTeslaColorCode = null;
    this.configuredTeslaService.setSelectedTeslaModel(this.selectedTeslaModel);
  }

  private findSelectedModel(): TeslaModel | null {
    const findedModel = this.teslaModels.find((model: TeslaModel) => {
      return model.code === this.selectedTeslaModelCode
    });

    if (!findedModel) {
      return null;
    }

    return findedModel;
  }

  onModelColorChange() {
    const findedColor = this.selectedTeslaModel?.colors.find((color: Color) => {
      return color.code === this.selectedTeslaColorCode
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
