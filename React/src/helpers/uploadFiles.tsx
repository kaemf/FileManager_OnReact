import uploadFile from "../api/uploadFile";

export default async function UploadMultipleButton() {
    return new Promise<any[]>((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        
        input.onchange = async (event) => {
            const target = event.target as HTMLInputElement;
            const files = target.files;
            let result: any[] = [];

            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    console.log(file);
                    await uploadFile(file, file.name);
                    result.push(file);
                }
            }

            resolve(result);
        };

        input.click();
    });
}