import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync, createWriteStream } from 'fs';
import archiver from 'archiver';

(async() => {
   // We will start by getting the package.json
   const JSONFiles = await Promise.all([
      readFile('./package.json', 'utf-8'),
      readFile('./module.json', 'utf-8')
   ]);

  // We will then parse the JSON
  const [packageData, moduleData] = JSONFiles.map((file) => JSON.parse(file));

  // If we haven't updated the version in the module.json file, we will do it now
  if (packageData.version !== moduleData.version){
    moduleData.version = packageData.version;

    console.log(`Updated version to ${packageData.version}`);
    await writeFile('./module.json', JSON.stringify(moduleData, null, 2));
  }

  // We will copy our root module.json into the src directory
  await writeFile('./src/module.json', JSON.stringify(moduleData, null, 2));

  // We will then delete the potatoOrNot.zip so we can create a new one
  if (existsSync('./potatoOrNot.zip')) await unlink('./potatoOrNot.zip');

  // We will then create a new zip file
  const output = createWriteStream('./potatoOrNot.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Created potatoOrNot.zip (${archive.pointer()} total bytes)`);
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.directory('./src/', false);

  archive.finalize();
})()
