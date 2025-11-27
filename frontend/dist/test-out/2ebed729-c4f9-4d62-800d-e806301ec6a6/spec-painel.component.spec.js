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

// angular:jit:template:src\app\pages\painel\painel.component.html
var painel_component_default;
var init_painel_component = __esm({
  "angular:jit:template:src\\app\\pages\\painel\\painel.component.html"() {
    painel_component_default = "<p>painel.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\painel\painel.component.css
var painel_component_default2;
var init_painel_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\painel\\painel.component.css"() {
    painel_component_default2 = "/* src/app/pages/painel/painel.component.css */\n/*# sourceMappingURL=painel.component.css.map */\n";
  }
});

// src/app/pages/painel/painel.component.ts
var _a, PainelComponent;
var init_painel_component3 = __esm({
  "src/app/pages/painel/painel.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_painel_component();
    init_painel_component2();
    init_core();
    PainelComponent = (_a = class {
    }, __name(_a, "PainelComponent"), _a);
    PainelComponent = __decorate([
      Component({
        selector: "app-painel.component",
        imports: [],
        template: painel_component_default,
        styles: [painel_component_default2]
      })
    ], PainelComponent);
  }
});

// src/app/pages/painel/painel.component.spec.ts
var require_painel_component_spec = __commonJS({
  "src/app/pages/painel/painel.component.spec.ts"(exports) {
    init_testing();
    init_painel_component3();
    describe("PainelComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [PainelComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(PainelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_painel_component_spec();
//# sourceMappingURL=spec-painel.component.spec.js.map
