import {
  Router,
  init_router
} from "./chunk-CJXQ6SPB.js";
import {
  Injectable,
  __decorate,
  computed,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-Q6HBEQPX.js";
import {
  __esm,
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// src/app/services/auth/auth.service.ts
var _a, AuthService;
var init_auth_service = __esm({
  "src/app/services/auth/auth.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_router();
    AuthService = (_a = class {
      router;
      constructor(router) {
        this.router = router;
      }
      userType = signal(null);
      isLoggedIn = computed(() => this.userType() !== null);
      loginAs(type) {
        this.userType.set(type);
      }
      logout() {
        this.userType.set(null);
        this.router.navigate(["/login"]);
      }
      getUserType() {
        return this.userType();
      }
    }, __name(_a, "AuthService"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
      { type: Router }
    ], "ctorParameters")), _a);
    AuthService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], AuthService);
  }
});

export {
  AuthService,
  init_auth_service
};
//# sourceMappingURL=chunk-WMV5C3HC.js.map
