import { Injectable } from '@angular/core';
import { ConfiguredTesla } from './models';

@Injectable({
  providedIn: 'root'
})
export class ConfiguredTeslaService {

  public configuration: ConfiguredTesla= new ConfiguredTesla();
  constructor() { }
}
