import ComboBox from "./micro/combo";
import upload from '../assets/upload.png';
import trash from '../assets/trash.png';
import edit from '../assets/edit.png';
import download from '../assets/download.png';
import share from '../assets/share.png';
import zoom from '../assets/zoom.png';
import sort from '../assets/sort.png';
import resetOrClose from '../assets/reset-or-close.png';
import fileIcon from '../assets/file-icon.png';
import fileApprove from '../assets/file-aprove.png';
import fileDeclined from '../assets/file-decline.png';
import Pagination from '@mui/material/Pagination';
import UploadMultipleButton from "../helpers/uploadFiles";
import getFiles from '../api/getFiles';
import { useEffect, useState } from "react";
import limitFiles from "../helpers/limitFiles";
import getFilesCount from "../api/getFilesCount";
import handleDownload from "../api/downloadFile";
import shortenFileName from "../helpers/shortFileName";
import { getFileExtension, removeFileExtension } from "../helpers/fileExtension";
import renameFile from "../api/renameFile";
import deleteFile from "../api/deleteFile";
import { bulkDownload } from "../api/bulkDownload";
import bulkRenameFiles from "../api/bulkRename";
import bulkDelete from "../api/bulkDelete";

export default function FileManager() {
    const [page, setPage] = useState(1);
    const [sortValue, setSort] = useState<string>('name');
    const [orderValue, setOrderValue] = useState<'asc' | 'desc'>('desc');
    const [clickedDownload, setClickedDownload] = useState(false);
    const [filesData, setFilesData] = useState<any[]>([]);
    const [pageAmount, setPageAmount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [groupOperation, setGroupOperation] = useState(false);

    const fetchFiles = async () => {
        setIsLoading(true);
        try {
            const files = await getFiles((page - 1) * limitFiles(window.innerWidth), limitFiles(window.innerWidth), sortValue, orderValue);
            const filesCount = await getFilesCount();
            
            setFilesData(files);
            console.log(files);
            setPageAmount(Math.ceil(filesCount / limitFiles(window.innerWidth)));
        } catch (error) {
            console.error("Ошибка при загрузке файлов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [page, sortValue, orderValue]);

    const handleUploadClick = async () => {
        try {
            const uploadResult = await UploadMultipleButton();
            const filesCount = await getFilesCount();
    
            if (uploadResult && uploadResult.length > 0) {
                if (Math.ceil(filesCount / limitFiles(window.innerWidth)) <= 1) {
                    setFilesData(prevFiles => [...prevFiles, ...uploadResult]);
                }
            }
    
            setPageAmount(Math.ceil(filesCount / limitFiles(window.innerWidth)));
        } catch (error) {
            console.error("Ошибка при загрузке файлов:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleComboBoxChange = (value: string) => {
        setSort(value);
    };

    const handleOrderChange = () => {
        document.querySelector('.sort-container')?.classList.toggle('active');
        setOrderValue(orderValue === 'asc' ? 'desc' : 'asc');
    }

    const hanldeClickEdit = (e: React.MouseEvent<HTMLElement>) => {
        const fileItem = (e.target as HTMLElement).closest('.file-item');
        if (!fileItem) return;
    
        const input = fileItem.querySelector('.edit-field') as HTMLInputElement | null,
              fileName = fileItem.querySelector('.file-name') as HTMLElement | null;
        if (input && fileName) {
            if (input.classList.contains('active')) {
                input.classList.remove('active');
            }
            else{
                input.classList.add('active');
                input.focus();
            }
            fileName.classList.toggle('unactive');
        }
    }

    const handleClickApprove = (e: React.MouseEvent<HTMLElement>, _fileName: string) => {
        const asyncFunction = async () => {
            const fileItem = (e.target as HTMLElement).closest('.file-item');
            if (!fileItem) return;
        
            const input = fileItem.querySelector('.edit-field') as HTMLInputElement | null,
                fileName = fileItem.querySelector('.file-name') as HTMLElement | null;

            if (input && fileName) {
                if (await renameFile(_fileName, input.value as string)) {
                    fileName.textContent = `${input.value}${getFileExtension(fileName.textContent as string)}`;
                }

                if (input.classList.contains('active') && fileName.classList.contains('unactive')) {
                    input.classList.remove('active');
                    fileName.classList.remove('unactive');
                }
            }
        }

        asyncFunction();
    }

    const deleteFileHandler = (e: React.MouseEvent<HTMLElement>, fileName: string) => {
        const asyncFunction = async () => {
            const fileItem = (e.target as HTMLElement).closest('.file-item');
            if (!fileItem) return;

            if (fileName) {
                if (await deleteFile(fileName)){
                    fileItem.remove();
                }
            }
        }
        asyncFunction();
    }

    const changeGroupOperationStatusHandler = () => {
        setGroupOperation(!groupOperation);
    }

    const handleBulkDownload = () => {
        const asyncFunction = async () => {
            if (groupOperation) {
                await bulkDownload((page - 1) * limitFiles(window.innerWidth), limitFiles(window.innerWidth));
            }
        }

        asyncFunction();
    }

    const hanldeClickBulkEdit = (e: React.MouseEvent<HTMLElement>) => {
        const asyncFunction = async () => {
            const mainConteiner = (e.target as HTMLElement).closest('.instrument-container.edit');

            if (mainConteiner) {
                const input = mainConteiner.querySelector('.bulk-edit-field') as HTMLInputElement | null;
                if (input) {
                    if (input.classList.contains('active')) {
                        input.classList.remove('active');
                        if (input.value) {
                            await bulkRenameFiles((page - 1) * limitFiles(window.innerWidth), limitFiles(window.innerWidth), input.value as string, sortValue, orderValue);
                            const items = document.querySelectorAll('.file-name');
                            items.forEach((item, index) => {
                                const reverseIndex = orderValue === 'asc' ? index : items.length - 1 - index;
                                item.textContent = shortenFileName(`${input.value}_${reverseIndex}`);
                            });
                        }
                    }
                    else{
                        input.classList.add('active');
                        input.focus();
                    }
                }
            }
        }

        asyncFunction();
    }

    const handleBulkDelete = () => {
        const asyncFunction = async () => {
            if (groupOperation) {
                await bulkDelete((page - 1) * limitFiles(window.innerWidth), limitFiles(window.innerWidth), sortValue, orderValue);
                fetchFiles();
            }
        }

        asyncFunction();
    }


    const handleResetAllFilters = () => {
        setSort('name');
        setOrderValue('desc');
        document.querySelector('.sort-container')?.classList.remove('active');
    }

    return (
        <div className="file-manager">
            <div className="instrument-panel">
                <div className="instruments">
                    <label className="custom-container">
                        <input onClick={changeGroupOperationStatusHandler} type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>

                    <div className="main-instruments">
                        <div className="instrument-container" onClick={handleUploadClick}>
                            <img src={upload} alt="" className="instrument-icon" />
                        </div>
                        <div className="instrument-container" onClick={handleBulkDelete}><img src={trash} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container edit">
                            <input type="text" className="bulk-edit-field" />
                            <img src={edit} alt="" className="instrument-icon" onClick={(e) => hanldeClickBulkEdit(e)} />
                        </div>
                        <div className="instrument-container" onClick={handleBulkDownload}>
                            <img src={download} alt="" className="instrument-icon" />
                        </div>
                        <div className="instrument-container"><img src={share} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container"><img src={zoom} alt="" className="instrument-icon" /></div>
                    </div>
                </div>
                <div className="filter">
                    <div className="main-filter-container">
                        <ComboBox onChange={handleComboBoxChange} value={sortValue} />
                        <div onClick={handleOrderChange} className="sort-container">
                            <img src={sort} alt="" className="sort" />
                        </div>
                    </div>
                    <div className="decline-all-filters-container" onClick={handleResetAllFilters}>
                        <img src={resetOrClose} alt="" className="decline-all-filters" />
                    </div>
                </div>
            </div>

            <div className="file-list">
                {isLoading ? (
                    <div className="loading-indicator">Завантаження файлів...</div>
                ) : filesData.length > 0 ? (
                    filesData.map(file => (
                        <div key={file.id} className="file-item">
                            <div className="aproove-block">
                                <img src={fileApprove} onClick={(e) => handleClickApprove(e, file.name)} alt="" className="file-icon-add file-approve" />
                                <img src={fileDeclined} onClick={(e) => deleteFileHandler(e, file.name)} alt="" className="file-icon-add file-delete" />
                            </div>
                            <div className="main-information">
                                <img src={fileIcon} alt="" className="file-icon" />
                                <div className="file-name-and-edit-field">
                                    <div className="file-name">{shortenFileName(file.name)}</div>
                                    <input type="text" name="" id="" className="edit-field" placeholder={removeFileExtension(file.name)} />
                                </div>
                            </div>
                            <div className="toolkit-block">
                                <div className="instrument-container" onClick={() => handleDownload(file.name) }><img src={download} alt="" className="file-intsrument instrument-download" /></div>
                                <div className="instrument-container"><img src={share} alt="" className="file-intsrument instrument-share" /></div>
                                <div className="instrument-container" onClick={(e) => hanldeClickEdit(e)}><img src={edit} alt="" className="file-intsrument instrument-edit" /></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-files-message">Наразі немає файлів в системі. Завантажте їх за допомогою кнопки "Завантажити".</div>
                )}
            </div>

            <div className="navigation">
                <Pagination
                    count={pageAmount}
                    page={page}
                    onChange={handleChange}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="text"
                    shape="rounded"
                    size="large"
                    color="standard"
                />
            </div>
        </div>
    );
}