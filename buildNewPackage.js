"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const archiver_1 = __importDefault(require("archiver"));
(async () => {
    // We will start by getting the package.json
    const JSONFiles = await Promise.all([
        (0, promises_1.readFile)('./package.json', 'utf-8'),
        (0, promises_1.readFile)('./module.json', 'utf-8')
    ]);
    // We will then parse the JSON
    const [packageData, moduleData] = JSONFiles.map((file) => JSON.parse(file));
    // If we haven't updated the version in the module.json file, we will do it now
    if (packageData.version !== moduleData.version) {
        moduleData.version = packageData.version;
        console.log(`Updated version to ${packageData.version}`);
        await (0, promises_1.writeFile)('./module.json', JSON.stringify(moduleData, null, 2));
    }
    // We will copy our root module.json into the src directory
    await (0, promises_1.writeFile)('./src/module.json', JSON.stringify(moduleData, null, 2));
    // We will then delete the potatoOrNot.zip so we can create a new one
    if ((0, fs_1.existsSync)('./potatoOrNot.zip'))
        await (0, promises_1.unlink)('./potatoOrNot.zip');
    // We will then create a new zip file
    const output = (0, fs_1.createWriteStream)('./potatoOrNot.zip');
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    output.on('close', () => {
        console.log(`Created potatoOrNot.zip (${archive.pointer()} total bytes)`);
    });
    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            console.warn(err);
        }
        else {
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
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGROZXdQYWNrYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGROZXdQYWNrYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMENBQTBEO0FBQzFELDJCQUFtRDtBQUNuRCx3REFBZ0M7QUFFaEMsQ0FBQyxLQUFLLElBQUcsRUFBRTtJQUNSLDRDQUE0QztJQUM1QyxNQUFNLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDakMsSUFBQSxtQkFBUSxFQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQztRQUNuQyxJQUFBLG1CQUFRLEVBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztLQUNwQyxDQUFDLENBQUM7SUFFSiw4QkFBOEI7SUFDOUIsTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUUsK0VBQStFO0lBQy9FLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsT0FBTyxFQUFDO1FBQzdDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUV6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUEsb0JBQVMsRUFBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkU7SUFFRCwyREFBMkQ7SUFDM0QsTUFBTSxJQUFBLG9CQUFTLEVBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUUscUVBQXFFO0lBQ3JFLElBQUksSUFBQSxlQUFVLEVBQUMsbUJBQW1CLENBQUM7UUFBRSxNQUFNLElBQUEsaUJBQU0sRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXZFLHFDQUFxQztJQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFpQixFQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBQSxrQkFBUSxFQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFeEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzVCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjthQUFNO1lBQ0wsY0FBYztZQUNkLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDMUIsTUFBTSxHQUFHLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFckIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFbkMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUEifQ==