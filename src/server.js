import { createServer } from "http";
import { getPath, isDirectory, isFile,mergePaths } from "./fileSystem.js";

const handleRequest = function (rootPath, req, res) {
  console.log(rootPath);
  let requestPath = mergePaths(rootPath,req.url);

  if (isDirectory(requestPath)) {
    requestPath = mergePaths(requestPath, "index.html");
  }

  if (isFile(requestPath)) {
    res.writeHead(200);
    return fs.createReadStream(filePath).pipe(res);
  }

  res.writeHead(404);
  return res.end("Not found");
};

const launchServer = function (root, port) {
  const rootPath = getPath(root);

  if (!isDirectory(rootPath)) throw new Error("Root must be a directory");

  if (!port) throw new Error("No port specified");

  if (isNaN(port)) throw new Error("Port must be a number");

  if (port < 0 || port > 65535)
    throw new Error("Port must be between 0 and 65535");

  const server = createServer(function (req, res) {
    if (req.method === "GET") {
      handleRequest(rootPath, req, res);
    } else {
      res.writeHead(405);
      res.end("Method not allowed");
    }
  });

  server.listen(port, function () {
    console.log(`Server running at http://localhost:${port}/`);
  });
  server.on("error", function (err) {
    console.error("Error starting server:", err);
  });
  server.on("request", function (req, res) {
    console.log("Request received:", req.method, req.url);
  });
  
};

export { launchServer };