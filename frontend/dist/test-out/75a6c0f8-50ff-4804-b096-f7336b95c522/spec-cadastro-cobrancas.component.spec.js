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

// angular:jit:template:src\app\pages\cadastro-cobrancas\cadastro-cobrancas.component.html
var cadastro_cobrancas_component_default;
var init_cadastro_cobrancas_component = __esm({
  "angular:jit:template:src\\app\\pages\\cadastro-cobrancas\\cadastro-cobrancas.component.html"() {
    cadastro_cobrancas_component_default = `<div class="container py-5">\r
  <div class="row justify-content-center">\r
    <div class="col-lg-10">\r
\r
      <div class="card shadow-lg border-0">\r
        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r
          <h4 class="mb-0">Cadastrar Cobran\xE7a</h4>\r
        </div>\r
        <div class="card-body p-4 p-md-5">\r
\r
          <form (ngSubmit)="cadastrarCobranca()">\r
            \r
            <div class="row mb-4 g-3">\r
              \r
              <div class="col-md-4">\r
                <label for="tipoCobrancaSelect" class="form-label fw-bold">Tipo de Cobran\xE7a</label>\r
                <select class="form-select" id="tipoCobrancaSelect" \r
                        [(ngModel)]="cobrancaData.tipo" name="tipoCobranca" required>\r
                  <option value="" disabled selected>Selecione</option>\r
                  <option value="Condominio">Condom\xEDnio</option>\r
                  <option value="Agua">\xC1gua</option>\r
                  <option value="Multa">Multa</option>\r
                  <option value="Outro">Outro</option>\r
                </select>\r
              </div>\r
\r
              <div class="col-md-4">\r
                <label for="dataVencimento" class="form-label fw-bold">Data de Vencimento</label>\r
                <input type="date" class="form-control" id="dataVencimento" \r
                       [(ngModel)]="cobrancaData.dataVencimento" name="dataVencimento" required>\r
              </div>\r
\r
              <div class="col-md-4">\r
                <label for="valorInput" class="form-label fw-bold">Valor (R$)</label>\r
                <input type="number" class="form-control" id="valorInput" placeholder="0.00" min="0" step="0.01"\r
                       [(ngModel)]="cobrancaData.valor" name="valor" required>\r
              </div>\r
            </div>\r
\r
<div class="row mb-4 g-3">\r
                <div class="col-md-4">\r
                    <label for="modoDestino" class="form-label fw-bold">Aplicar a</label>\r
                    <select class="form-select" id="modoDestino" \r
                            [(ngModel)]="cobrancaData.modoDestino" name="modoDestino" required>\r
                        <option value="Todos">Todas as Unidades (Lan\xE7amento em Massa)</option>\r
                        <option value="Blocos">Blocos Selecionados (Todos os aptos dentro)</option>\r
                        <option value="Unidades">Unidades Espec\xEDficas (Aptos individuais)</option>\r
                    </select>\r
                </div>\r
\r
                <ng-container *ngIf="cobrancaData.modoDestino === 'Blocos'">\r
                    <div class="col-md-8">\r
                        <label for="blocoMultiSelect" class="form-label fw-bold">Blocos (M\xFAltipla Sele\xE7\xE3o)</label>\r
                        <select class="form-select" id="blocoMultiSelect" size="4" multiple \r
                                [(ngModel)]="cobrancaData.blocosSelecionados" name="blocosSelecionados" required>\r
                            <option value="A">Bloco A</option>\r
                            <option value="B">Bloco B</option>\r
                            <option value="C">Bloco C</option>\r
                            <option value="D">Bloco D</option>\r
                        </select>\r
                        <div class="form-text obs fw-bold">\r
                            Segure CTRL (ou CMD no Mac) para selecionar v\xE1rios.\r
                        </div>\r
                    </div>\r
                </ng-container>\r
\r
                <ng-container *ngIf="cobrancaData.modoDestino === 'Unidades'">\r
                    <div class="col-md-4">\r
                        <label for="blocoUnidadeSelect" class="form-label fw-bold">Blocos Envolvidos</label>\r
                        <select class="form-select" id="blocoUnidadeSelect" size="4" multiple \r
                                [(ngModel)]="cobrancaData.blocosSelecionados" name="blocosUnidadeSelecionados" required>\r
                            <option value="A">Bloco A</option>\r
                            <option value="B">Bloco B</option>\r
                        </select>\r
                        <div class="form-text obs fw-bold">Segure CTRL/CMD para selecionar v\xE1rios.</div>\r
                    </div>\r
                    <div class="col-md-4">\r
                        <label for="aptosMultiSelect" class="form-label fw-bold">Apartamentos</label>\r
                        <select class="form-select" id="aptosMultiSelect" size="4" multiple \r
                                [(ngModel)]="cobrancaData.apartamentosSelecionados" name="apartamentosSelecionados" required>\r
                            <option value="101">101</option>\r
                            <option value="102">102</option>\r
                            <option value="201">201</option>\r
                            <option value="304">304</option>\r
                        </select>\r
                        <div class="form-text obs fw-bold">Segure CTRL/CMD para selecionar v\xE1rios.</div>\r
                    </div>\r
                </ng-container>\r
            </div>\r
            \r
            <div class="row mb-4 g-3">\r
                <div class="col-md-6">\r
                    <label for="linkBoleto" class="form-label fw-bold">Link Direto do Boleto/PDF</label>\r
                    <input type="url" class="form-control" id="linkBoleto" placeholder="https://..."\r
                           [(ngModel)]="cobrancaData.linkBoleto" name="linkBoleto">\r
                    <div class="form-text">\xDAtil para boletos gerados por terceiros.</div>\r
                </div>\r
                <div class="col-md-6">\r
                    <label for="uploadComprovante" class="form-label fw-bold">Ou fa\xE7a Upload do PDF</label>\r
                    <input class="form-control" type="file" id="uploadComprovante" \r
                           (change)="onFileSelected($event)" name="arquivoAnexo">\r
                    <div class="form-text">Ser\xE1 anexado \xE0 cobran\xE7a (m\xE1x. 5MB).</div>\r
                </div>\r
            </div>\r
\r
            <div class="row mb-4">\r
                <div class="col-12">\r
                    <div class="form-floating">\r
                        <textarea \r
                            class="form-control" \r
                            placeholder="Descreva o motivo da cobran\xE7a." \r
                            id="floatingDescricao" \r
                            style="height: 100px"\r
                            [(ngModel)]="cobrancaData.descricao" name="descricao"\r
                        ></textarea>\r
                        <label for="floatingDescricao">Descri\xE7\xE3o Detalhada</label>\r
                    </div>\r
                </div>\r
            </div>\r
            <div class="d-grid mt-4">\r
              <button class="btn btn-marrom btn-lg" type="submit">Cadastrar Cobran\xE7a</button>\r
            </div>\r
          </form>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\pages\cadastro-cobrancas\cadastro-cobrancas.component.css
var cadastro_cobrancas_component_default2;
var init_cadastro_cobrancas_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\cadastro-cobrancas\\cadastro-cobrancas.component.css"() {
    cadastro_cobrancas_component_default2 = "/* src/app/pages/cadastro-cobrancas/cadastro-cobrancas.component.css */\n.obs {\n  color: #FCAA60;\n}\n.btn-marrom {\n  background-color: #FCAA60;\n  border-color: #FCAA60;\n  color: #FFF;\n}\n.btn-marrom:hover {\n  background-color: #e59950;\n  border-color: #e59950;\n}\n.btn-marrom:active,\n.btn-marrom:focus {\n  background-color: #d18844 !important;\n  border-color: #d18844 !important;\n  box-shadow: 0 0 0 0.25rem rgba(252, 170, 96, 0.5);\n}\n/*# sourceMappingURL=cadastro-cobrancas.component.css.map */\n";
  }
});

// src/app/pages/cadastro-cobrancas/cadastro-cobrancas.component.ts
var _a, CadastroCobrancasComponent;
var init_cadastro_cobrancas_component3 = __esm({
  "src/app/pages/cadastro-cobrancas/cadastro-cobrancas.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_cadastro_cobrancas_component();
    init_cadastro_cobrancas_component2();
    init_core();
    init_forms();
    init_common();
    CadastroCobrancasComponent = (_a = class {
      cobrancaData = {
        tipo: "",
        dataVencimento: "",
        valor: 0,
        modoDestino: "Todos",
        blocosSelecionados: [],
        apartamentosSelecionados: [],
        linkBoleto: "",
        arquivoAnexo: null,
        descricao: ""
      };
      constructor() {
      }
      onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
          this.cobrancaData.arquivoAnexo = file;
        }
      }
      cadastrarCobranca() {
        if (this.cobrancaData.modoDestino === "Blocos" && this.cobrancaData.blocosSelecionados.length === 0) {
          alert("Selecione pelo menos um Bloco para o lan\xE7amento em Bloco M\xFAltiplo.");
          return;
        }
        if (this.cobrancaData.modoDestino === "Unidades" && (this.cobrancaData.blocosSelecionados.length === 0 || this.cobrancaData.apartamentosSelecionados.length === 0)) {
          alert("Selecione pelo menos um Bloco E pelo menos um Apartamento para o lan\xE7amento espec\xEDfico.");
          return;
        }
        let destino;
        switch (this.cobrancaData.modoDestino) {
          case "Todos":
            destino = "Todas as unidades do condom\xEDnio.";
            break;
          case "Blocos":
            destino = `Todos os apartamentos nos Blocos: ${this.cobrancaData.blocosSelecionados.join(", ")}.`;
            break;
          case "Unidades":
            destino = `Unidades espec\xEDficas nos Blocos: ${this.cobrancaData.blocosSelecionados.join(", ")} e Aptos: ${this.cobrancaData.apartamentosSelecionados.join(", ")}.`;
            break;
          default:
            destino = "Erro de Destino";
        }
        console.log(`Cobran\xE7a de ${this.cobrancaData.valor} (${this.cobrancaData.tipo}) lan\xE7ada para: ${destino}`);
        alert("Cobran\xE7a registrada com sucesso!");
      }
    }, __name(_a, "CadastroCobrancasComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [], "ctorParameters")), _a);
    CadastroCobrancasComponent = __decorate([
      Component({
        selector: "app-cadastro-cobrancas",
        standalone: true,
        imports: [FormsModule, CommonModule],
        template: cadastro_cobrancas_component_default,
        styles: [cadastro_cobrancas_component_default2]
      })
    ], CadastroCobrancasComponent);
  }
});

// src/app/pages/cadastro-cobrancas/cadastro-cobrancas.component.spec.ts
var require_cadastro_cobrancas_component_spec = __commonJS({
  "src/app/pages/cadastro-cobrancas/cadastro-cobrancas.component.spec.ts"(exports) {
    init_testing();
    init_cadastro_cobrancas_component3();
    describe("CadastroCobrancasComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CadastroCobrancasComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CadastroCobrancasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_cadastro_cobrancas_component_spec();
//# sourceMappingURL=spec-cadastro-cobrancas.component.spec.js.map
