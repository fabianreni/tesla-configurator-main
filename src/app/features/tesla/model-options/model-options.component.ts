import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Config, TeslaType } from '../services/models';

@Component({
  selector: 'app-model-options',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './model-options.component.html',
  styleUrl: './model-options.component.scss'
})
export class ModelOptionsComponent implements OnInit, OnDestroy {

  teslaType: TeslaType | null = null;
  selectedTeslaTypeConfig: Config | null = null;
  selectedTeslaTypeConfigId: number | null = null;

  private subSink: Subscription = new Subscription();

  constructor(
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.initializeTeslaType();
  }

  private getTeslaTypesDataByApi(code: string): Observable<TeslaType> {
    let url = '/options/:id';
    url = url.replace(':id', code)
    const rawTeslaTypeData$ = this.httpClient.get<TeslaType>(url);

    return rawTeslaTypeData$;
  }

  private initializeTeslaType(): void {
    const teslaType$ = this.getTeslaTypesDataByApi('S');

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
