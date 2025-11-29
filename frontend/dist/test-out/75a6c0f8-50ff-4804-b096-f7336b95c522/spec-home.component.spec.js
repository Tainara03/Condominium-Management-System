import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-ORQR5QO4.js";
import "./chunk-EVNDHHUL.js";
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
  init_tslib_es6,
  signal
} from "./chunk-Q6HBEQPX.js";
import {
  __async,
  __commonJS,
  __esm,
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\pages\home\home.component.html
var home_component_default;
var init_home_component = __esm({
  "angular:jit:template:src\\app\\pages\\home\\home.component.html"() {
    home_component_default = `<div class="container py-5">\r
  <div class="row justify-content-center">\r
    <div class="col-lg-8">\r
\r
      <div class="card shadow-lg border-0">\r
        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r
          <h4 class="mb-0">Central de Notifica\xE7\xF5es e Hist\xF3rico</h4>\r
        </div>\r
        <div class="card-body p-4">\r
            \r
            <div class="d-flex justify-content-between mb-4">\r
                <select class="form-select form-select-sm w-auto" [(ngModel)]="filtroTipo" (change)="aplicarFiltros()">\r
                    <option value="">Todos os Tipos</option>\r
                    <option value="COBRANCA">Cobran\xE7as</option>\r
                    <option value="ENCOMENDA">Encomendas</option>\r
                    <option value="OCORRENCIA">Ocorr\xEAncias</option>\r
                    <option value="RESERVA">Reservas</option>\r
                </select>\r
            </div>\r
            \r
            <div *ngIf="eventosFiltrados.length > 0; else feedVazio" class="list-group list-group-flush">\r
                \r
                <div *ngFor="let evento of eventosFiltrados" \r
                     class="list-group-item list-group-item-action d-flex align-items-start py-3"\r
                     [ngClass]="getCardStyle(evento.tipo)">\r
\r
                    <i [ngClass]="getIcone(evento.tipo)" class="fs-4 me-3 mt-1"></i>\r
\r
                    <div class="w-100">\r
                        <div class="d-flex w-100 justify-content-between">\r
                            <h6 class="mb-1 fw-bold">{{ getTitulo(evento) }}</h6>\r
                            <small class="text-muted">{{ evento.data | date:'short' }}</small>\r
                        </div>\r
                        <p class="mb-1 small">{{ evento.mensagem }}</p>\r
                        \r
                        <a [routerLink]="getLink(evento.tipo)" class="btn btn-sm btn-link p-0 pt-1">\r
                            Ver Detalhes\r
                        </a>\r
                    </div>\r
                </div>\r
\r
            </div>\r
            \r
            <ng-template #feedVazio>\r
                <div class="alert alert-info text-center mt-3">\r
                    Nenhuma atividade encontrada para os filtros atuais.\r
                </div>\r
            </ng-template>\r
\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\pages\home\home.component.css
var home_component_default2;
var init_home_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\home\\home.component.css"() {
    home_component_default2 = "/* src/app/pages/home/home.component.css */\n.text-bg-warning {\n  background-color: #ffc107 !important;\n  color: #664d03 !important;\n}\n.text-bg-danger {\n  background-color: #dc3545 !important;\n  color: #fff !important;\n}\n.text-bg-info {\n  background-color: #0dcaf0 !important;\n  color: #055160 !important;\n}\n.text-bg-success {\n  background-color: #d1e7dd !important;\n  color: #0f5132 !important;\n}\n.card .card-text {\n  color: inherit;\n}\n/*# sourceMappingURL=home.component.css.map */\n";
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
    init_common();
    init_forms();
    init_router();
    HomeComponent = (_a = class {
      eventos = [];
      eventosFiltrados = [];
      filtroTipo = "";
      constructor() {
      }
      ngOnInit() {
        this.carregarEventosSimulados();
        this.aplicarFiltros();
      }
      carregarEventosSimulados() {
        this.eventos = [
          { id: 1, tipo: "COBRANCA", data: /* @__PURE__ */ new Date(), statusDetalhe: "Pendente", mensagem: "Condom\xEDnio referente a Dezembro/2025. Vencimento em 28/12.", bloco: "A", apto: "101" },
          { id: 2, tipo: "ENCOMENDA", data: new Date(Date.now() - 36e5), statusDetalhe: "Na Portaria", mensagem: "Nova caixa registrada na portaria para Bloco B, Apto 201.", bloco: "B", apto: "201" },
          { id: 3, tipo: "RESERVA", data: new Date(Date.now() - 72e5), statusDetalhe: "Aprovada", mensagem: "Sua reserva para o Sal\xE3o de Festas (Noite) foi aprovada.", bloco: "A", apto: "101" },
          { id: 4, tipo: "OCORRENCIA", data: new Date(Date.now() - 108e5), statusDetalhe: "Em An\xE1lise", mensagem: "Nova reclama\xE7\xE3o registrada: Barulho excessivo vindo do vizinho.", bloco: "B", apto: "201" },
          { id: 5, tipo: "CADASTRO", data: new Date(Date.now() - 864e5), statusDetalhe: "Pendente", mensagem: "Novo morador cadastrado aguardando aprova\xE7\xE3o de v\xEDnculo.", bloco: "C", apto: "304" }
        ];
      }
      aplicarFiltros() {
        let tempEventos = this.eventos;
        if (this.filtroTipo) {
          tempEventos = tempEventos.filter((e) => e.tipo === this.filtroTipo);
        }
        this.eventosFiltrados = tempEventos;
      }
      getTitulo(evento) {
        const prefixo = evento.statusDetalhe ? `[${evento.statusDetalhe}] ` : "";
        switch (evento.tipo) {
          case "COBRANCA":
            return prefixo + "Nova Cobran\xE7a Lan\xE7ada";
          case "ENCOMENDA":
            return prefixo + "Encomenda Chegou!";
          case "RESERVA":
            return prefixo + "Atualiza\xE7\xE3o de Reserva";
          case "OCORRENCIA":
            return prefixo + "Ocorr\xEAncia Registrada";
          case "CADASTRO":
            return prefixo + "Novo Cadastro de Usu\xE1rio";
          default:
            return "Nova Atividade";
        }
      }
      getIcone(tipo) {
        switch (tipo) {
          case "COBRANCA":
            return "bi bi-cash-stack text-success";
          case "ENCOMENDA":
            return "bi bi-box-seam text-info";
          case "RESERVA":
            return "bi bi-calendar-check text-primary";
          case "OCORRENCIA":
            return "bi bi-exclamation-triangle text-warning";
          case "CADASTRO":
            return "bi bi-person-fill-add text-danger";
          default:
            return "bi bi-bell";
        }
      }
      getCardStyle(tipo) {
        switch (tipo) {
          case "COBRANCA":
            return "list-group-item-success";
          case "ENCOMENDA":
            return "list-group-item-info";
          case "OCORRENCIA":
            return "list-group-item-warning";
          case "CADASTRO":
            return "list-group-item-danger";
          default:
            return "";
        }
      }
      getLink(tipo) {
        switch (tipo) {
          case "COBRANCA":
            return "/cobrancas";
          case "ENCOMENDA":
            return "/encomendas";
          case "RESERVA":
            return "/reservas";
          case "OCORRENCIA":
            return "/ocorrencias";
          case "CADASTRO":
            return "/painel";
          default:
            return "/";
        }
      }
    }, __name(_a, "HomeComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [], "ctorParameters")), _a);
    HomeComponent = __decorate([
      Component({
        selector: "app-home",
        standalone: true,
        imports: [CommonModule, FormsModule, RouterLink],
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
    init_testing2();
    init_auth_service();
    init_core();
    var _MockAuthService = class _MockAuthService {
      userType = signal("morador");
      isLoggedIn = /* @__PURE__ */ __name(() => true, "isLoggedIn");
      getUserType = /* @__PURE__ */ __name(() => "morador", "getUserType");
    };
    __name(_MockAuthService, "MockAuthService");
    var MockAuthService = _MockAuthService;
    describe("HomeComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [HomeComponent, RouterTestingModule],
          providers: [
            { provide: AuthService, useClass: MockAuthService }
          ]
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
