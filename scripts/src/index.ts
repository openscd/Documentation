import { join } from "path";
import { env } from "process";
import { GitHubDownloader, GitHubOptions } from "./downloader";

const GH_TOKEN: string = process.env!.GH_TOKEN! || "";

const repositories: GitHubOptions[] = [
  {
    repository: {
      organization: "openscd",
      repository: "open-scd",
    },
    input_path: "docs",
    GH_TOKEN: GH_TOKEN,
    filter: {
      extensions: [".md", ".png"],
    },
    output_path: join("../", "pages", "decisions"),
  },
];

Promise.all(
  repositories
    .map((repo) => new GitHubDownloader(repo))
    .map((repo) => repo.downloadFolder())
)
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
