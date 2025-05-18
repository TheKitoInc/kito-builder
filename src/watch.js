import { watch } from "chokidar";
import { getRelativePath } from "./fileSystem.js";

const runWatch = function (src, callback) {
  // Watch for changes in the source directory
  watch(src).on("all", (event, path) => {
    if (event === "change") {
      // Process the file with the plugins
      console.log(`File ${event}: ${path}`);

      // Process the file with the plugins
      callback(getRelativePath(src, path));
    }
  });
};

export { runWatch };
