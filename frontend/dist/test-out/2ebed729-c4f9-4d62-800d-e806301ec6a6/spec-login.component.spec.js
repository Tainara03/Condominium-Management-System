import {
  FormsModule,
  init_forms
} from "./chunk-ZVD7TF3F.js";
import {
  Router,
  init_router
} from "./chunk-CJXQ6SPB.js";
import "./chunk-BHR2WOUR.js";
import {
  AuthService,
  init_auth_service
} from "./chunk-NKA37ICP.js";
import {
  CommonModule,
  init_common
} from "./chunk-Q3HEFWR4.js";
import {
  Component,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-Q6HBEQPX.js";
import {
  __async,
  __commonJS,
  __esm,
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\pages\login\login.component.html
var login_component_default;
var init_login_component = __esm({
  "angular:jit:template:src\\app\\pages\\login\\login.component.html"() {
    login_component_default = `<div class="d-flex vh-100 justify-content-center align-items-center">\r
  <div class="card p-4 shadow-lg" style="max-width: 900px; width: 100%; margin-left: -150px !important;">\r
    <div class="row g-4 align-items-center">\r
\r
      <div class="col-md-6 d-flex justify-content-md-start justify-content-center">\r
        <img src="assets/logo-domus.png" alt="Logo Domus" class="img-fluid" style="max-height: 500px;">\r
      </div>\r
\r
      <div class="col-md-6">\r
        <h3 class="mb-4 text-center text-md-start">Sign In</h3>\r
\r
        <form (ngSubmit)="login()">\r
\r
          <div class="mb-3">\r
            <label for="username" class="form-label">Username</label>\r
            <input type="text" class="form-control" id="username" name="username" [(ngModel)]="username" placeholder="Enter your username" required>\r
          </div>\r
\r
          <div class="mb-3">\r
            <label for="password" class="form-label">Password</label>\r
            <input type="password" class="form-control" id="password" name="password" [(ngModel)]="password" placeholder="Enter your password" required>\r
          </div>\r
\r
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">\r
            <div class="form-check mb-2 mb-md-0">\r
              <input class="form-check-input" type="checkbox" id="rememberMe">\r
              <label class="form-check-label" for="rememberMe">\r
                Remember me\r
              </label>\r
            </div>\r
            <a href="#" class="text-decoration-none">Forgot password?</a>\r
          </div>\r
\r
          <button type="submit" class="btn btn-primary w-100">Login</button>\r
          \r
          <div *ngIf="loginMessage" class="alert mt-3" [ngClass]="{'alert-success': isSuccess, 'alert-danger': !isSuccess}">\r
            {{ loginMessage }}\r
          </div>\r
\r
        </form>\r
        <div class="text-center mt-3">\r
          New here? <a href="#" class="text-decoration-none fw-bold">Create an Account</a>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\pages\login\login.component.css
var login_component_default2;
var init_login_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\login\\login.component.css"() {
    login_component_default2 = "/* src/app/pages/login/login.component.css */\n/*# sourceMappingURL=login.component.css.map */\n";
  }
});

// src/app/pages/login/login.component.ts
var _a, LoginComponent;
var init_login_component3 = __esm({
  "src/app/pages/login/login.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_login_component();
    init_login_component2();
    init_core();
    init_forms();
    init_common();
    init_auth_service();
    init_router();
    LoginComponent = (_a = class {
      authService;
      router;
      username = "";
      password = "";
      loginMessage = "";
      isSuccess = false;
      constructor(authService, router) {
        this.authService = authService;
        this.router = router;
      }
      login() {
        const validUsername = "admin";
        const validPassword = "admin";
        this.loginMessage = "";
        if (this.username === validUsername && this.password === validPassword) {
          this.isSuccess = true;
          this.loginMessage = "Login realizado com sucesso! Redirecionando...";
          this.authService.loginAs("admin");
          console.log("Usu\xE1rio logado como:", this.authService.getUserType());
          this.router.navigate(["/home"]);
        } else {
          this.isSuccess = false;
          this.loginMessage = "Erro: Nome de usu\xE1rio ou senha inv\xE1lidos.";
          this.authService.logout();
        }
      }
    }, __name(_a, "LoginComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService },
      { type: Router }
    ], "ctorParameters")), _a);
    LoginComponent = __decorate([
      Component({
        selector: "app-login",
        standalone: true,
        imports: [FormsModule, CommonModule],
        template: login_component_default,
        styles: [login_component_default2]
      })
    ], LoginComponent);
  }
});

// src/app/pages/login/login.component.spec.ts
var require_login_component_spec = __commonJS({
  "src/app/pages/login/login.component.spec.ts"(exports) {
    init_testing();
    init_login_component3();
    describe("LoginComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [LoginComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_login_component_spec();
//# sourceMappingURL=spec-login.component.spec.js.map
