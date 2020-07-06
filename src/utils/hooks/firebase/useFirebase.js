import { useEffect } from "react";
import { domUtils } from "../../domUtils";
import { firebaseConstants, getFirebaseConfig } from "./firebase.utils";

export const useFirebase = () => {
  const onFirebaseAppLoaded = () => {
    const firebaseConfig = getFirebaseConfig();
    window.firebase.initializeApp(firebaseConfig);
  };

  const onFirebaseAnalyticsLoaded = () => {
    if (window.firebase && typeof window.firebase.analytics === "function") {
      window.firebase.analytics();
    }
  };

  useEffect(() => {
    const firebaseConfig = getFirebaseConfig();
    if (firebaseConfig) {
      const firebaseAppScript = domUtils.createScriptTag({
        src: firebaseConstants.scripts.appUri,
        onScriptLoad: onFirebaseAppLoaded,
      });

      const firebaseAnalyticsScript = domUtils.createScriptTag({
        src: firebaseConstants.scripts.analyticsUri,
        onScriptLoad: onFirebaseAnalyticsLoaded,
      });

      domUtils.appendScriptsToBody([
        firebaseAppScript,
        firebaseAnalyticsScript,
      ]);
    }
  }, []);
};
