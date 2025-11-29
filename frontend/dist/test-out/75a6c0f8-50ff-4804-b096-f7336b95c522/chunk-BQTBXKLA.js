import {
  AuthService,
  init_auth_service
} from "./chunk-WMV5C3HC.js";
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

// angular:jit:template:src\app\components\footer\footer.component.html
var footer_component_default;
var init_footer_component = __esm({
  "angular:jit:template:src\\app\\components\\footer\\footer.component.html"() {
    footer_component_default = '<footer *ngIf="auth.isLoggedIn()" class="custom-footer text-white text-center py-3">\r\n\xA0 &copy; 2025 Condominium Management System. Todos os direitos reservados.\r\n</footer>';
  }
});

// angular:jit:style:src\app\components\footer\footer.component.css
var footer_component_default2;
var init_footer_component2 = __esm({
  "angular:jit:style:src\\app\\components\\footer\\footer.component.css"() {
    footer_component_default2 = "/* src/app/components/footer/footer.component.css */\n.custom-footer {\n  background-color: #824F31;\n}\n/*# sourceMappingURL=footer.component.css.map */\n";
  }
});

// src/app/components/footer/footer.component.ts
var _a, FooterComponent;
var init_footer_component3 = __esm({
  "src/app/components/footer/footer.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_footer_component();
    init_footer_component2();
    init_core();
    init_auth_service();
    init_common();
    FooterComponent = (_a = class {
      auth;
      constructor(auth) {
        this.auth = auth;
      }
    }, __name(_a, "FooterComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService }
    ], "ctorParameters")), _a);
    FooterComponent = __decorate([
      Component({
        selector: "app-footer",
        imports: [NgIf],
        template: footer_component_default,
        styles: [footer_component_default2]
      })
    ], FooterComponent);
  }
});

export {
  FooterComponent,
  init_footer_component3 as init_footer_component
};
//# sourceMappingURL=chunk-BQTBXKLA.js.map
