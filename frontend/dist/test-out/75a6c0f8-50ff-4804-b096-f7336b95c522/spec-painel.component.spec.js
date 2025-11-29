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
  __name
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\pages\painel\painel.component.html
var painel_component_default;
var init_painel_component = __esm({
  "angular:jit:template:src\\app\\pages\\painel\\painel.component.html"() {
    painel_component_default = `<div class="container py-5">\r
  <div class="row justify-content-center">\r
    <div class="col-lg-12">\r
\r
      <div class="card shadow-lg border-0">\r
        <div class="card-header text-white text-center py-3" style="background-color: #FCAA60 !important;">\r
          <h4 class="mb-0">Painel Administrador: Gest\xE3o de Usu\xE1rios</h4>\r
        </div>\r
        <div class="card-body p-4">\r
            \r
            <div class="row mb-4 g-3 align-items-end">\r
                <div class="col-md-3">\r
                    <label for="filtroNome" class="form-label fw-bold">Nome</label>\r
                    <input type="text" id="filtroNome" class="form-control form-control-sm" placeholder="Nome do morador"\r
                            [(ngModel)]="filtros.nome" (input)="aplicarFiltros()">\r
                </div>\r
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
                    <label for="filtroStatus" class="form-label fw-bold">Status</label>\r
                    <select id="filtroStatus" class="form-select form-select-sm"\r
                            [(ngModel)]="filtros.status" (change)="aplicarFiltros()">\r
                        <option value="">Todos</option>\r
                        <option value="Ativo">Ativo</option>\r
                        <option value="Inativo">Inativo</option>\r
                        <option value="Pendente">Pendente</option>\r
                    </select>\r
                </div>\r
                <div class="col-md-2">\r
                    <label for="filtroTipo" class="form-label fw-bold">Tipo</label>\r
                    <select id="filtroTipo" class="form-select form-select-sm"\r
                            [(ngModel)]="filtros.tipoUsuario" (change)="aplicarFiltros()">\r
                        <option value="">Todos</option>\r
                        <option value="Morador">Morador</option>\r
                        <option value="Porteiro">Porteiro</option>\r
                    </select>\r
                </div>\r
                <div class="col-md-3 d-grid">\r
                     <button class="btn btn-sm btn-outline-secondary" (click)="resetarFiltros()">Resetar Filtros</button>\r
                </div>\r
            </div>\r
\r
            <div class="table-responsive">\r
                <table class="table table-light table-hover">\r
                    <thead>\r
                        <tr>\r
                            <th scope="col">Bloco</th>\r
                            <th scope="col">Apto</th>\r
                            <th scope="col">Nome</th>\r
                            <th scope="col">Tipo</th>\r
                            <th scope="col">Email</th>\r
                            <th scope="col">Telefone</th>\r
                            <th scope="col">Comprovante</th>\r
                            <th scope="col">A\xE7\xF5es</th>\r
                        </tr>\r
                    </thead>\r
                    <tbody>\r
                        <tr *ngFor="let usuario of usuariosFiltrados" \r
                            [ngClass]="{'bg-pendente': usuario.status === 'Pendente'}"> \r
                            <td>{{ usuario.bloco }}</td>\r
                            <td>{{ usuario.apartamento }}</td>\r
                            <td>{{ usuario.nome }}</td>\r
                            <td>{{ usuario.tipoUsuario }}</td>\r
                            <td>{{ usuario.email }}</td>\r
                            <td>{{ usuario.telefone }}</td>\r
                            <td><a href="#" class="btn btn-sm btn-outline-info">Ver Doc</a></td>\r
                            \r
                            <td>\r
                                <div *ngIf="usuario.status === 'Pendente'; else acoesAtivasInativas">\r
                                    <button class="btn btn-sm btn-success me-2" (click)="aprovarUsuario(usuario)">Aprovar</button>\r
                                    <button class="btn btn-sm btn-danger" (click)="reprovarUsuario(usuario)">Reprovar</button>\r
                                </div>\r
                                \r
                                <ng-template #acoesAtivasInativas>\r
                                    <button \r
                                        (click)="toggleStatus(usuario)" \r
                                        [ngClass]="{'btn-danger': usuario.status === 'Ativo', 'btn-success': usuario.status === 'Inativo'}" \r
                                        class="btn btn-sm w-100">\r
                                        \r
                                        {{ usuario.status === 'Ativo' ? 'Desativar' : 'Ativar' }}\r
                                    </button>\r
                                </ng-template>\r
                            </td>\r
                        </tr>\r
                    </tbody>\r
                </table>\r
            </div>\r
            \r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\pages\painel\painel.component.css
var painel_component_default2;
var init_painel_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\painel\\painel.component.css"() {
    painel_component_default2 = "/* src/app/pages/painel/painel.component.css */\n.table-responsive {\n  overflow-x: auto;\n}\n.table-light {\n  --bs-table-bg: #f8f9fa;\n  --bs-table-color: #212529;\n}\n.bg-pendente {\n  background-color: #fff3cd !important;\n  color: #495057 !important;\n}\ntr.bg-pendente td {\n  background-color: #fff3cd !important;\n  color: #495057 !important;\n}\n.table-hover tbody tr.bg-pendente:hover td {\n  background-color: #ffe4a6 !important;\n}\n.table-hover tbody tr:nth-child(odd) {\n  background-color: #f8f9fa;\n}\n.table-hover tbody tr:nth-child(odd):not(.bg-pendente) td {\n  background-color: #f8f9fa;\n}\n.btn-success {\n  background-color: #198754;\n  border-color: #198754;\n  color: #fff;\n}\n.btn-success:hover {\n  background-color: #157347;\n  border-color: #146c43;\n}\n.btn-danger {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: #fff;\n}\n.btn-danger:hover {\n  background-color: #bb2d3b;\n  border-color: #b02a37;\n}\n/*# sourceMappingURL=painel.component.css.map */\n";
  }
});

// src/app/pages/painel/painel.component.ts
var _a, PainelComponent;
var init_painel_component3 = __esm({
  "src/app/pages/painel/painel.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_painel_component();
    init_painel_component2();
    init_core();
    init_common();
    init_forms();
    PainelComponent = (_a = class {
      usuarios = [];
      usuariosFiltrados = [];
      filtros = {
        nome: "",
        bloco: "",
        status: "",
        tipoUsuario: ""
      };
      ngOnInit() {
        this.carregarUsuarios();
      }
      carregarUsuarios() {
        const dadosIniciais = [
          { bloco: "A", apartamento: "101", nome: "Jo\xE3o da Silva", tipoUsuario: "Morador", email: "joao@domus.com", telefone: "11987654321", status: "Ativo" },
          { bloco: "B", apartamento: "203", nome: "Maria Souza", tipoUsuario: "Porteiro", email: "maria@domus.com", telefone: "21912345678", status: "Inativo" },
          { bloco: "C", apartamento: "304", nome: "Pedro Lima", tipoUsuario: "Morador", email: "pedro@domus.com", telefone: "11999998888", status: "Pendente" }
        ];
        this.usuarios = dadosIniciais;
        this.aplicarFiltros();
      }
      aplicarFiltros() {
        let tempUsuarios = this.usuarios;
        if (this.filtros.nome) {
          const termo = this.filtros.nome.toLowerCase();
          tempUsuarios = tempUsuarios.filter((u) => u.nome.toLowerCase().includes(termo));
        }
        if (this.filtros.bloco) {
          tempUsuarios = tempUsuarios.filter((u) => u.bloco === this.filtros.bloco);
        }
        if (this.filtros.status) {
          tempUsuarios = tempUsuarios.filter((u) => u.status === this.filtros.status);
        }
        if (this.filtros.tipoUsuario) {
          tempUsuarios = tempUsuarios.filter((u) => u.tipoUsuario === this.filtros.tipoUsuario);
        }
        this.usuariosFiltrados = tempUsuarios;
      }
      resetarFiltros() {
        this.filtros = { nome: "", bloco: "", status: "", tipoUsuario: "" };
        this.aplicarFiltros();
      }
      aprovarUsuario(usuario) {
        usuario.status = "Ativo";
        this.aplicarFiltros();
        alert(`Usu\xE1rio ${usuario.nome} aprovado e ativado.`);
      }
      reprovarUsuario(usuario) {
        usuario.status = "Inativo";
        this.aplicarFiltros();
        alert(`Usu\xE1rio ${usuario.nome} reprovado e desativado.`);
      }
      toggleStatus(usuario) {
        if (usuario.status === "Pendente")
          return;
        const novoStatus = usuario.status === "Ativo" ? "Inativo" : "Ativo";
        usuario.status = novoStatus;
        this.aplicarFiltros();
        alert(`Usu\xE1rio ${usuario.nome} est\xE1 agora como ${novoStatus}.`);
      }
    }, __name(_a, "PainelComponent"), _a);
    PainelComponent = __decorate([
      Component({
        selector: "app-painel",
        standalone: true,
        imports: [CommonModule, FormsModule],
        template: painel_component_default,
        styles: [painel_component_default2]
      })
    ], PainelComponent);
  }
});

// src/app/pages/painel/painel.component.spec.ts
var require_painel_component_spec = __commonJS({
  "src/app/pages/painel/painel.component.spec.ts"(exports) {
    init_testing();
    init_painel_component3();
    describe("PainelComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [PainelComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(PainelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_painel_component_spec();
//# sourceMappingURL=spec-painel.component.spec.js.map
