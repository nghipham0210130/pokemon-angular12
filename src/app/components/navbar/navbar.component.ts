import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "navbar",
  template: `
    <nav>
      <h4>Pokemon v{{ version }}</h4>
      <button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
        I am {{ currentUser?.name }}, and I like {{ currentUser?.likes }} and
        dislike {{ currentUser?.dislikes }} pokemons / Log Out
      </button>
      <ng-template #notLoggedIn>
      <form *ngIf="!isLoggedIn" [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">
            <input
              type="text"
              id="name"
              formControlName="name"
              class="form-control"
              placeholder="Name"
              required
            />
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-control"
              placeholder="Password"
              required
            />
          <button type="submit" class="btn" [disabled]="!loginForm.valid">
            Login
          </button>
        </form>
      </ng-template>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: hotpink;
        color: white;
      }

      h4 {
        margin: 0;
        font-size: 2rem;
      }

      button {
        background: transparent;
        outline: none;
        border: 1px solid;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-family: "Source Sans Pro";
      }

      input {
        margin-right: 10px;
        padding: 9px;
        border-radius: 5px;
        color: rgb( 0, 0, 0);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  version = VERSION.full;
  currentUser: User;
  isLoggedIn: Boolean;

  loginForm = new FormGroup({
    name: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private authService: AuthService,
    private fb : FormBuilder ) {}

  ngOnInit(): void {}

  logOut() {
    // TODO: Please replace with a service call
    this.isLoggedIn = false;

  }

  submitForm() {
    // TODO: Please replace with a service call
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(data) {
    const succesLogin = this.authService.login(data);
    if ( succesLogin ) {
      this.isLoggedIn = true;
      this.currentUser = this.authService.user;
      this.loginForm.reset();
    }
  }
}
