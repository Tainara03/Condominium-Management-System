import {
  AuthService,
  init_auth_service
} from "./chunk-WMV5C3HC.js";
import "./chunk-CJXQ6SPB.js";
import "./chunk-BHR2WOUR.js";
import "./chunk-Q3HEFWR4.js";
import {
  TestBed,
  init_testing
} from "./chunk-Q6HBEQPX.js";
import "./chunk-SK4CH4QL.js";

// src/app/services/auth/auth.service.spec.ts
init_testing();
init_auth_service();
describe("AuthService", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=spec-auth.service.spec.js.map
