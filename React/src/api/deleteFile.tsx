export default async function deleteFile(fileName: string) {
    try {
        if (!fileName) return false;
        
        await fetch(`http://127.0.0.1:8000/api/files/delete/${fileName}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}