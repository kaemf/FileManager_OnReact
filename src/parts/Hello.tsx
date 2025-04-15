import hello_img_right from '../assets/hello-image-right.png';
import arrow_down from '../assets/arow-down.png';
import AddMenu from './micro/add_menu';

export default function Hello() {
    return (
        <div className="hello">
            <AddMenu/>

            <div className="main-block">
                <div className="content">
                    <div className="title">Курси становлення ефективних <span>лідерів</span></div>
                    <div className="description">Інститут Лідерства, Управління та Коучингу допоможе тобі стати ефективним лідером, який розвиває свою організацію та зрощує наступне покоління лідерів</div>
                    <div className="buttons">
                        <div className="button actual">Актуальні</div>
                        <div className="button all-courses">Усі курси</div>
                    </div>
                </div>
                <img src={hello_img_right} alt="" className="hello-img-right" />
            </div>

            <div className="pages-list">
                <div className="page active"></div>
                <div className="page unactive"></div>
                <div className="page unactive"></div>
            </div>

            <div className="img-arrow-down-container">
                <img src={arrow_down} alt="" className="arrow-down-continue" />
            </div>
        </div>
    )
}