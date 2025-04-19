import axios from 'axios';

const handleDownload = async (fileName: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/files/download/${encodeURIComponent(fileName)}`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Ошибка при скачивании файла', error);
    }
};

export default handleDownload;