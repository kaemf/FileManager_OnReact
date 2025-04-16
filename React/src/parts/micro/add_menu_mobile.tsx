import { useEffect, useState } from "react";

export default function AddMenuMobile() {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const add_menu = document.querySelector('.additional-menu'),
            app_header = document.querySelector('.App-header'),
            clickedElement = document.querySelector('.additional-menu-mobile');

        if (add_menu) {
            add_menu.classList.toggle('active');
        }

        if (app_header){
            app_header.classList.toggle('active');
        }

        if (clickedElement) {
            clickedElement.classList.toggle('active');
        }
    }, [clicked]);

    const handleClick = () => { setClicked(!clicked); }

    return (
        <div className="additional-menu-mobile">
            <div className="menu-item item-course hoverd" onClick={handleClick}>
                <div className="title">Курси</div>
            </div>
            <div className="menu-item hoverd">
                <div className="title">Тренінги</div>
            </div>
            <div className="menu-item hoverd">
                <div className="title">Аналітичний центр</div>
            </div>
        </div>
    )
}