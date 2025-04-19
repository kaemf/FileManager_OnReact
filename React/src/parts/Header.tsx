import logo from '../assets/logo.png';
import arrow from '../assets/menu-item-arrow.png';
import other from '../assets/other.png';
import phone from '../assets/phone.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import youtube from '../assets/youtube.png';
import health_care from '../assets/health-care.png';
import profile from '../assets/profile.png';
import resetOrClose from '../assets/reset-or-close.png';
import { useEffect, useState } from 'react';

export default function Header() {
    const [clicked, setClicked] = useState(false);
    const [headerMenu, setHeaderMenu] = useState(false);
    const [mobileMenuState, setMobileMenuState] = useState<number>(0);

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
    const handleHeaderClick = (e: React.MouseEvent<HTMLImageElement>) => { 
        setHeaderMenu(!headerMenu); 
        if (!headerMenu){
            const clickedElement = (e.target as HTMLImageElement);
            clickedElement.src = resetOrClose;
        }
        else {
            const clickedElement = (e.target as HTMLImageElement);
            clickedElement.src = other;
        }
    }
    const hadnleMobileHeaderClick = (e: React.MouseEvent<HTMLImageElement>) => {
        const add_mob_menu = document.querySelector('.additional-menu-mobile'),
            add_menu = document.querySelector('.additional-menu'),
            app_header = document.querySelector('.App-header'),
            clickedElement = (e.target as HTMLImageElement);

        if (add_mob_menu && add_menu && app_header) {

            if (!add_mob_menu.classList.contains('active') && !add_menu.classList.contains('active')) {
                add_mob_menu.classList.add('active');
                clickedElement.src = resetOrClose;
                document.querySelector('.App-header')?.classList.add('active');
            }
            else if (add_mob_menu.classList.contains('active') && !add_menu.classList.contains('active')) {
                add_mob_menu.classList.remove('active');
                clickedElement.src = other;
                document.querySelector('.App-header')?.classList.remove('active');
            }
            else if (!add_mob_menu.classList.contains('active') && add_menu.classList.contains('active')) {
                add_menu.classList.remove('active');
                clickedElement.src = other;
                document.querySelector('.App-header')?.classList.remove('active');
            }
        }
    }

    return (
        <header className="App-header">
            <div className="menu-and-logo">
                <div className="logo">
                    <img src={logo} className="logo-img" alt="logo" />
                    {window.innerWidth > 1280 && <div className="line"></div>}
                    {window.innerWidth > 1280 && <div className="title">
                        Інститут лідерства,
                        управління і коучингу
                    </div>}
                </div>

                {window.innerWidth > 550 &&
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
                }
                {window.innerWidth > 550 && <img src={other} alt="" className="other-img" onClick={(e) => handleHeaderClick(e)} />}
            </div>

            <div className="social-and-sign">
                <div className="phone">
                    <img src={phone} alt="" className="phone-img" />
                    <div className="phone-number">+38 (099) 123-4567</div>
                </div>

                {window.innerWidth > 550 &&
                <div className="socials">
                    <img src={instagram} alt="" className="social" />
                    <img src={facebook} alt="" className="social" />
                    <img src={youtube} alt="" className="social" />
                </div>
                }

                {window.innerWidth > 550 && <div className="line-bolder"></div>}

                <img src={health_care} alt="" className="health-care-img" />

                <div className="line-bolder"></div>

                <div className="sign-up">
                    <img src={profile} alt="" className="profile-img" />
                    <div className="title">Увійти</div>
                    {window.innerWidth < 550 && <img src={other} alt="" className="other-img-menu" onClick={(e) => hadnleMobileHeaderClick(e)} />}
                </div>
            </div>
        </header>
    );
}