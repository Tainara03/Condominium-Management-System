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
    ocorrencias_component_default = '<div class="container py-5">\r\n  <div class="row justify-content-center">\r\n    <div class="col-lg-10">\r\n\r\n      <div class="card shadow-lg border-0">\r\n        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r\n          <h4 class="mb-0">Enviar Comunicado</h4>\r\n        </div>\r\n        <div class="card-body p-4 p-md-5">\r\n\r\n          <form>\r\n            <div class="row mb-4 g-3">\r\n              \r\n              <div class="col-md-8">\r\n                <label for="tituloInput" class="form-label fw-bold">T\xEDtulo do Assunto</label>\r\n                <input type="text" class="form-control" id="tituloInput" placeholder="Ex: Vazamento no Bloco B" required>\r\n              </div>\r\n\r\n              <div class="col-md-4">\r\n                <label for="dataInput" class="form-label fw-bold">Data da Ocorr\xEAncia</label>\r\n                <input type="date" class="form-control" id="dataInput" required>\r\n              </div>\r\n\r\n              </div>\r\n\r\n            <div class="row mb-4">\r\n              <div class="col-12">\r\n                <div class="form-floating">\r\n                  <textarea \r\n                    class="form-control" \r\n                    placeholder="Descreva detalhadamente o ocorrido ou sua solicita\xE7\xE3o." \r\n                    id="floatingTextareaMensagem" \r\n                    style="height: 150px"\r\n                    required\r\n                  ></textarea>\r\n                  <label for="floatingTextareaMensagem">Mensagem / Detalhes</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class="d-grid mt-4">\r\n              <button class="btn btn-marrom btn-lg" type="submit">Enviar Comunicado</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>';
  }
});

// angular:jit:style:src\app\pages\ocorrencias\ocorrencias.component.css
var ocorrencias_component_default2;
var init_ocorrencias_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\ocorrencias\\ocorrencias.component.css"() {
    ocorrencias_component_default2 = "/* src/app/pages/ocorrencias/ocorrencias.component.css */\n.btn-marrom {\n  background-color: #FCAA60;\n  border-color: #FCAA60;\n  color: #FFF;\n}\n.btn-marrom:hover {\n  background-color: #e59950;\n  border-color: #e59950;\n}\n.btn-marrom:active,\n.btn-marrom:focus {\n  background-color: #d18844 !important;\n  border-color: #d18844 !important;\n  box-shadow: 0 0 0 0.25rem rgba(252, 170, 96, 0.5);\n}\n/*# sourceMappingURL=ocorrencias.component.css.map */\n";
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
