import {
  AuthService,
  init_auth_service
} from "./chunk-WMV5C3HC.js";
import "./chunk-CJXQ6SPB.js";
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
  __publicField,
  __spreadValues
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\pages\perfil\perfil.component.html
var perfil_component_default;
var init_perfil_component = __esm({
  "angular:jit:template:src\\app\\pages\\perfil\\perfil.component.html"() {
    perfil_component_default = '<div class="container py-5">\r\n  <div class="row justify-content-center">\r\n    <div class="col-lg-10">\r\n\r\n      <div class="card shadow-lg border-0">\r\n        <div class="card-header text-white text-center py-3 perfil-header">\r\n          <h4 class="mb-0">Meu Perfil e Dados Cadastrais</h4>\r\n        </div>\r\n        <div class="card-body p-4 p-md-5">\r\n\r\n          <form (ngSubmit)="salvarPerfil()">\r\n            \r\n            <h5 class="mb-3">Informa\xE7\xF5es Pessoais</h5>\r\n\r\n            <div class="row mb-4 g-3">\r\n              \r\n              <div class="col-md-6">\r\n                <label for="fullName" class="form-label fw-bold">Nome Completo</label>\r\n                <input type="text" class="form-control" id="fullName" name="fullName" \r\n                       [(ngModel)]="perfilData.fullName" [readonly]="!modoEdicao" required>\r\n              </div>\r\n\r\n              <div class="col-md-6">\r\n                <label for="email" class="form-label fw-bold">E-mail</label>\r\n                <input type="email" class="form-control" id="email" name="email" \r\n                       [(ngModel)]="perfilData.email" [readonly]="!modoEdicao" required>\r\n              </div>\r\n            </div>\r\n\r\n            <div class="row mb-5 g-3">\r\n              \r\n              <div class="col-md-6">\r\n                <label for="phone" class="form-label fw-bold">Telefone</label>\r\n                <input type="tel" class="form-control" id="phone" name="phone" \r\n                       [(ngModel)]="perfilData.phone" [readonly]="!modoEdicao" required>\r\n              </div>\r\n              \r\n              <div class="col-md-6">\r\n                <label for="userType" class="form-label fw-bold">Tipo de Usu\xE1rio</label>\r\n                <input type="text" class="form-control" id="userType" name="userType" \r\n                       [(ngModel)]="perfilData.userTypeDisplay" readonly>\r\n                <div class="form-text">O tipo de usu\xE1rio s\xF3 pode ser alterado pela administra\xE7\xE3o.</div>\r\n              </div>\r\n            </div>\r\n\r\n            <hr class="mb-5">\r\n\r\n            <h5 class="mb-3">Dados da(s) Unidade(s)</h5>\r\n            \r\n            <div class="mb-4">\r\n              \r\n              <ul class="list-group mb-3">\r\n                <li *ngFor="let unidade of perfilData.unidades; let i = index" class="list-group-item d-flex justify-content-between align-items-center">\r\n                  Bloco: {{ unidade.bloco }} | Apto: {{ unidade.apartment }}\r\n                  \r\n                  <button *ngIf="modoEdicao && perfilData.unidades.length > 1" type="button" class="btn btn-sm btn-outline-danger" (click)="removerUnidade(i)">\r\n                    <i class="bi bi-x-lg"></i>\r\n                  </button>\r\n                </li>\r\n              </ul>\r\n              \r\n              <div *ngIf="modoEdicao" class="card p-3 bg-light border">\r\n                <h6 class="mb-3">Adicionar Nova Unidade</h6>\r\n                <div class="row g-2 mb-3">\r\n                  <div class="col-md-5">\r\n                    <input type="text" class="form-control" placeholder="Novo Bloco (Ex: D)" \r\n                           [(ngModel)]="novaUnidadeTemp.bloco" name="newBlock" required>\r\n                  </div>\r\n                  <div class="col-md-5">\r\n                    <input type="text" class="form-control" placeholder="Novo Apartamento (Ex: 401)" \r\n                           [(ngModel)]="novaUnidadeTemp.apartment" name="newApartment" required>\r\n                  </div>\r\n                  <div class="col-md-2 d-grid">\r\n                    <button type="button" class="btn btn-success" (click)="adicionarUnidade()">\r\n                      <i class="bi bi-plus-lg"></i>\r\n                    </button>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class="mt-3">\r\n                  <label for="comprovanteAnexo" class="form-label">Anexar Comprovante (para novas unidades/mudan\xE7as)</label>\r\n                  <input class="form-control" type="file" id="comprovanteAnexo" name="novoComprovante" \r\n                         (change)="onComprovanteSelected($event)">\r\n                  <div class="form-text text-danger fw-bold">Sujeito a aprova\xE7\xE3o. Necess\xE1rio para qualquer altera\xE7\xE3o de unidade.</div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class="d-flex justify-content-end mt-4">\r\n              \r\n              <button *ngIf="!modoEdicao" type="button" class="btn btn-outline-secondary btn-lg" (click)="alternarModoEdicao()">\r\n                <i class="bi bi-pencil-square me-2"></i> Editar Dados\r\n              </button>\r\n\r\n              <ng-container *ngIf="modoEdicao">\r\n                <button type="button" class="btn btn-secondary btn-lg me-3" (click)="cancelarEdicao()">\r\n                  Cancelar\r\n                </button>\r\n                <button type="submit" class="btn btn-marrom btn-lg">\r\n                  <i class="bi bi-save me-2"></i> Salvar Altera\xE7\xF5es\r\n                </button>\r\n              </ng-container>\r\n            </div>\r\n            \r\n          </form>\r\n\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>';
  }
});

// angular:jit:style:src\app\pages\perfil\perfil.component.css
var perfil_component_default2;
var init_perfil_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\perfil\\perfil.component.css"() {
    perfil_component_default2 = "/* src/app/pages/perfil/perfil.component.css */\n.perfil-header {\n  background-color: #FCAA60 !important;\n}\n.text-primary {\n  color: #0d6efd !important;\n}\n.btn-outline-secondary {\n  --bs-btn-color: #6c757d;\n  --bs-btn-border-color: #6c757d;\n  --bs-btn-hover-color: #fff;\n  --bs-btn-hover-bg: #6c757d;\n  --bs-btn-hover-border-color: #6c757d;\n}\n.btn-outline-danger {\n  --bs-btn-color: #dc3545;\n  --bs-btn-border-color: #dc3545;\n  --bs-btn-hover-color: #fff;\n  --bs-btn-hover-bg: #dc3545;\n  --bs-btn-hover-border-color: #dc3545;\n}\n.btn-marrom {\n  background-color: #FCAA60;\n  border-color: #FCAA60;\n  color: #FFF;\n}\n.btn-marrom:hover {\n  background-color: #e59950;\n  border-color: #e59950;\n}\n.btn-marrom:active,\n.btn-marrom:focus {\n  background-color: #d18844 !important;\n  border-color: #d18844 !important;\n  box-shadow: 0 0 0 0.25rem rgba(252, 170, 96, 0.5);\n}\nh5 {\n  color: #FCAA60;\n}\n/*# sourceMappingURL=perfil.component.css.map */\n";
  }
});

// src/app/pages/perfil/perfil.component.ts
var _a, PerfilComponent;
var init_perfil_component3 = __esm({
  "src/app/pages/perfil/perfil.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_perfil_component();
    init_perfil_component2();
    init_core();
    init_common();
    init_forms();
    init_auth_service();
    PerfilComponent = (_a = class {
      authService;
      modoEdicao = false;
      perfilData = this.getInitialProfileData();
      perfilDataOriginal = this.getInitialProfileData();
      novaUnidadeTemp = { bloco: "", apartment: "" };
      constructor(authService) {
        this.authService = authService;
      }
      ngOnInit() {
        this.carregarDadosDoPerfil();
      }
      getInitialProfileData() {
        return {
          fullName: "",
          email: "",
          phone: "",
          userType: null,
          userTypeDisplay: "Carregando...",
          unidades: [],
          novoComprovante: null
        };
      }
      carregarDadosDoPerfil() {
        const userType = this.authService.getUserType();
        const userTypeValidated = userType || "morador";
        const mockData = {
          fullName: "Jo\xE3o da Silva",
          email: "joao.silva@domus.com",
          phone: "11987654321",
          userType: userTypeValidated,
          userTypeDisplay: this.formatUserType(userTypeValidated),
          unidades: [
            { bloco: "A", apartment: "101" },
            { bloco: "C", apartment: "204" }
          ],
          novoComprovante: null
        };
        this.perfilData = __spreadValues({}, mockData);
        this.perfilDataOriginal = __spreadValues({}, mockData);
      }
      onComprovanteSelected(event) {
        const file = event.target.files[0];
        this.perfilData.novoComprovante = file;
      }
      adicionarUnidade() {
        if (this.novaUnidadeTemp.bloco && this.novaUnidadeTemp.apartment) {
          this.perfilData.unidades.push(__spreadValues({}, this.novaUnidadeTemp));
          this.novaUnidadeTemp = { bloco: "", apartment: "" };
        } else {
          alert("Por favor, preencha Bloco e Apartamento.");
        }
      }
      removerUnidade(index) {
        if (this.perfilData.unidades.length > 1) {
          this.perfilData.unidades.splice(index, 1);
          alert("Unidade marcada para remo\xE7\xE3o. Salve para confirmar.");
        } else {
          alert("Voc\xEA deve ter pelo menos uma unidade registrada.");
        }
      }
      alternarModoEdicao() {
        this.modoEdicao = !this.modoEdicao;
      }
      cancelarEdicao() {
        this.perfilData = JSON.parse(JSON.stringify(this.perfilDataOriginal));
        this.modoEdicao = false;
      }
      salvarPerfil() {
        if (!this.modoEdicao)
          return;
        const houveAlteracaoUnidades = JSON.stringify(this.perfilData.unidades) !== JSON.stringify(this.perfilDataOriginal.unidades);
        if (houveAlteracaoUnidades && !this.perfilData.novoComprovante) {
          alert("\xC9 obrigat\xF3rio anexar um novo comprovante para alterar/adicionar unidades.");
          return;
        }
        alert("Altera\xE7\xF5es enviadas para an\xE1lise. Voc\xEA ser\xE1 notificado sobre a aprova\xE7\xE3o.");
        this.perfilDataOriginal = JSON.parse(JSON.stringify(this.perfilData));
        this.perfilData.novoComprovante = null;
        this.modoEdicao = false;
      }
      formatUserType(type) {
        switch (type) {
          case "admin":
            return "Administrador";
          case "morador":
            return "Morador";
          case "porteiro":
            return "Porteiro";
          default:
            return "Desconhecido";
        }
      }
    }, __name(_a, "PerfilComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService }
    ], "ctorParameters")), _a);
    PerfilComponent = __decorate([
      Component({
        selector: "app-perfil",
        standalone: true,
        imports: [CommonModule, FormsModule],
        template: perfil_component_default,
        styles: [perfil_component_default2]
      })
    ], PerfilComponent);
  }
});

// src/app/pages/perfil/perfil.component.spec.ts
var require_perfil_component_spec = __commonJS({
  "src/app/pages/perfil/perfil.component.spec.ts"(exports) {
    init_testing();
    init_perfil_component3();
    describe("PerfilComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [PerfilComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(PerfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_perfil_component_spec();
//# sourceMappingURL=spec-perfil.component.spec.js.map
