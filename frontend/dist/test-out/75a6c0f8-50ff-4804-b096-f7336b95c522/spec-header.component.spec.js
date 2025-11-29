import {
  HeaderComponent,
  init_header_component
} from "./chunk-KLWIBHC7.js";
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

// src/app/components/header/header.component.spec.ts
var require_header_component_spec = __commonJS({
  "src/app/components/header/header.component.spec.ts"(exports) {
    init_testing();
    init_header_component();
    describe("HeaderComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [HeaderComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_header_component_spec();
//# sourceMappingURL=spec-header.component.spec.js.map
