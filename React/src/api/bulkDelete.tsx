export default async function bulkDeleteFiles(
    offset: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc'
  ) {
    const payload: any = { offset, limit };
    if (sortBy) payload.sortBy = sortBy;
    if (order) payload.order = order;
  
    const response = await fetch('http://127.0.0.1:8000/api/files/bulk/delete', {
      method: 'DELETE', // <-- обрати внимание: лучше POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete files');
    }
  
    const data = await response.json();
    return data;
}