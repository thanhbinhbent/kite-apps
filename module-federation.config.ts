export const mesm = {
  development: {
    tansaApp: "http://localhost:8081/remoteEntry.js",
  },
  githubPage: {
    tansaApp: "https://thanhbinhbent.github.io/tansa-app/remoteEntry.js",
  },
  staging: {
    tansaApp: "https://tansa-stg.thanhbinhbent.com/remoteEntry.js",
  },
  production: {
    tansaApp: "https://tansa-prod.thanhbinhbent.com/remoteEntry.js",
  },
} as const;

export type Environment = keyof typeof mesm;

export const getEnvironmentConfig = () => {
  const env = (process.env.NODE_ENV || "development").trim() as Environment;
  console.log("Environments:", env);
  console.log("Base URL", mesm[env]);
  if (!mesm[env]) {
    console.warn(
      `Unknown NODE_ENV: ${process.env.NODE_ENV}, defaulting to "development"`
    );
    return mesm.development;
  }
  return mesm[env];
};

const envConfig = getEnvironmentConfig();

export const mfConfig = {
  name: "kite_app",
  exposes: {},
  shared: ["react", "react-dom"],
  remotes: {
    tansaApp: `tansaApp@${envConfig.tansaApp}`,
  },
};
