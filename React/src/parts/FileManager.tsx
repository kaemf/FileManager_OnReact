import ComboBox from "./micro/combo";
import upload from '../assets/upload.png';
import trash from '../assets/trash.png';
import edit from '../assets/edit.png';
import download from '../assets/download.png';
import share from '../assets/share.png';
import zoom from '../assets/zoom.png';
import sort from '../assets/sort.png';
import fileIcon from '../assets/file-icon.png';
import fileApprove from '../assets/file-aprove.png';
import fileDeclined from '../assets/file-decline.png';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react";

function GetFiles(page: number, limit: number) {
    const fileElements: any[] = [];

    for (let i = page * limit; i < (page * limit) + 12; i++) {
      fileElements.push(
        <div className="file-item">
            <div className="aproove-block">
                <img src={fileApprove} alt="" className="file-icon-add file-approve" />
                <img src={fileDeclined} alt="" className="file-icon-add file-declined" />
            </div>
            <div className="main-information">
                <img src={fileIcon} alt="" className="file-icon" />
                <div className="file-name">File name {i + 1}</div>
            </div>
            <div className="toolkit-block">
                <div className="instrument-container"><img src={download} alt="" className="file-intsrument instrument-download" /></div>
                <div className="instrument-container"><img src={share} alt="" className="file-intsrument instrument-share" /></div>
                <div className="instrument-container"><img src={edit} alt="" className="file-intsrument instrument-edit" /></div>
            </div>
        </div>
      )
    }

    return fileElements;
}

export default function FileManager() {
    const [page, setPage] = useState(1);
    const [sortValue, setSort] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleComboBoxChange = (value: string | null) => {
        setSort(value);
    };

    // useEffect(() => {
    //     console.log('Обновленное значение:', sortValue);
    // }, [sortValue]);

    return (
        <div className="file-manager">
            <div className="instrument-panel">
                <div className="instruments">
                    <label className="custom-container">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>

                    <div className="main-instruments">
                        <div className="instrument-container"><img src={upload} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container"><img src={trash} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container"><img src={edit} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container"><img src={download} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container"><img src={share} alt="" className="instrument-icon" /></div>
                        <div className="instrument-container"><img src={zoom} alt="" className="instrument-icon" /></div>
                    </div>
                </div>
                <div className="filter">
                    <div className="main-filter-container">
                        <ComboBox onChange={handleComboBoxChange} />
                        <div className="sort-container">
                            <img src={sort} alt="" className="sort" />
                        </div>
                    </div>
                    <div className="decline-all-filters"></div>
                </div>
            </div>

            <div className="file-list">
                {GetFiles(page - 1, 12)}
            </div>

            <div className="navigation">
                <Pagination
                    count={9}               // количество страниц
                    page={page}      // текущая страница (controlled)
                    onChange={handleChange} // колбэк при переключении
                    siblingCount={0}        // количество соседей рядом с текущей
                    boundaryCount={1}       // количество крайних страниц в начале и конце
                    variant="text"      // стиль: 'text' | 'outlined'
                    shape="rounded"         // форма: 'circular' | 'rounded'
                    size="large"            // размер: 'small' | 'medium' | 'large'
                    color="standard"         // цвет: 'primary' | 'secondary' | 'standard'
                />
            </div>
        </div>
    )
}