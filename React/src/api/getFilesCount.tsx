export default async function getFilesCount(){
    try{
        const response = await fetch(`http://127.0.0.1:8000/api/files/count`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
    
        return data.total;
    } catch (e) {
        console.log(e);
    }
  };