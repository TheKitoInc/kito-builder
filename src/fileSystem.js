import fs from "fs";
import path from "path";

const isDirectory = function (filePath) {
  if (!exists(filePath)) return false;

  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
};

const isFile = function (filePath) {
  if (!exists(filePath)) return false;

  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};

const exists = function (filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
};

const getPath = function (strPath) {
  return path.resolve(strPath);
};

const getRelativePath = function (basePath, fullPath) {
  if (basePath === undefined || basePath === null) {
    throw new Error("Base path is required");
  }

  if (fullPath === undefined || fullPath === null) {
    throw new Error("Full path is required");
  }

  const relativePath = path.relative(basePath, fullPath);

  return relativePath;
};

const mergePaths = function (basePath, relativePath) {
  if (basePath === undefined || basePath === null) {
    throw new Error("Base path is required");
  }
  if (relativePath === undefined || relativePath === null) {
    throw new Error("Relative path is required");
  }
  return path.join(basePath, relativePath);
};

export { exists, isDirectory, isFile, getPath, mergePaths, getRelativePath };
