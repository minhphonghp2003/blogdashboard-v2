const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const prodTargetPath = "./src/environments/environment.ts";
  const devTargetPath = "./src/environments/environment.development.ts";
  // Load node modules
  require("dotenv").config({
    path: ".env",
  });
  // `environment.ts` file structure
  let envEntry = "";
  for (const [key, value] of Object.entries(process.env)) {
    if (key.includes("ng_")) {
      let entry = `${key}: "${value}",\n`;
      envEntry += entry.slice(3, entry.length);
    }
  }

  const envConfigFile = `export const environment = {
 ${envEntry} 
  };
  `;

  writeFile(devTargetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.development.ts file generated correctly at ${devTargetPath} \n`
      );
    }
  });
  writeFile(prodTargetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${prodTargetPath} \n`
      );
    }
  });
};

setEnv();
