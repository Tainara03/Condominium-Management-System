import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-ORQR5QO4.js";
import "./chunk-EVNDHHUL.js";
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

// angular:jit:template:src\app\pages\registro\registro.component.html
var registro_component_default;
var init_registro_component = __esm({
  "angular:jit:template:src\\app\\pages\\registro\\registro.component.html"() {
    registro_component_default = `<div class="d-flex vh-100 justify-content-center align-items-center">\r
  \r
  <div class="card p-0 shadow-lg registration-card-integrated"> \r
    <div class="row g-0 h-100"> \r
      \r
      <div class="col-md-2 bg-marrom d-flex flex-column justify-content-end align-items-center p-3 rounded-start">\r
        <img src="assets/logo-domus.png" alt="Logo Domus" class="img-fluid" style="max-height: 100px;">\r
      </div>\r
\r
      <div class="col-md-10 p-4"> \r
        <h3 class="mb-4 text-center text-md-start">Crie sua Conta</h3>\r
\r
        <form (ngSubmit)="registrar()">\r
          \r
          <div class="row g-2">\r
            <div class="col-md-6 mb-3">\r
              <label for="fullName" class="form-label">Nome Completo</label>\r
              <input type="text" class="form-control" id="fullName" name="fullName" [(ngModel)]="registroData.fullName" required>\r
            </div>\r
            <div class="col-md-6 mb-3">\r
              <label for="email" class="form-label">E-mail</label>\r
              <input type="email" class="form-control" id="email" name="email" [(ngModel)]="registroData.email" placeholder="seu@email.com" required>\r
            </div>\r
          </div>\r
\r
          <div class="row g-2">\r
            <div class="col-md-6 mb-3">\r
              <label for="phone" class="form-label">Telefone</label>\r
              <input type="tel" class="form-control" id="phone" name="phone" [(ngModel)]="registroData.phone" placeholder="(XX) XXXXX-XXXX" required>\r
            </div>\r
            <div class="col-md-6 mb-3">\r
              <label for="userType" class="form-label">Tipo de Usu\xE1rio</label>\r
              <select class="form-select" id="userType" name="userType" [(ngModel)]="registroData.userType" required>\r
                <option value="" disabled selected>Selecione</option>\r
                <option value="admin">Administrador</option>\r
                <option value="morador">Morador</option>\r
                <option value="porteiro">Porteiro</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="row g-2">\r
            <div class="col-md-6 mb-3">\r
              <label for="bloco" class="form-label">Bloco</label>\r
              <input type="text" class="form-control" id="bloco" name="bloco" [(ngModel)]="registroData.bloco" placeholder="Ex: A" required>\r
            </div>\r
            <div class="col-md-6 mb-3">\r
              <label for="apartment" class="form-label">Apartamento</label>\r
              <input type="text" class="form-control" id="apartment" name="apartment" [(ngModel)]="registroData.apartment" placeholder="Ex: 101" required>\r
            </div>\r
          </div>\r
\r
          <div class="row g-2">\r
            <div class="col-md-6 mb-3">\r
              <label for="password" class="form-label">Senha</label>\r
              <input type="password" class="form-control" id="password" name="password" [(ngModel)]="registroData.password" required>\r
            </div>\r
\r
            <div class="col-md-6 mb-3">\r
              <label for="comprovante" class="form-label">Anexar Comprovante</label>\r
              <input class="form-control" type="file" id="comprovante" name="comprovante" (change)="onFileSelected($event)" required>\r
              <div class="form-text">Sujeito a aprova\xE7\xE3o.</div>\r
            </div>\r
          </div>\r
          <button type="submit" class="btn btn-primary w-100">Registrar</button>\r
          \r
          <div *ngIf="registroMessage" class="alert mt-3" [ngClass]="{'alert-success': isSuccess, 'alert-danger': !isSuccess}">\r
            {{ registroMessage }}\r
          </div>\r
\r
        </form>\r
        \r
        <div class="text-center mt-3">\r
          J\xE1 tem uma conta? <a class="text-decoration-none fw-bold" routerLink="/login">Fazer Login</a>\r
        </div>\r
\r
      </div>\r
    </div>\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\pages\registro\registro.component.css
var registro_component_default2;
var init_registro_component2 = __esm({
  "angular:jit:style:src\\app\\pages\\registro\\registro.component.css"() {
    registro_component_default2 = "/* src/app/pages/registro/registro.component.css */\n.bg-marrom {\n  background-color: #824F31 !important;\n}\n.registration-card-integrated {\n  max-width: 950px;\n  width: 100%;\n  height: 90vh;\n  border-radius: 1rem;\n  overflow: hidden;\n  margin-left: -150px !important;\n}\n.registration-card-integrated .row {\n  height: 100%;\n}\n.registration-card-integrated .bg-marrom img {\n  min-width: 40px;\n  max-width: 100%;\n  height: auto;\n  max-height: 100px;\n}\n.registration-card-integrated .col-md-10 {\n  display: flex;\n  flex-direction: column;\n}\n.registration-card-integrated form {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.form-scroll-area {\n  overflow-y: auto;\n  padding-right: 15px;\n  margin-bottom: 15px;\n}\n@media (max-width: 768px) {\n  .registration-card-integrated {\n    height: auto;\n    max-width: 90%;\n    margin-left: 0 !important;\n  }\n  .registration-card-integrated .bg-marrom {\n    display: none;\n  }\n}\n/*# sourceMappingURL=registro.component.css.map */\n";
  }
});

// src/app/pages/registro/registro.component.ts
var _a, RegistroComponent;
var init_registro_component3 = __esm({
  "src/app/pages/registro/registro.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_registro_component();
    init_registro_component2();
    init_common();
    init_core();
    init_forms();
    init_router();
    RegistroComponent = (_a = class {
      registroData = {
        fullName: "",
        email: "",
        phone: "",
        userType: "",
        bloco: "",
        apartment: "",
        password: "",
        comprovante: null
      };
      registroMessage = "";
      isSuccess = false;
      constructor() {
      }
      onFileSelected(event) {
        this.registroMessage = "";
        const input = event.target;
        if (input.files && input.files.length) {
          this.registroData.comprovante = input.files[0];
        }
      }
      registrar() {
        this.registroMessage = "";
        if (!this.registroData.fullName || this.registroData.password.length < 6 || !this.registroData.userType) {
          this.isSuccess = false;
          this.registroMessage = "Por favor, preencha todos os campos obrigat\xF3rios e verifique a senha.";
          return;
        }
        if (!this.registroData.comprovante) {
          this.isSuccess = false;
          this.registroMessage = "\xC9 necess\xE1rio anexar um comprovante de v\xEDnculo com o condom\xEDnio.";
          return;
        }
        this.isSuccess = true;
        this.registroMessage = "Cadastro enviado com sucesso! Sua conta ser\xE1 ativada ap\xF3s a verifica\xE7\xE3o do comprovante.";
      }
    }, __name(_a, "RegistroComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [], "ctorParameters")), _a);
    RegistroComponent = __decorate([
      Component({
        selector: "app-registro",
        standalone: true,
        imports: [FormsModule, CommonModule, RouterLink],
        template: registro_component_default,
        styles: [registro_component_default2]
      })
    ], RegistroComponent);
  }
});

// src/app/pages/registro/registro.component.spec.ts
var require_registro_component_spec = __commonJS({
  "src/app/pages/registro/registro.component.spec.ts"(exports) {
    init_testing();
    init_registro_component3();
    init_testing2();
    describe("RegistroComponent", () => {
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [RegistroComponent, RouterTestingModule]
        }).compileComponents();
      }));
      it("should create", () => {
        fixture = TestBed.createComponent(RegistroComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_registro_component_spec();
//# sourceMappingURL=spec-registro.component.spec.js.map
