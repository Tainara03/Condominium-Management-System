import {
  AuthService,
  init_auth_service
} from "./chunk-WMV5C3HC.js";
import {
  RouterLink,
  init_router
} from "./chunk-CJXQ6SPB.js";
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

// angular:jit:template:src\app\components\sidebar\sidebar.component.html
var sidebar_component_default;
var init_sidebar_component = __esm({
  "angular:jit:template:src\\app\\components\\sidebar\\sidebar.component.html"() {
    sidebar_component_default = `<div *ngIf="auth.isLoggedIn()" class="list-group" style="width: 200px;">\r
  <a class="list-group-item list-group-item-action" routerLink="/home">P\xE1gina Inicial</a>\r
  \r
  <a *ngIf="auth.userType() === 'admin'" class="list-group-item list-group-item-action" routerLink="/painel">Painel Administrador</a>\r
  \r
  <a *ngIf="auth.userType() === 'porteiro'" class="list-group-item list-group-item-action" routerLink="/encomendas">Cadastrar Encomendas</a>\r
  \r
  <a class="list-group-item list-group-item-action" routerLink="/cobrancas">Controle de Cobran\xE7as</a>\r
  <a class="list-group-item list-group-item-action" routerLink="/ocorrencias">Enviar Comunicados</a>\r
  <a class="list-group-item list-group-item-action" routerLink="/reservas">Reserva de \xC1reas</a>\r
  <a class="list-group-item list-group-item-action" routerLink="/perfil">Meu Perfil</a>\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\components\sidebar\sidebar.component.css
var sidebar_component_default2;
var init_sidebar_component2 = __esm({
  "angular:jit:style:src\\app\\components\\sidebar\\sidebar.component.css"() {
    sidebar_component_default2 = "/* src/app/components/sidebar/sidebar.component.css */\n.list-left {\n  width: 200px;\n  margin-left: 0;\n}\n.list-group-item-action {\n  cursor: pointer;\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n";
  }
});

// src/app/components/sidebar/sidebar.component.ts
var _a, SidebarComponent;
var init_sidebar_component3 = __esm({
  "src/app/components/sidebar/sidebar.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_sidebar_component();
    init_sidebar_component2();
    init_core();
    init_router();
    init_auth_service();
    init_common();
    SidebarComponent = (_a = class {
      auth;
      constructor(auth) {
        this.auth = auth;
      }
    }, __name(_a, "SidebarComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService }
    ], "ctorParameters")), _a);
    SidebarComponent = __decorate([
      Component({
        selector: "app-sidebar",
        imports: [RouterLink, NgIf],
        template: sidebar_component_default,
        styles: [sidebar_component_default2]
      })
    ], SidebarComponent);
  }
});

export {
  SidebarComponent,
  init_sidebar_component3 as init_sidebar_component
};
//# sourceMappingURL=chunk-XR5KLUOF.js.map
