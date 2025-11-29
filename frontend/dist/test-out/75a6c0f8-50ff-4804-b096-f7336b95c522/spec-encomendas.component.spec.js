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
    encomendas_component_default = '<div class="container py-5">\r\n  <div class="row justify-content-center">\r\n    <div class="col-lg-10">\r\n\r\n      <div class="card shadow-lg border-0">\r\n        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r\n          <h4 class="mb-0">Cadastrar Encomendas</h4>\r\n        </div>\r\n        <div class="card-body p-4 p-md-5">\r\n\r\n          <form>\r\n            <div class="row mb-4 g-3">\r\n              \r\n              <div class="col-md-4">\r\n                <label for="blocoSelect" class="form-label fw-bold">Bloco</label>\r\n                <select class="form-select" id="blocoSelect" aria-label="Sele\xE7\xE3o do Bloco" required>\r\n                  <option value="" disabled selected>Selecione o Bloco</option>\r\n                  <option value="A">Bloco A</option>\r\n                  <option value="B">Bloco B</option>\r\n                  <option value="C">Bloco C</option>\r\n                  <option value="D">Bloco D</option>\r\n                </select>\r\n              </div>\r\n\r\n              <div class="col-md-4">\r\n                <label for="unidadeSelect" class="form-label fw-bold">Apartamento</label>\r\n                <select class="form-select" id="unidadeSelect" aria-label="Sele\xE7\xE3o da Unidade" required>\r\n                  <option value="" disabled selected>Selecione o Apto</option>\r\n                  <option value="101">101</option>\r\n                  <option value="102">102</option>\r\n                  <option value="201">201</option>\r\n                  <option value="304">304</option>\r\n                  <option value="402">402</option>\r\n                </select>\r\n              </div>\r\n\r\n              <div class="col-md-4">\r\n                <label for="dataHoraInput" class="form-label fw-bold">Data e Hora de Chegada</label>\r\n                <input type="datetime-local" class="form-control" id="dataHoraInput" required>\r\n              </div>\r\n            </div>\r\n            \r\n            <div class="row mb-4">\r\n                <div class="col-12">\r\n                    <div class="form-floating">\r\n                        <textarea \r\n                            class="form-control" \r\n                            placeholder="Descreva o tipo de encomenda (Ex: Caixa grande da Amazon, Envelope)" \r\n                            id="floatingTextarea2" \r\n                            style="height: 100px"\r\n                            required\r\n                        ></textarea>\r\n                        <label for="floatingTextarea2">Tipo de Encomenda / Descri\xE7\xE3o</label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="d-grid mt-4">\r\n              <button class="btn btn-marrom btn-lg" type="submit">Registrar Encomenda</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>';
  }
});

// angular:jit:style:src\app\pages\encomendas\encomendas.component.css
var encomendas_component_default2;
var init_encomendas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\encomendas\\encomendas.component.css"() {
    encomendas_component_default2 = "/* src/app/pages/encomendas/encomendas.component.css */\n.btn-marrom {\n  background-color: #FCAA60;\n  border-color: #FCAA60;\n  color: #FFF;\n}\n.btn-marrom:hover {\n  background-color: #e59950;\n  border-color: #e59950;\n}\n.btn-marrom:active,\n.btn-marrom:focus {\n  background-color: #d18844 !important;\n  border-color: #d18844 !important;\n  box-shadow: 0 0 0 0.25rem rgba(252, 170, 96, 0.5);\n}\n/*# sourceMappingURL=encomendas.component.css.map */\n";
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
        selector: "app-encomendas",
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
