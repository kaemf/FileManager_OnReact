export default async function uploadFile(file: File, name: string) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        const response = await fetch('http://127.0.0.1:8000/api/files', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};