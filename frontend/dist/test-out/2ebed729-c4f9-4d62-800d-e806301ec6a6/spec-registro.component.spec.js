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

// angular:jit:template:src\app\pages\registro\registro.component.html
var registro_component_default;
var init_registro_component = __esm({
  "angular:jit:template:src\\app\\pages\\registro\\registro.component.html"() {
    registro_component_default = "<p>registro.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\registro\registro.component.css
var registro_component_default2;
var init_registro_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\registro\\registro.component.css"() {
    registro_component_default2 = "/* src/app/pages/registro/registro.component.css */\n/*# sourceMappingURL=registro.component.css.map */\n";
  }
});

// src/app/pages/registro/registro.component.ts
var _a, RegistroComponent;
var init_registro_component3 = __esm({
  "src/app/pages/registro/registro.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_registro_component();
    init_registro_component2();
    init_core();
    RegistroComponent = (_a = class {
    }, __name(_a, "RegistroComponent"), _a);
    RegistroComponent = __decorate([
      Component({
        selector: "app-registro.component",
        imports: [],
        template: registro_component_default,
        styles: [registro_component_default2]
      })
    ], RegistroComponent);
  }
});

// src/app/pages/registro/registro.component.spec.ts
var require_registro_component_spec = __commonJS({
  "src/app/pages/registro/registro.component.spec.ts"(exports) {
    init_testing();
    init_registro_component3();
    describe("RegistroComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [RegistroComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(RegistroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_registro_component_spec();
//# sourceMappingURL=spec-registro.component.spec.js.map
