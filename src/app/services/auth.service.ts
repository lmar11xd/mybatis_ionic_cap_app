import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpOptions } from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public eventSession: EventEmitter<boolean> = new EventEmitter<boolean>();
  private endPoint: string = environment.endPoint;
  private _registerUrl: string = this.endPoint + "/users";
  private _loginUrl: string = this.endPoint + "/auth/login";

  constructor(private http: HttpClient) { }

  registerUser(userEntry: User): Observable<User> {
    return this.http.post<User>(this._registerUrl, userEntry);
  }

  loginUser(loginEntry: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, loginEntry);
  }

  doRegisterUser(userEntry: User) {
    const url = this._registerUrl;
    const options: HttpOptions = {
      url,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(userEntry)
    }
    return from (Http.post(options));
  }

  doLoginUser(userEntry: any) {
    const url = this._loginUrl;
    const options: HttpOptions = {
      url,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(userEntry)
    }
    return from (Http.post(options));
  }

  logout() {
    this.eventSession.emit(false);
  }
}
