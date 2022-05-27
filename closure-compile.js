
const fs = require("fs");
const ClosureCompiler = require('google-closure-compiler').compiler;
const path = require("path");
const { exec } = require('child_process');

const compressFiles = (directoryPath) => {
  const filesInDirectory = fs.readdirSync(directoryPath);
  filesInDirectory.map((file) => {
      const filePath = path.join(directoryPath, file);

      if (filePath.endsWith(".js")) {
        const closureCompiler = new ClosureCompiler({
          js: filePath,
          languageIn: "ECMASCRIPT_2021",
          languageOut: "NO_TRANSPILE",
          jscompOff: '*'
        });
        closureCompiler.run((exitCode, stdOut, stdErr) => {
          if (stdErr) {
            console.log(`Error in ${filePath}: ${exitCode}`);
            return;
          }
          console.log(filePath);
          if (stdOut) {
            fs.writeFileSync(filePath, stdOut);
          }
        });
      }

      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
          return compressFiles(filePath);
      }
  });
};

compressFiles("dist");