import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Config, TeslaType } from '../services/models';
import { ModelConfigService } from '../services/model-config.service';

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

  private subSink: Subscription = new Subscription();

  constructor(
    private modelConfigService: ModelConfigService) { }

  ngOnInit() {
    this.initializeTeslaType();
  }

  private initializeTeslaType(): void {
    const teslaType$ = this.modelConfigService.getTeslaTypesDataByApi('S');

    const self = this;

    const subscription = teslaType$.subscribe((teslaType: TeslaType) => {
      self.teslaType = teslaType;
      console.log(teslaType)
    });

    this.subSink.add(subscription);
  }

  onTeslaTypeConfigChange(): void {
    const findedConfig = this.teslaType?.configs.find((teslaTypeConfig: Config) => {
      return teslaTypeConfig.id == this.selectedTeslaTypeConfigId
    });

    console.log(findedConfig)
    if (!findedConfig) {
      this.selectedTeslaTypeConfig = null;
      return;
    }

    this.selectedTeslaTypeConfig = findedConfig;
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
