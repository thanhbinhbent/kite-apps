import { mfConfig } from "./module-federation.config";
// @ts-expect-error
import TansaApp from "tansaApp/App";
// import OtherApp from "otherApp/App";

const appComponentMap: Record<string, React.ComponentType<any>> = {
  tansaApp: TansaApp,
  // Add new other apps components here
  // otherApp: OtherApp
};

export type MicroAppMetaData = {
  id: string;
  name: string;
  logo: string;
  url: string;
  component: React.ComponentType<any>;
  category: string;
  author: { name: string; email: string }[];
  description: string;
  gitRemote: string;
  history: any[];
};

export async function getMicroAppMetaData(): Promise<MicroAppMetaData[]> {
  console.log("Fetching micro app metadata...");

  const remoteEntries = Object.entries(mfConfig.remotes);
  if (remoteEntries.length === 0) {
    console.error("mfConfig.remotes is empty!", mfConfig.remotes);
  }

  const results = await Promise.all(
    remoteEntries.map(async ([key, value]) => {
      console.log(`Fetching metadata for: ${key} → ${value}`);

      if (typeof value !== "string") {
        console.error(`Invalid remote value for ${key}:`, value);
        return null;
      }

      const [, remoteUrl] = value.split("@");
      if (!remoteUrl) {
        console.error(`Invalid remote format for ${key}:`, value);
        return null;
      }

      const metadataUrl = `${new URL(remoteUrl).origin}/meta-data.json`;
      console.log("metadataUrl", metadataUrl);
      try {
        console.log(`Fetching metadata from: ${metadataUrl}`);
        const response = await fetch(metadataUrl);
        if (!response.ok) {
          console.error(`Failed to fetch metadata from ${metadataUrl}`);
          return null;
        }

        const metadata = await response.json();
        console.log("Fetched metadata:", metadata);

        return {
          id: metadata.id || key,
          name: metadata.name || key,
          logo: `${new URL(remoteUrl).origin}/favicon.ico`,
          url: remoteUrl,
          component:
            appComponentMap[key] ?? (() => <div>App Component Not Found</div>),
          category: metadata.category || "Uncategorized",
          author: metadata.author || [],
          description: metadata.description || "",
          gitRemote: metadata.gitRemote || "",
          history: metadata.history || [],
        } as MicroAppMetaData;
      } catch (error) {
        console.error(`Error fetching metadata for ${key}:`, error);
        return null;
      }
    })
  );

  const validResults = results.filter(
    (app): app is MicroAppMetaData => app !== null
  );
  console.log("Final micro app metadata:", validResults);

  return validResults;
}
