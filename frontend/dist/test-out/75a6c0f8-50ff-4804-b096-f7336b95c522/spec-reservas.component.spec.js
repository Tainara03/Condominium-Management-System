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
    reservas_component_default = '<div class="container py-5">\r\n  <div class="row justify-content-center">\r\n    <div class="col-lg-10">\r\n\r\n      <div class="card shadow-lg border-0">\r\n        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r\n          <h4 class="mb-0">Agendar Reserva de \xC1rea Comum</h4>\r\n        </div>\r\n        <div class="card-body p-4 p-md-5">\r\n\r\n          <form>\r\n            <div class="row mb-4 g-3">\r\n              \r\n              <div class="col-md-4">\r\n                <label for="localSelect" class="form-label fw-bold">Local</label>\r\n                <select class="form-select" id="localSelect" aria-label="Sele\xE7\xE3o do Local" required>\r\n                  <option value="" disabled selected>Selecione a \xC1rea</option>\r\n                  <option value="1">Sal\xE3o de Festas Principal</option>\r\n                  <option value="2">Sal\xE3o Gourmet</option>\r\n                  <option value="3">Quadra Poliesportiva</option>\r\n                  <option value="4">Churrasqueira</option>\r\n                </select>\r\n              </div>\r\n\r\n              <div class="col-md-4">\r\n                <label for="dataInput" class="form-label fw-bold">Data</label>\r\n                <input type="date" class="form-control" id="dataInput" required>\r\n              </div>\r\n\r\n              <div class="col-md-4">\r\n                <label for="periodoSelect" class="form-label fw-bold">Per\xEDodo</label>\r\n                <select class="form-select" id="periodoSelect" aria-label="Sele\xE7\xE3o do Per\xEDodo" required>\r\n                  <option value="" disabled selected>Selecione o Bloco</option>\r\n                  <option value="1">Manh\xE3 (06:00 - 11:00)</option>\r\n                  <option value="2">Tarde (12:00 - 17:00)</option>\r\n                  <option value="3">Noite (18:00 - 23:00)</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class="row mb-4">\r\n                <div class="col-12">\r\n                    <div class="form-floating">\r\n                        <textarea \r\n                            class="form-control" \r\n                            placeholder="Deixe uma descri\xE7\xE3o aqui" \r\n                            id="floatingTextarea2" \r\n                            style="height: 100px"\r\n                        ></textarea>\r\n                        <label for="floatingTextarea2">Descri\xE7\xE3o (Opcional)</label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="d-grid mt-4">\r\n              <button class="btn btn-marrom btn-lg" type="submit">Solicitar Reserva</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>';
  }
});

// angular:jit:style:src\app\pages\reservas\reservas.component.css
var reservas_component_default2;
var init_reservas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\reservas\\reservas.component.css"() {
    reservas_component_default2 = "/* src/app/pages/reservas/reservas.component.css */\n.btn-marrom {\n  background-color: #FCAA60;\n  border-color: #FCAA60;\n  color: #FFF;\n}\n.btn-marrom:hover {\n  background-color: #e59950;\n  border-color: #e59950;\n}\n.btn-marrom:active,\n.btn-marrom:focus {\n  background-color: #d18844 !important;\n  border-color: #d18844 !important;\n  box-shadow: 0 0 0 0.25rem rgba(252, 170, 96, 0.5);\n}\n/*# sourceMappingURL=reservas.component.css.map */\n";
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
