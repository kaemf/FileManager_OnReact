import green from "../../assets/courses/green.png";
import arrow from "../../assets/courses/arrow-standart.png"

import blue from "../../assets/courses/blue.png";
import red from "../../assets/courses/red.png";
import yellow from "../../assets/courses/yellow.png";
import purple from "../../assets/courses/purple.png";
import lightblue from "../../assets/courses/lightblue.png";
import AnimatedIcon from "./anim_arrow";

export default function AddMenu() {
    return (
        <div className="additional-menu">
            <div className="add-menu-item">
                <div className="title">
                    <img src={green} alt="" className="title-img" />
                    <div className="title-text green">Школа професійного коучингу</div>
                </div>

                <div className="content">
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>

                            <div className="title">Інклюзія для підлітків</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Коучинг команд</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Професійний коучинг</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Менторство та коучинг підлітків</div>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
            </div>

            <div className="add-menu-item">
                <div className="title">
                    <img src={blue} alt="" className="title-img" />
                    <div className="title-text blue">Онлайн програми</div>
                </div>

                <div className="content">
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Управління командами (онлайн)</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Менторство і коучинг (онлайн)</div>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
            </div>

            <div className="add-menu-item">
                <div className="title">
                    <img src={purple} alt="" className="title-img" />
                    <div className="title-text purple">Закордонна школа</div>
                </div>

                <div className="content">
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Менторство і коучинг (закордонна школа)</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                                <AnimatedIcon/>
                            <div className="title">Управління командами (закордонна школа)</div>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
            </div>

            <div className="add-menu-item">
                <div className="title">
                    <img src={yellow} alt="" className="title-img" />
                    <div className="title-text yellow">Школа управління</div>
                </div>

                <div className="content">
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Ті, хто змінюють міста</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Управління неприбутковими організаціями</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Управління командами</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Бізнес і цінності</div>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
            </div>

            <div className="add-menu-item">
                <div className="title">
                    <img src={red} alt="" className="title-img" />
                    <div className="title-text red">Школа медіа та комунікації</div>
                </div>

                <div className="content">
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">SMM для неприбуткових організацій</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Фандрейзинг для громадських та релігійних організацій</div>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
            </div>

            <div className="add-menu-item">
                <div className="title">
                    <img src={lightblue} alt="" className="title-img" />
                    <div className="title-text lightblue">Школа менторства та консультування</div>
                </div>

                <div className="content">
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Менторство і коучинг</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Війна і діти</div>
                        </div>
                        <div className="status"></div>
                    </div>
                    <div className="content-item">
                        <div className="group-title">
                            <AnimatedIcon/>
                            <div className="title">Сімейне консультування</div>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}