import { launchServer } from "./server.js";
import { runWatch } from "./watch.js";

const launchModule = function (port, src, dest, buildFunction) {
  runWatch(src, buildFunction);
  launchServer(dest, port);
};

export { launchModule };
