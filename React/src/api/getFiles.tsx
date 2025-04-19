export default async function getFiles(offset: number, limit: number, sortBy: string, order: 'asc' | 'desc') {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  if (sortBy && order) {
    params.append('sortBy', sortBy);
    params.append('order', order);
  }

  const response = await fetch(`http://127.0.0.1:8000/api/files?${params.toString()}`);
  const data = await response.json();
  return data;
}