import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfiguredTeslaService } from '../../features/services/configured-tesla.service';

@Injectable({
  providedIn: 'root'
})
export class ModelOptionConfigGuardService {

  constructor(
    private router: Router,
    private configuredTeslaService: ConfiguredTeslaService) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isConfigSelected = this.configuredTeslaService.isTypeConfigSelected();

    if (isConfigSelected) {
      return true;
    }

    return false
  }
}
