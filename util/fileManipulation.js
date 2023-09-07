const {
  appendFile,
  open,
  writeFile,
  unlink,
  readFile,
} = require("fs/promises");

const { ensureFile } = require("fs-extra");

// Open a File
async function openFile(fileName, data) {
  try {
    const file = await open(fileName, "w");
    await file.write(data);
    console.log(`Opened file: ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to open the file: ${error.message}`);
    return error;
  }
}

// Read the file
async function readThisFile(filePath) {
  try {
    const data = await readFile(filePath);
    // console.log(`Successfully read the file ${filePath}`);
    return data;
  } catch (error) {
    // console.error(`Got an error trying to read the file: ${error.message}`);
    return error;
  }
}

// Create a File
async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data);
    // console.log(`Wrote Data to ${fileName}`);
  } catch (e) {
    // console.error(`Got an error trying to create file: ${error.message}`);
    return error;
  }
}

// Append a file
async function appendToFile(fileName, data, flag) {
  try {
    await appendFile(fileName, data, { flag: flag });
    // console.log(`Appended data to ${fileName}`);
  } catch (error) {
    // console.error(`Got an error trying to append file: ${error.message}`);
    return error;
  }
}

// Delete A file
async function deleteFile(filePath) {
  try {
    await unlink(filePath);
    // console.log(`Deleted ${filePath}`);
  } catch (error) {
    // console.error(`Got an error trying to delete file: ${error.message}`);
    return error;
  }
}

// Ensure If file exists

async function ensureFileExists(filePath) {
  try {
    await ensureFile(filePath);
    // console.log(`${filePath} exists or has been created.`);
  } catch (error) {
    // console.error(`Got an error trying to check file: ${error.message}`);
    return error;
  }
}

exports.openFile = openFile;
exports.readThisFile = readThisFile;
exports.writeToFile = writeToFile;
exports.appendToFile = appendToFile;
exports.deleteFile = deleteFile;
exports.ensureFileExists = ensureFileExists;
