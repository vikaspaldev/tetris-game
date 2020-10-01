import { renderHook } from "@testing-library/react-hooks";
import { useFirebase } from "../useFirebase";
import * as firebaseUtils from "../firebase.utils";
import { domUtils } from "../../../domUtils";

const getFirebaseConfigMock = jest.spyOn(firebaseUtils, "getFirebaseConfig");

jest.mock("../../../domUtils");

const mockConfigWithValue = () => {
  getFirebaseConfigMock.mockReturnValue({
    configKey: "configValue",
  });
};

const mockConfigWithoutValue = () => {
  getFirebaseConfigMock.mockReturnValue(undefined);
};

describe("useFirebase", () => {
  beforeEach(() => {
    window.firebase = {
      initializeApp: jest.fn(),
      analytics: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should load the scripts", async () => {
    mockConfigWithValue();

    renderHook(() => useFirebase());

    expect(domUtils.createScriptTag).toHaveBeenCalledTimes(2);
    expect(domUtils.appendScriptsToBody).toBeCalledTimes(1);
  });

  it("should not load the scripts", async () => {
    mockConfigWithoutValue();

    renderHook(() => useFirebase());

    expect(domUtils.createScriptTag).not.toHaveBeenCalled();
    expect(domUtils.appendScriptsToBody).not.toBeCalled();
  });

  it("should call the initializeApp callback", async () => {
    mockConfigWithValue();

    let onFirebaseAppLoad;

    domUtils.createScriptTag.mockImplementationOnce(({ onScriptLoad }) => {
      onFirebaseAppLoad = onScriptLoad;
    });

    renderHook(() => useFirebase());

    onFirebaseAppLoad();
    expect(window.firebase.initializeApp).toHaveBeenCalledTimes(1);
    expect(window.firebase.initializeApp).toHaveBeenCalledWith({
      configKey: "configValue",
    });
  });

  it("should call the analytics callback", async () => {
    mockConfigWithValue();

    let onAnalyticsLoad;

    domUtils.createScriptTag
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(({ onScriptLoad }) => {
        onAnalyticsLoad = onScriptLoad;
      });

    renderHook(() => useFirebase());

    onAnalyticsLoad();
    expect(window.firebase.analytics).toHaveBeenCalledTimes(1);
  });

  it("should not call the analytics callback when function is not available on window", async () => {
    mockConfigWithValue();
    window.firebase.analytics = undefined;

    let onAnalyticsLoad;

    domUtils.createScriptTag
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(({ onScriptLoad }) => {
        onAnalyticsLoad = onScriptLoad;
      });

    renderHook(() => useFirebase());

    onAnalyticsLoad();
    expect(() => {
      expect(window.firebase.analytics).not.toHaveBeenCalled();
    }).toThrowError();
  });
});
