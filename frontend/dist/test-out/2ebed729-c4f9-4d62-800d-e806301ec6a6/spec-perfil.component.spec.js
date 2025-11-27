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
  __name
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\pages\perfil\perfil.component.html
var perfil_component_default;
var init_perfil_component = __esm({
  "angular:jit:template:src\\app\\pages\\perfil\\perfil.component.html"() {
    perfil_component_default = "<p>perfil.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\perfil\perfil.component.css
var perfil_component_default2;
var init_perfil_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\perfil\\perfil.component.css"() {
    perfil_component_default2 = "/* src/app/pages/perfil/perfil.component.css */\n/*# sourceMappingURL=perfil.component.css.map */\n";
  }
});

// src/app/pages/perfil/perfil.component.ts
var _a, PerfilComponent;
var init_perfil_component3 = __esm({
  "src/app/pages/perfil/perfil.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_perfil_component();
    init_perfil_component2();
    init_core();
    PerfilComponent = (_a = class {
    }, __name(_a, "PerfilComponent"), _a);
    PerfilComponent = __decorate([
      Component({
        selector: "app-perfil",
        imports: [],
        template: perfil_component_default,
        styles: [perfil_component_default2]
      })
    ], PerfilComponent);
  }
});

// src/app/pages/perfil/perfil.component.spec.ts
var require_perfil_component_spec = __commonJS({
  "src/app/pages/perfil/perfil.component.spec.ts"(exports) {
    init_testing();
    init_perfil_component3();
    describe("PerfilComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [PerfilComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(PerfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_perfil_component_spec();
//# sourceMappingURL=spec-perfil.component.spec.js.map
