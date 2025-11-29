import {
  FooterComponent,
  init_footer_component
} from "./chunk-BQTBXKLA.js";
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

// src/app/components/footer/footer.component.spec.ts
var require_footer_component_spec = __commonJS({
  "src/app/components/footer/footer.component.spec.ts"(exports) {
    init_testing();
    init_footer_component();
    describe("FooterComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [FooterComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_footer_component_spec();
//# sourceMappingURL=spec-footer.component.spec.js.map
