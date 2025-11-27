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

// angular:jit:template:src\app\pages\ocorrencias\ocorrencias.component.html
var ocorrencias_component_default;
var init_ocorrencias_component = __esm({
  "angular:jit:template:src\\app\\pages\\ocorrencias\\ocorrencias.component.html"() {
    ocorrencias_component_default = "<p>ocorrencias.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\ocorrencias\ocorrencias.component.css
var ocorrencias_component_default2;
var init_ocorrencias_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\ocorrencias\\ocorrencias.component.css"() {
    ocorrencias_component_default2 = "/* src/app/pages/ocorrencias/ocorrencias.component.css */\n/*# sourceMappingURL=ocorrencias.component.css.map */\n";
  }
});

// src/app/pages/ocorrencias/ocorrencias.component.ts
var _a, OcorrenciasComponent;
var init_ocorrencias_component3 = __esm({
  "src/app/pages/ocorrencias/ocorrencias.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_ocorrencias_component();
    init_ocorrencias_component2();
    init_core();
    OcorrenciasComponent = (_a = class {
    }, __name(_a, "OcorrenciasComponent"), _a);
    OcorrenciasComponent = __decorate([
      Component({
        selector: "app-ocorrencias",
        imports: [],
        template: ocorrencias_component_default,
        styles: [ocorrencias_component_default2]
      })
    ], OcorrenciasComponent);
  }
});

// src/app/pages/ocorrencias/ocorrencias.component.spec.ts
var require_ocorrencias_component_spec = __commonJS({
  "src/app/pages/ocorrencias/ocorrencias.component.spec.ts"(exports) {
    init_testing();
    init_ocorrencias_component3();
    describe("OcorrenciasComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [OcorrenciasComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(OcorrenciasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_ocorrencias_component_spec();
//# sourceMappingURL=spec-ocorrencias.component.spec.js.map
