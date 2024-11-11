import * as fs from 'fs';
import * as path from 'path';

export const deleteFolderRecursive = (directoryPath: string) => {
        if (fs.existsSync(directoryPath)) {
                fs.readdirSync(directoryPath).forEach((file) => {
                        const curPath = path.join(directoryPath, file);
                        if (fs.lstatSync(curPath).isDirectory()) { // recurse
                                deleteFolderRecursive(curPath);
                        } else { // delete file
                                fs.unlinkSync(curPath);
                        }
                });
                fs.rmdirSync(directoryPath);
        }
};

// const pathsToDelete = [
//         path.join(__dirname, '/result.json'),
//         path.join(__dirname, './Data')
// ]

const folderPath = path.join(__dirname, './tests');
deleteFolderRecursive(folderPath);
console.log('Folder removed successfully');