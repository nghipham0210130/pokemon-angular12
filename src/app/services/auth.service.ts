import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn: Boolean = false;
  user: User;
  countLikes: 0;
  countDislikes: 0;

  constructor() {}

  login(model: any) {
    if (model.name != "Lisa") {
        console.log("Username error");
        return false;
    }
    if (model.password != "123456") {
      console.log("Password error");
      return false;
    }
    this.isLoggedIn = true;
    const tempUser = {
     name: model.name,
     likes: this.countLikes || 0,
     dislikes: this.countDislikes || 0,
    };
    this.user = tempUser;
    return true;
  }
}
