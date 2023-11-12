const { pipeline } = require("stream");
const fs = require("fs/promises");
const path = require("path");
const csv = require("csvtojson");

function createCSVtoJSONStream() {
  return csv().subscribe((jsonObject) => {
    for (let key in jsonObject) {
      const value = jsonObject[key];
      delete jsonObject[key];
      // We do it here, because in the txt file example, 
      // key names start from lower case
      const normalizedKey = key.toLowerCase()
      jsonObject[normalizedKey] = value;
    }
    
    console.log("CSV row tranform")
  });
}

async function runCSVTransformation() {
  console.log("[CSV-to-JSON] Start file transformation");

  const originalFilePath = path.resolve(
    __dirname,
    "csvdirectory",
    "nodejs-hw1-ex1.csv"
  );
  const destinationFilePath = path.resolve(__dirname, "nodejs-hw1-ex2.txt");

  const [originalFileHandle, destinationFileHandle] = await Promise.all([
    fs.open(originalFilePath),
    fs.open(destinationFilePath, "w"),
  ]);
  const originalFileStream = originalFileHandle.createReadStream();

  const destinationFileStream = destinationFileHandle.createWriteStream({
    encoding: "utf8",
  });

  const transformStream = createCSVtoJSONStream();

  pipeline(
    originalFileStream,
    transformStream,
    destinationFileStream,
    (error) => {
      if (error) {
        console.error(`[ERROR WHILE WORKING WITH CSV]: ${error}`);
      }

      console.log("[CSV-to-JSON] File transformation finished");
    }
  );
}

runCSVTransformation();
