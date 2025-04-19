import { getFileExtension } from "../helpers/fileExtension";

export default async function renameFile(fileName: string, newName: string) {
    try {
        if (!fileName || !newName) return false;
        
        await fetch(`http://127.0.0.1:8000/api/files/update/${fileName}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: `${newName}${getFileExtension(fileName)}` })
        });
        
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}