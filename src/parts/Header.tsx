import logo from '../assets/logo.png';
import arrow from '../assets/menu-item-arrow.png';
import other from '../assets/other.png';
import phone from '../assets/phone.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import youtube from '../assets/youtube.png';
import health_care from '../assets/health-care.png';
import profile from '../assets/profile.png';
import { useEffect, useState } from 'react';

export default function Header() {
    const [clicked, setClicked] = useState(false);
    const [headerMenu, setHeaderMenu] = useState(false);

    useEffect(() => {
        const add_menu = document.querySelector('.additional-menu'),
            app_header = document.querySelector('.App-header'),
            arrow = document.querySelector('.item-course-arrow'),
            clickedElement = document.querySelector('.item-course');

        if (add_menu) {
            add_menu.classList.toggle('active');
        }

        if (app_header){
            app_header.classList.toggle('active');
        }

        if (arrow) {
            arrow.classList.toggle('active');
        }

        if (clickedElement) {
            clickedElement.classList.toggle('active');
            clickedElement.classList.toggle('hoverd');
        }
    }, [clicked]);

    useEffect(() => {
        const headerMenu = document.querySelector('.menu');

        if (headerMenu) {
            headerMenu.classList.toggle('active');
        }
    }, [headerMenu]);

    const handleClick = () => { setClicked(!clicked); }
    const handleHeaderClick = () => { setHeaderMenu(!headerMenu); }

    return (
        <header className="App-header">
            <div className="menu-and-logo">
                <div className="logo">
                    <img src={logo} className="logo-img" alt="logo" />
                    <div className="line"></div>
                    <div className="title">
                        Інститут лідерства,
                        управління і коучингу
                    </div>
                </div>

                <div className="menu">
                    <div className="menu-item item-course hoverd" onClick={handleClick}>
                        <div className="title">Курси</div>
                        <img src={arrow} alt="" className="arrow-menu item-course-arrow" />
                    </div>
                    <div className="menu-item hoverd">
                        <div className="title">Тренінги</div>
                        <img src={arrow} alt="" className="arrow-menu" />
                    </div>
                    <div className="menu-item hoverd">
                        <div className="title">Аналітичний центр</div>
                    </div>
                </div>
                <img src={other} alt="" className="other-img" onClick={handleHeaderClick} />
            </div>

            <div className="social-and-sign">
                <div className="phone">
                    <img src={phone} alt="" className="phone-img" />
                    <div className="phone-number">+38 (099) 123-4567</div>
                </div>

                <div className="socials">
                    <img src={instagram} alt="" className="social" />
                    <img src={facebook} alt="" className="social" />
                    <img src={youtube} alt="" className="social" />
                </div>

                <div className="line-bolder"></div>

                <img src={health_care} alt="" className="health-care-img" />

                <div className="line-bolder"></div>

                <div className="sign-up">
                    <img src={profile} alt="" className="profile-img" />
                    <div className="title">Увійти</div>
                </div>
            </div>
        </header>
    );
}