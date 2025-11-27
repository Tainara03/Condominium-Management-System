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

// angular:jit:template:src\app\pages\home\home.component.html
var home_component_default;
var init_home_component = __esm({
  "angular:jit:template:src\\app\\pages\\home\\home.component.html"() {
    home_component_default = "<p>home.component works!</p>\r\n";
  }
});

// angular:jit:style:src\app\pages\home\home.component.css
var home_component_default2;
var init_home_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\home\\home.component.css"() {
    home_component_default2 = "/* src/app/pages/home/home.component.css */\n/*# sourceMappingURL=home.component.css.map */\n";
  }
});

// src/app/pages/home/home.component.ts
var _a, HomeComponent;
var init_home_component3 = __esm({
  "src/app/pages/home/home.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_home_component();
    init_home_component2();
    init_core();
    HomeComponent = (_a = class {
    }, __name(_a, "HomeComponent"), _a);
    HomeComponent = __decorate([
      Component({
        selector: "app-home",
        imports: [],
        template: home_component_default,
        styles: [home_component_default2]
      })
    ], HomeComponent);
  }
});

// src/app/pages/home/home.component.spec.ts
var require_home_component_spec = __commonJS({
  "src/app/pages/home/home.component.spec.ts"(exports) {
    init_testing();
    init_home_component3();
    describe("HomeComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [HomeComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_home_component_spec();
//# sourceMappingURL=spec-home.component.spec.js.map
