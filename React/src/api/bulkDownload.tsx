export async function bulkDownload(offset: number, limit: number) {
    try{
        const response = await fetch(`http://127.0.0.1:8000/api/files/bulk/download?offset=${offset}&limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to download the zip file');
        }
      
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'files.zip';
        a.click();
        window.URL.revokeObjectURL(url);
    }
    catch(e){
        console.log(e);
    }
}