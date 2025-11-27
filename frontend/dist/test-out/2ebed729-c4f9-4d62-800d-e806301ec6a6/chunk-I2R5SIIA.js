import {
  RouterLink,
  init_router
} from "./chunk-CJXQ6SPB.js";
import {
  AuthService,
  init_auth_service
} from "./chunk-NKA37ICP.js";
import {
  NgIf,
  init_common
} from "./chunk-Q3HEFWR4.js";
import {
  Component,
  __decorate,
  init_core,
  init_tslib_es6
} from "./chunk-Q6HBEQPX.js";
import {
  __esm,
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\components\header\header.component.html
var header_component_default;
var init_header_component = __esm({
  "angular:jit:template:src\\app\\components\\header\\header.component.html"() {
    header_component_default = '<nav *ngIf="auth.isLoggedIn()" class="navbar custom-navbar">\r\n  <div class="container-fluid">\r\n    <a class="navbar-brand d-flex align-items-center" routerLink="/home">\r\n      <img src="assets/logo-domus.png" alt="Logo" style="height: 60px; width: auto;" class="me-2">\r\n      <span class="fw-bold">Domus</span>\r\n    </a>\r\n  </div>\r\n</nav>';
  }
});

// angular:jit:style:src\app\components\header\header.component.css
var header_component_default2;
var init_header_component2 = __esm({
  "angular:jit:style:src\\app\\components\\header\\header.component.css"() {
    header_component_default2 = '/* src/app/components/header/header.component.css */\n.custom-navbar {\n  background-color: #824F31;\n}\nspan {\n  color: #FCAA60;\n  font-family:\n    "Comic Sans MS",\n    "Kristen ITC",\n    cursive,\n    sans-serif;\n  font-size: 2.5rem;\n}\n/*# sourceMappingURL=header.component.css.map */\n';
  }
});

// src/app/components/header/header.component.ts
var _a, HeaderComponent;
var init_header_component3 = __esm({
  "src/app/components/header/header.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_header_component();
    init_header_component2();
    init_core();
    init_auth_service();
    init_common();
    init_router();
    HeaderComponent = (_a = class {
      auth;
      constructor(auth) {
        this.auth = auth;
      }
    }, __name(_a, "HeaderComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService }
    ], "ctorParameters")), _a);
    HeaderComponent = __decorate([
      Component({
        selector: "app-header",
        imports: [NgIf, RouterLink],
        template: header_component_default,
        styles: [header_component_default2]
      })
    ], HeaderComponent);
  }
});

export {
  HeaderComponent,
  init_header_component3 as init_header_component
};
//# sourceMappingURL=chunk-I2R5SIIA.js.map
