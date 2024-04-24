import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginResponseType} from "../types/login-response.type";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}
  login(login: string, password: string) {
    return this.http.post<LoginResponseType>("http://localhost:8080/auth/login",{login, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      })
    );
  }
}
