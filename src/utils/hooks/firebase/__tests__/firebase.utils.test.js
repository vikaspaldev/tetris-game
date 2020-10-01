import { getFirebaseConfig } from "../firebase.utils";

describe("firebaseUtils", () => {
  describe("getFirebaseConfig method", () => {
    let prevEnv;

    beforeAll(() => {
      prevEnv = process.env.NODE_ENV;
    });

    beforeEach(() => {
      process.env.NODE_ENV = prevEnv;
    });

    it("should get the config", () => {
      process.env.NODE_ENV = "production";
      process.env.REACT_APP_FIREBASE_CONFIG = '{"key":"value"}';

      const config = getFirebaseConfig();
      expect(config).toEqual({ key: "value" });
    });

    it("should return undefined if NODE_ENV is not production", () => {
      const config = getFirebaseConfig();
      expect(config).toBeUndefined();
    });
  });
});
