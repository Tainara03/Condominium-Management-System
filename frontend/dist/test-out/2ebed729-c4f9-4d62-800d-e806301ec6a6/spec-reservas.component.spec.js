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

// angular:jit:template:src\app\pages\reservas\reservas.component.html
var reservas_component_default;
var init_reservas_component = __esm({
  "angular:jit:template:src\\app\\pages\\reservas\\reservas.component.html"() {
    reservas_component_default = "<p>reservas.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\reservas\reservas.component.css
var reservas_component_default2;
var init_reservas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\reservas\\reservas.component.css"() {
    reservas_component_default2 = "/* src/app/pages/reservas/reservas.component.css */\n/*# sourceMappingURL=reservas.component.css.map */\n";
  }
});

// src/app/pages/reservas/reservas.component.ts
var _a, ReservasComponent;
var init_reservas_component3 = __esm({
  "src/app/pages/reservas/reservas.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_reservas_component();
    init_reservas_component2();
    init_core();
    ReservasComponent = (_a = class {
    }, __name(_a, "ReservasComponent"), _a);
    ReservasComponent = __decorate([
      Component({
        selector: "app-reservas",
        imports: [],
        template: reservas_component_default,
        styles: [reservas_component_default2]
      })
    ], ReservasComponent);
  }
});

// src/app/pages/reservas/reservas.component.spec.ts
var require_reservas_component_spec = __commonJS({
  "src/app/pages/reservas/reservas.component.spec.ts"(exports) {
    init_testing();
    init_reservas_component3();
    describe("ReservasComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ReservasComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ReservasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_reservas_component_spec();
//# sourceMappingURL=spec-reservas.component.spec.js.map
