import {
  init_testing as init_testing2,
  provideLocationMocks
} from "./chunk-EVNDHHUL.js";
import {
  NoPreloading,
  ROUTER_CONFIGURATION,
  ROUTER_PROVIDERS,
  ROUTES,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  afterNextNavigation,
  init_router,
  init_router2,
  init_router_module,
  withPreloading
} from "./chunk-CJXQ6SPB.js";
import {
  AuthService,
  init_auth_service
} from "./chunk-NKA37ICP.js";
import {
  NgIf,
  init_common
} from "./chunk-Q3HEFWR4.js";
import {
  Component,
  FactoryTarget,
  Injectable,
  NgModule,
  TestBed,
  ViewChild,
  __decorate,
  core_exports,
  init_core,
  init_testing,
  init_tslib_es6,
  signal,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-Q6HBEQPX.js";
import {
  __async,
  __esm,
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// angular:jit:template:src\app\components\sidebar\sidebar.component.html
var sidebar_component_default;
var init_sidebar_component = __esm({
  "angular:jit:template:src\\app\\components\\sidebar\\sidebar.component.html"() {
    sidebar_component_default = `<div *ngIf="auth.isLoggedIn()" class="list-group" style="width: 200px;">\r
  <a class="list-group-item list-group-item-action" routerLink="/home">Feed de Notifica\xE7\xF5es</a>\r
  \r
  <a *ngIf="auth.userType() === 'admin'" class="list-group-item list-group-item-action" routerLink="/painel">Painel Administrador</a>\r
  \r
  <a *ngIf="auth.userType() === 'porteiro'" class="list-group-item list-group-item-action" routerLink="/encomendas">Cadastrar Encomendas</a>\r
  \r
  <a *ngIf="auth.userType() === 'morador'" class="list-group-item list-group-item-action" routerLink="/cobrancas">Minhas Cobran\xE7as</a>\r
  \r
  <a class="list-group-item list-group-item-action" routerLink="/ocorrencias">Enviar Comunicados</a>\r
  <a class="list-group-item list-group-item-action" routerLink="/reservas">Reserva de \xC1reas</a>\r
  <a class="list-group-item list-group-item-action" routerLink="/perfil">Meu Perfil</a>\r
\r
</div>`;
  }
});

// angular:jit:style:src\app\components\sidebar\sidebar.component.css
var sidebar_component_default2;
var init_sidebar_component2 = __esm({
  "angular:jit:style:src\\app\\components\\sidebar\\sidebar.component.css"() {
    sidebar_component_default2 = "/* src/app/components/sidebar/sidebar.component.css */\n.list-left {\n  width: 200px;\n  margin-left: 0;\n}\n.list-group-item-action {\n  cursor: pointer;\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n";
  }
});

// src/app/components/sidebar/sidebar.component.ts
var _a, SidebarComponent;
var init_sidebar_component3 = __esm({
  "src/app/components/sidebar/sidebar.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_sidebar_component();
    init_sidebar_component2();
    init_core();
    init_router();
    init_auth_service();
    init_common();
    SidebarComponent = (_a = class {
      auth;
      constructor(auth) {
        this.auth = auth;
      }
    }, __name(_a, "SidebarComponent"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: AuthService }
    ], "ctorParameters")), _a);
    SidebarComponent = __decorate([
      Component({
        selector: "app-sidebar",
        imports: [RouterLink, NgIf],
        template: sidebar_component_default,
        styles: [sidebar_component_default2]
      })
    ], SidebarComponent);
  }
});

// node_modules/@angular/router/fesm2022/testing.mjs
var _RouterTestingModule, RouterTestingModule, _RootFixtureService, RootFixtureService, _RootCmp, RootCmp, _RouterTestingHarness, RouterTestingHarness;
var init_testing3 = __esm({
  "node_modules/@angular/router/fesm2022/testing.mjs"() {
    "use strict";
    init_core();
    init_core();
    init_testing();
    init_router2();
    init_router_module();
    init_testing2();
    _RouterTestingModule = class _RouterTestingModule {
      static withRoutes(routes, config) {
        return {
          ngModule: _RouterTestingModule,
          providers: [
            { provide: ROUTES, multi: true, useValue: routes },
            { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} }
          ]
        };
      }
    };
    __name(_RouterTestingModule, "RouterTestingModule");
    __publicField(_RouterTestingModule, "\u0275fac", \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _RouterTestingModule, deps: [], target: FactoryTarget.NgModule }));
    __publicField(_RouterTestingModule, "\u0275mod", \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.0", ngImport: core_exports, type: _RouterTestingModule, exports: [RouterModule] }));
    __publicField(_RouterTestingModule, "\u0275inj", \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _RouterTestingModule, providers: [
      ROUTER_PROVIDERS,
      provideLocationMocks(),
      withPreloading(NoPreloading).\u0275providers,
      { provide: ROUTES, multi: true, useValue: [] }
    ], imports: [RouterModule] }));
    RouterTestingModule = _RouterTestingModule;
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: RouterTestingModule, decorators: [{
      type: NgModule,
      args: [{
        exports: [RouterModule],
        providers: [
          ROUTER_PROVIDERS,
          provideLocationMocks(),
          withPreloading(NoPreloading).\u0275providers,
          { provide: ROUTES, multi: true, useValue: [] }
        ]
      }]
    }] });
    _RootFixtureService = class _RootFixtureService {
      fixture;
      harness;
      createHarness() {
        if (this.harness) {
          throw new Error("Only one harness should be created per test.");
        }
        this.harness = new RouterTestingHarness(this.getRootFixture());
        return this.harness;
      }
      getRootFixture() {
        if (this.fixture !== void 0) {
          return this.fixture;
        }
        this.fixture = TestBed.createComponent(RootCmp);
        this.fixture.detectChanges();
        return this.fixture;
      }
    };
    __name(_RootFixtureService, "RootFixtureService");
    __publicField(_RootFixtureService, "\u0275fac", \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _RootFixtureService, deps: [], target: FactoryTarget.Injectable }));
    __publicField(_RootFixtureService, "\u0275prov", \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _RootFixtureService, providedIn: "root" }));
    RootFixtureService = _RootFixtureService;
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: RootFixtureService, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    _RootCmp = class _RootCmp {
      outlet;
      routerOutletData = signal(void 0, ...ngDevMode ? [{ debugName: "routerOutletData" }] : []);
    };
    __name(_RootCmp, "RootCmp");
    __publicField(_RootCmp, "\u0275fac", \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _RootCmp, deps: [], target: FactoryTarget.Component }));
    __publicField(_RootCmp, "\u0275cmp", \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "20.3.0", type: _RootCmp, isStandalone: true, selector: "ng-component", viewQueries: [{ propertyName: "outlet", first: true, predicate: RouterOutlet, descendants: true }], ngImport: core_exports, template: '<router-outlet [routerOutletData]="routerOutletData()"></router-outlet>', isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }] }));
    RootCmp = _RootCmp;
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: RootCmp, decorators: [{
      type: Component,
      args: [{
        template: '<router-outlet [routerOutletData]="routerOutletData()"></router-outlet>',
        imports: [RouterOutlet]
      }]
    }], propDecorators: { outlet: [{
      type: ViewChild,
      args: [RouterOutlet]
    }] } });
    _RouterTestingHarness = class _RouterTestingHarness {
      /**
       * Creates a `RouterTestingHarness` instance.
       *
       * The `RouterTestingHarness` also creates its own root component with a `RouterOutlet` for the
       * purposes of rendering route components.
       *
       * Throws an error if an instance has already been created.
       * Use of this harness also requires `destroyAfterEach: true` in the `ModuleTeardownOptions`
       *
       * @param initialUrl The target of navigation to trigger before returning the harness.
       */
      static create(initialUrl) {
        return __async(this, null, function* () {
          const harness = TestBed.inject(RootFixtureService).createHarness();
          if (initialUrl !== void 0) {
            yield harness.navigateByUrl(initialUrl);
          }
          return harness;
        });
      }
      /**
       * Fixture of the root component of the RouterTestingHarness
       */
      fixture;
      /** @internal */
      constructor(fixture) {
        this.fixture = fixture;
      }
      /** Instructs the root fixture to run change detection. */
      detectChanges() {
        this.fixture.detectChanges();
      }
      /** The `DebugElement` of the `RouterOutlet` component. `null` if the outlet is not activated. */
      get routeDebugElement() {
        const outlet = this.fixture.componentInstance.outlet;
        if (!outlet || !outlet.isActivated) {
          return null;
        }
        return this.fixture.debugElement.query((v) => v.componentInstance === outlet.component);
      }
      /** The native element of the `RouterOutlet` component. `null` if the outlet is not activated. */
      get routeNativeElement() {
        return this.routeDebugElement?.nativeElement ?? null;
      }
      navigateByUrl(url, requiredRoutedComponentType) {
        return __async(this, null, function* () {
          const router = TestBed.inject(Router);
          let resolveFn;
          const redirectTrackingPromise = new Promise((resolve) => {
            resolveFn = resolve;
          });
          afterNextNavigation(TestBed.inject(Router), resolveFn);
          yield router.navigateByUrl(url);
          yield redirectTrackingPromise;
          this.fixture.detectChanges();
          const outlet = this.fixture.componentInstance.outlet;
          if (outlet && outlet.isActivated && outlet.activatedRoute.component) {
            const activatedComponent = outlet.component;
            if (requiredRoutedComponentType !== void 0 && !(activatedComponent instanceof requiredRoutedComponentType)) {
              throw new Error(`Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but got ${activatedComponent.constructor.name}`);
            }
            return activatedComponent;
          } else {
            if (requiredRoutedComponentType !== void 0) {
              throw new Error(`Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but the navigation did not activate any component.`);
            }
            return null;
          }
        });
      }
    };
    __name(_RouterTestingHarness, "RouterTestingHarness");
    RouterTestingHarness = _RouterTestingHarness;
  }
});

export {
  SidebarComponent,
  init_sidebar_component3 as init_sidebar_component,
  RouterTestingModule,
  init_testing3 as init_testing
};
/*! Bundled license information:

@angular/router/fesm2022/testing.mjs:
  (**
   * @license Angular v20.3.0
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-XTPLW7W4.js.map
