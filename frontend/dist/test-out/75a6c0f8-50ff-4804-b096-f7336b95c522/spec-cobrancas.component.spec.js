import {
  AuthService,
  init_auth_service
} from "./chunk-WMV5C3HC.js";
import {
  RouterLink,
  init_router
} from "./chunk-CJXQ6SPB.js";
import "./chunk-BHR2WOUR.js";
import {
  FormsModule,
  init_forms
} from "./chunk-ZVD7TF3F.js";
import {
  CommonModule,
  init_common
} from "./chunk-Q3HEFWR4.js";
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
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\pages\cobrancas\cobrancas.component.html
var cobrancas_component_default;
var init_cobrancas_component = __esm({
  "angular:jit:template:src\\app\\pages\\cobrancas\\cobrancas.component.html"() {
    cobrancas_component_default = `<div class="container py-5">\r
  <div class="row justify-content-center">\r
    <div class="col-lg-10">\r
\r
      <div class="card shadow-lg border-0">\r
        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r
          <h4 class="mb-0">Controle de Cobran\xE7as</h4>\r
        </div>\r
        <div class="card-body px-4 py-3 py-md-4">\r
            \r
            <div class="row mb-4 g-3 align-items-end">\r
                \r
                <div class="col-md-2">\r
                    <label for="filtroBloco" class="form-label fw-bold">Bloco</label>\r
                    <select id="filtroBloco" class="form-select form-select-sm"\r
                            [(ngModel)]="filtros.bloco" (change)="aplicarFiltros()">\r
                        <option value="">Todos</option>\r
                        <option value="A">Bloco A</option>\r
                        <option value="B">Bloco B</option>\r
                    </select>\r
                </div>\r
                <div class="col-md-2">\r
                    <label for="filtroApto" class="form-label fw-bold">Apartamento</label>\r
                    <input type="text" id="filtroApto" class="form-control form-control-sm" placeholder="Ex: 101"\r
                           [(ngModel)]="filtros.apartamento" (input)="aplicarFiltros()">\r
                </div>\r
                <div class="col-md-2">\r
                    <label for="filtroStatus" class="form-label fw-bold">Status</label>\r
                    <select id="filtroStatus" class="form-select form-select-sm"\r
                            [(ngModel)]="filtros.status" (change)="aplicarFiltros()">\r
                        <option value="">Todos</option>\r
                        <option value="Pago">Pago</option>\r
                        <option value="Pendente">Pendente</option>\r
                        <option value="Atrasado">Atrasado</option>\r
                    </select>\r
                </div>\r
                <div class="col-md-6 d-flex justify-content-end align-items-end">\r
                  <button class="btn btn-sm btn-outline-secondary me-2" (click)="resetarFiltros()">Resetar Filtros</button>\r
                  <button \r
                      *ngIf="auth.userType() === 'admin'" \r
                      type="button" \r
                      class="btn btn-marrom btn-sm me-2" \r
                      routerLink="/cadastrar-cobrancas"> <i class="bi bi-plus-lg me-2"></i> Adicionar Cobran\xE7as\r
                  </button>\r
                </div>\r
                \r
            </div>\r
            <table class="table table-light table-striped table-hover">\r
                <thead>\r
                    <tr>\r
                        <th scope="col">Bloco</th>\r
                        <th scope="col">Apto</th>\r
                        <th scope="col">Data Lan\xE7.</th>\r
                        <th scope="col">Tipo</th>\r
                        <th scope="col">Valor</th>\r
                        <th scope="col">Vencimento</th>\r
                        <th scope="col">Status</th>\r
                        <th scope="col">Comprovante</th>\r
                    </tr>\r
                </thead>\r
                <tbody>\r
                    <tr *ngFor="let cobranca of cobrancasFiltradas"\r
                        [ngClass]="{\r
                            'bg-warning': cobranca.status === 'Pendente',\r
                            'bg-danger text-white': cobranca.status === 'Atrasado',\r
                            'bg-success-light': cobranca.status === 'Pago' \r
                        }">\r
                        \r
                        <td>{{ cobranca.bloco }}</td>\r
                        <td>{{ cobranca.apartamento }}</td>\r
                        <td>{{ cobranca.dataLancamento }}</td>\r
                        <td>{{ cobranca.tipoCobranca }}</td>\r
                        <td>{{ cobranca.valor }}</td>\r
                        <td>{{ cobranca.dataVencimento }}</td>\r
                        \r
                        <td>\r
                            <span class="fw-bold">{{ cobranca.status }}</span>\r
                        </td>\r
                        \r
                        <td>\r
                            <a [href]="cobranca.linkComprovante" class="btn btn-sm btn-outline-info" \r
                               [class.disabled]="cobranca.status !== 'Pago'">\r
                                {{ cobranca.status === 'Pago' ? 'Ver Doc' : '\u2014' }}\r
                            </a>\r
                        </td>\r
                    </tr>\r
                </tbody>\r
            </table>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\pages\cobrancas\cobrancas.component.css
var cobrancas_component_default2;
var init_cobrancas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\cobrancas\\cobrancas.component.css"() {
    cobrancas_component_default2 = "/* src/app/pages/cobrancas/cobrancas.component.css */\n.btn-marrom {\n  background-color: #FCAA60;\n  border-color: #FCAA60;\n  color: #FFF;\n}\n.btn-marrom:hover {\n  background-color: #e59950;\n  border-color: #e59950;\n}\n.card-fixed-height {\n  max-height: 80vh;\n  width: 100%;\n}\n.fixed-height-content {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n}\n.fixed-height-content table {\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=cobrancas.component.css.map */\n";
  }
});

// src/app/pages/cobrancas/cobrancas.component.ts
var _a, CobrancasComponent;
var init_cobrancas_component3 = __esm({
  "src/app/pages/cobrancas/cobrancas.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_cobrancas_component();
    init_cobrancas_component2();
    init_core();
    init_common();
    init_forms();
    init_auth_service();
    init_router();
    CobrancasComponent = (_a = class {
      auth;
      cobrancas = [];
      cobrancasFiltradas = [];
      filtros = {
        bloco: "",
        apartamento: "",
        status: ""
      };
      constructor(auth) {
        this.auth = auth;
      }
      ngOnInit() {
        this.carregarCobrancas();
      }
      carregarCobrancas() {
        const dadosIniciais = [
          { bloco: "A", apartamento: "101", dataLancamento: "28/11/2025", tipoCobranca: "Condom\xEDnio", valor: "R$350,00", dataVencimento: "28/12/2025", status: "Pendente", linkComprovante: "#" },
          { bloco: "B", apartamento: "203", dataLancamento: "28/10/2025", tipoCobranca: "\xC1gua", valor: "R$85,50", dataVencimento: "10/11/2025", status: "Pago", linkComprovante: "#" },
          { bloco: "A", apartamento: "101", dataLancamento: "28/09/2025", tipoCobranca: "Multa", valor: "R$150,00", dataVencimento: "05/10/2025", status: "Atrasado", linkComprovante: "#" },
          { bloco: "B", apartamento: "203", dataLancamento: "28/11/2025", tipoCobranca: "Condom\xEDnio", valor: "R$400,00", dataVencimento: "28/12/2025", status: "Pendente", linkComprovante: "#" }
        ];
        this.cobrancas = dadosIniciais;
        this.aplicarFiltros();
      }
      aplicarFiltros() {
        let tempCobrancas = this.cobrancas;
        if (this.filtros.bloco) {
          tempCobrancas = tempCobrancas.filter((c) => c.bloco === this.filtros.bloco);
        }
        if (this.filtros.apartamento) {
          const apto = this.filtros.apartamento;
          tempCobrancas = tempCobrancas.filter((c) => c.apartamento.includes(apto));
        }
        if (this.filtros.status) {
          tempCobrancas = tempCobrancas.filter((c) => c.status === this.filtros.status);
        }
        this.cobrancasFiltradas = tempCobrancas;
      }
      resetarFiltros() {
        this.filtros = { bloco: "", apartamento: "", status: "" };
        this.aplicarFiltros();
      }
    }, __name(_a, "CobrancasComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService }
    ], "ctorParameters")), _a);
    CobrancasComponent = __decorate([
      Component({
        selector: "app-cobrancas",
        standalone: true,
        imports: [CommonModule, FormsModule, RouterLink],
        template: cobrancas_component_default,
        styles: [cobrancas_component_default2]
      })
    ], CobrancasComponent);
  }
});

// src/app/pages/cobrancas/cobrancas.component.spec.ts
var require_cobrancas_component_spec = __commonJS({
  "src/app/pages/cobrancas/cobrancas.component.spec.ts"(exports) {
    init_testing();
    init_cobrancas_component3();
    describe("CobrancasComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CobrancasComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CobrancasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_cobrancas_component_spec();
//# sourceMappingURL=spec-cobrancas.component.spec.js.map
