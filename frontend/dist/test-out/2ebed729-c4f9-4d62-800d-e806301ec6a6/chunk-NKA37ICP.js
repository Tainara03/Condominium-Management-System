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
  __name
} from "./chunk-SK4CH4QL.js";

// src/app/services/auth/auth.service.ts
var _a, AuthService;
var init_auth_service = __esm({
  "src/app/services/auth/auth.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    AuthService = (_a = class {
      userType = signal(null);
      isLoggedIn = computed(() => this.userType() !== null);
      loginAs(type) {
        this.userType.set(type);
      }
      logout() {
        this.userType.set(null);
      }
      getUserType() {
        return this.userType();
      }
    }, __name(_a, "AuthService"), _a);
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
//# sourceMappingURL=chunk-NKA37ICP.js.map
