import {
  FooterComponent,
  init_footer_component
} from "./chunk-3CV7IPAV.js";
import {
  HeaderComponent,
  init_header_component
} from "./chunk-I2R5SIIA.js";
import {
  RouterTestingModule,
  SidebarComponent,
  init_sidebar_component,
  init_testing as init_testing2
} from "./chunk-XTPLW7W4.js";
import "./chunk-EVNDHHUL.js";
import {
  FormsModule,
  init_forms
} from "./chunk-ZVD7TF3F.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-CJXQ6SPB.js";
import "./chunk-BHR2WOUR.js";
import "./chunk-NKA37ICP.js";
import "./chunk-Q3HEFWR4.js";
import {
  Component,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6,
  signal
} from "./chunk-Q6HBEQPX.js";
import {
  __async,
  __commonJS,
  __esm,
  __name
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src\\app\\app.html"() {
    app_default = '<app-header></app-header>\r\n\r\n<div class="main-container d-flex">\r\n  <app-sidebar class="flex-shrink-0"></app-sidebar>\r\n  <div class="content flex-grow-1">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n\r\n<app-footer></app-footer>\r\n';
  }
});

// angular:jit:style:src\app\app.css
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src\\app\\app.css"() {
    app_default2 = "/* src/app/app.css */\n.main-container {\n  display: flex;\n  min-height: calc(100vh - 100px);\n}\napp-sidebar {\n  width: 250px;\n}\n.content {\n  padding: 20px;\n  flex-grow: 1;\n}\n/*# sourceMappingURL=app.css.map */\n";
  }
});

// src/app/app.ts
var _a, App;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_forms();
    init_header_component();
    init_sidebar_component();
    init_footer_component();
    App = (_a = class {
      title = signal("Condominium-Management-System");
    }, __name(_a, "App"), _a);
    App = __decorate([
      Component({
        selector: "app-root",
        imports: [RouterOutlet, FormsModule, HeaderComponent, SidebarComponent, FooterComponent],
        template: app_default,
        styles: [app_default2]
      })
    ], App);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_testing();
    init_app3();
    init_testing2();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App, RouterTestingModule]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app.spec.js.map
