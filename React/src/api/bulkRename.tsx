export default async function bulkRenameFiles(offset: number, limit: number, prefix: string, sortBy: string, order: 'asc' | 'desc') {
    const response = await fetch('http://127.0.0.1:8000/api/files/bulk/rename', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ offset, limit, prefix, sortBy, order }), // тут важно передать sorted!
    });
  
    if (!response.ok) {
      throw new Error('Failed to rename files');
    }
  
    const data = await response.json();
    return data;
}