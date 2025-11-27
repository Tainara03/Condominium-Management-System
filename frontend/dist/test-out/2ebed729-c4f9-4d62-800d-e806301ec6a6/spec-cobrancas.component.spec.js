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

// angular:jit:template:src\app\pages\cobrancas\cobrancas.component.html
var cobrancas_component_default;
var init_cobrancas_component = __esm({
  "angular:jit:template:src\\app\\pages\\cobrancas\\cobrancas.component.html"() {
    cobrancas_component_default = "<p>cobrancas.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\cobrancas\cobrancas.component.css
var cobrancas_component_default2;
var init_cobrancas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\cobrancas\\cobrancas.component.css"() {
    cobrancas_component_default2 = "/* src/app/pages/cobrancas/cobrancas.component.css */\n/*# sourceMappingURL=cobrancas.component.css.map */\n";
  }
});

// src/app/pages/cobrancas/cobrancas.component.ts
var _a, CobrancasComponent;
var init_cobrancas_component3 = __esm({
  "src/app/pages/cobrancas/cobrancas.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_cobrancas_component();
    init_cobrancas_component2();
    init_core();
    CobrancasComponent = (_a = class {
    }, __name(_a, "CobrancasComponent"), _a);
    CobrancasComponent = __decorate([
      Component({
        selector: "app-cobrancas",
        imports: [],
        template: cobrancas_component_default,
        styles: [cobrancas_component_default2]
      })
    ], CobrancasComponent);
  }
});

// src/app/pages/cobrancas/cobrancas.component.spec.ts
var require_cobrancas_component_spec = __commonJS({
  "src/app/pages/cobrancas/cobrancas.component.spec.ts"(exports) {
    init_testing();
    init_cobrancas_component3();
    describe("CobrancasComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CobrancasComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CobrancasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_cobrancas_component_spec();
//# sourceMappingURL=spec-cobrancas.component.spec.js.map
