import {
  AuthService,
  init_auth_service
} from "./chunk-WMV5C3HC.js";
import {
  Router,
  init_router
} from "./chunk-CJXQ6SPB.js";
import "./chunk-BHR2WOUR.js";
import "./chunk-Q3HEFWR4.js";
import {
  Injectable,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-Q6HBEQPX.js";
import {
  __name,
  __publicField
} from "./chunk-SK4CH4QL.js";

// src/app/services/auth/auth.guard.spec.ts
init_testing();

// src/app/services/auth/auth.guard.ts
init_tslib_es6();
init_core();
init_router();
init_auth_service();
var _a;
var AuthGuard = (_a = class {
  auth;
  router;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}, __name(_a, "AuthGuard"), __publicField(_a, "ctorParameters", /* @__PURE__ */ __name(() => [
  { type: AuthService },
  { type: Router }
], "ctorParameters")), _a);
AuthGuard = __decorate([
  Injectable({
    providedIn: "root"
  })
], AuthGuard);

// src/app/services/auth/auth.guard.spec.ts
describe("AuthGuard", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=spec-auth.guard.spec.js.map
