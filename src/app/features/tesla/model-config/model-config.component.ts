import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaModel } from '../services/models';
import { Subscription } from 'rxjs';
import { ImageService } from '../services/image.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelConfigService } from '../services/model-config.service';

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

  teslaModels: TeslaModel[] = [];
  selectedTeslaModelCode: string | null = null;
  selectedTeslaModel: TeslaModel | null = null
  selectedTeslaColorCode: string | null = null;

  private subSink: Subscription = new Subscription();
  constructor(
    private modelConfigService: ModelConfigService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.initializeTeslaModels();
  }

  private initializeTeslaModels(): void {
    const teslaModels$ = this.modelConfigService.getTeslaModelsByApi();

    const self = this;

    const subscription = teslaModels$.subscribe((teslaModels) => {
      self.teslaModels = teslaModels;
      console.log(self.teslaModels);
    });

    this.subSink.add(subscription);
  }

  onModelCodeChange() {
    const findedModel = this.teslaModels.find((model: TeslaModel) => {
      return model.code === this.selectedTeslaModelCode
    });

    if (!findedModel) {
      this.selectedTeslaModel = null;
      return;
    }

    this.selectedTeslaModel = findedModel;
  }

  initializeImageUrl(): string {
    if (this.selectedTeslaModel && this.selectedTeslaColorCode) {
      return this.imageService.getTeslaModelImage(this.selectedTeslaModel.code, this.selectedTeslaColorCode)
    }
    return '';
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
