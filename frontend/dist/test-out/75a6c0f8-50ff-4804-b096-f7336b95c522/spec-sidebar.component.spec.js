import {
  SidebarComponent,
  init_sidebar_component
} from "./chunk-XR5KLUOF.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-ORQR5QO4.js";
import "./chunk-EVNDHHUL.js";
import "./chunk-WMV5C3HC.js";
import "./chunk-CJXQ6SPB.js";
import "./chunk-BHR2WOUR.js";
import "./chunk-Q3HEFWR4.js";
import {
  TestBed,
  init_testing
} from "./chunk-Q6HBEQPX.js";
import {
  __async,
  __commonJS
} from "./chunk-SK4CH4QL.js";

// src/app/components/sidebar/sidebar.component.spec.ts
var require_sidebar_component_spec = __commonJS({
  "src/app/components/sidebar/sidebar.component.spec.ts"(exports) {
    init_testing();
    init_sidebar_component();
    init_testing2();
    describe("SidebarComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [SidebarComponent, RouterTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_sidebar_component_spec();
//# sourceMappingURL=spec-sidebar.component.spec.js.map
