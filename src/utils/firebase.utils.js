export const firebaseConstants = {
  scripts: {
    appUri: "https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js",
    analyticsUri:
      "https://www.gstatic.com/firebasejs/7.15.5/firebase-analytics.js",
  },
};

export const getFirebaseConfig = () => {
  try {
    const config = process.env.REACT_APP_FIREBASE_CONFIG;
    const firebaseConfig = JSON.parse(config);
    return firebaseConfig;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error parsing config");
  }
};
