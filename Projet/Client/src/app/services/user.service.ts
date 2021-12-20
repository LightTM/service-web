import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class UserService extends BaseHttpService {
  public getAll(): Observable<User[]> {
    /*To be implemented*/
    return this.http
    .get<User[]>(`${this.baseUrl}/Users`);  }
}
