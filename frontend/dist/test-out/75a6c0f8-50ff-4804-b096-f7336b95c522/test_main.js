import {
  MockPlatformLocation,
  init_testing as init_testing2
} from "./chunk-EVNDHHUL.js";
import {
  BrowserModule,
  init_browser,
  platformBrowser
} from "./chunk-BHR2WOUR.js";
import {
  PlatformLocation,
  getDOM,
  init_common
} from "./chunk-Q3HEFWR4.js";
import {
  APP_ID,
  ChangeDetectionScheduler,
  ChangeDetectionSchedulerImpl,
  DOCUMENT,
  FactoryTarget,
  Inject,
  Injectable,
  NgModule,
  TestComponentRenderer,
  core_exports,
  createPlatformFactory,
  getTestBed,
  init_core,
  init_testing,
  internalProvideZoneChangeDetection,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-Q6HBEQPX.js";
import {
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// angular:test-bed-init:angular:test-bed-init
init_testing();

// node_modules/@angular/platform-browser/fesm2022/testing.mjs
init_common();
init_testing2();
init_core();
init_core();
init_testing();
init_browser();
var _DOMTestComponentRenderer = class _DOMTestComponentRenderer extends TestComponentRenderer {
  _doc;
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  insertRootElement(rootElId, tagName = "div") {
    this.removeAllRootElementsImpl();
    const rootElement = getDOM().getDefaultDocument().createElement(tagName);
    rootElement.setAttribute("id", rootElId);
    this._doc.body.appendChild(rootElement);
  }
  removeAllRootElements() {
    if (typeof this._doc.querySelectorAll === "function") {
      this.removeAllRootElementsImpl();
    }
  }
  removeAllRootElementsImpl() {
    const oldRoots = this._doc.querySelectorAll("[id^=root]");
    for (let i = 0; i < oldRoots.length; i++) {
      getDOM().remove(oldRoots[i]);
    }
  }
};
__name(_DOMTestComponentRenderer, "DOMTestComponentRenderer");
__publicField(_DOMTestComponentRenderer, "\u0275fac", \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _DOMTestComponentRenderer, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable }));
__publicField(_DOMTestComponentRenderer, "\u0275prov", \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _DOMTestComponentRenderer }));
var DOMTestComponentRenderer = _DOMTestComponentRenderer;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: DOMTestComponentRenderer, decorators: [{
  type: Injectable
}], ctorParameters: /* @__PURE__ */ __name(() => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }], "ctorParameters") });
var platformBrowserTesting = createPlatformFactory(platformBrowser, "browserTesting");
var _BrowserTestingModule = class _BrowserTestingModule {
};
__name(_BrowserTestingModule, "BrowserTestingModule");
__publicField(_BrowserTestingModule, "\u0275fac", \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _BrowserTestingModule, deps: [], target: FactoryTarget.NgModule }));
__publicField(_BrowserTestingModule, "\u0275mod", \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.0", ngImport: core_exports, type: _BrowserTestingModule, exports: [BrowserModule] }));
__publicField(_BrowserTestingModule, "\u0275inj", \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: _BrowserTestingModule, providers: [
  { provide: APP_ID, useValue: "a" },
  internalProvideZoneChangeDetection({}),
  { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
  { provide: PlatformLocation, useClass: MockPlatformLocation },
  { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }
], imports: [BrowserModule] }));
var BrowserTestingModule = _BrowserTestingModule;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: core_exports, type: BrowserTestingModule, decorators: [{
  type: NgModule,
  args: [{
    exports: [BrowserModule],
    providers: [
      { provide: APP_ID, useValue: "a" },
      internalProvideZoneChangeDetection({}),
      { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
      { provide: PlatformLocation, useClass: MockPlatformLocation },
      { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }
    ]
  }]
}] });

// angular:test-bed-init:angular:test-bed-init
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});
/*! Bundled license information:

@angular/platform-browser/fesm2022/testing.mjs:
  (**
   * @license Angular v20.3.0
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=test_main.js.map
