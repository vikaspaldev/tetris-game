export const firebaseConstants = {
  scripts: {
    appUri: "https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js",
    analyticsUri:
      "https://www.gstatic.com/firebasejs/7.15.5/firebase-analytics.js",
  },
};

export const getFirebaseConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const config = process.env.REACT_APP_FIREBASE_CONFIG;
  return JSON.parse(config);
};
