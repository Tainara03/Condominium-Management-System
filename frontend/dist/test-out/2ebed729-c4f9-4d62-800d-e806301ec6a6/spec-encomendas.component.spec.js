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

// angular:jit:template:src\app\pages\encomendas\encomendas.component.html
var encomendas_component_default;
var init_encomendas_component = __esm({
  "angular:jit:template:src\\app\\pages\\encomendas\\encomendas.component.html"() {
    encomendas_component_default = "<p>encomendas.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\encomendas\encomendas.component.css
var encomendas_component_default2;
var init_encomendas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\encomendas\\encomendas.component.css"() {
    encomendas_component_default2 = "/* src/app/pages/encomendas/encomendas.component.css */\n/*# sourceMappingURL=encomendas.component.css.map */\n";
  }
});

// src/app/pages/encomendas/encomendas.component.ts
var _a, EncomendasComponent;
var init_encomendas_component3 = __esm({
  "src/app/pages/encomendas/encomendas.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_encomendas_component();
    init_encomendas_component2();
    init_core();
    EncomendasComponent = (_a = class {
    }, __name(_a, "EncomendasComponent"), _a);
    EncomendasComponent = __decorate([
      Component({
        selector: "app-encomendas.component",
        imports: [],
        template: encomendas_component_default,
        styles: [encomendas_component_default2]
      })
    ], EncomendasComponent);
  }
});

// src/app/pages/encomendas/encomendas.component.spec.ts
var require_encomendas_component_spec = __commonJS({
  "src/app/pages/encomendas/encomendas.component.spec.ts"(exports) {
    init_testing();
    init_encomendas_component3();
    describe("EncomendasComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [EncomendasComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(EncomendasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_encomendas_component_spec();
//# sourceMappingURL=spec-encomendas.component.spec.js.map
