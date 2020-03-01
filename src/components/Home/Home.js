import React, { Component } from "react";
import "../../globalStyle.css";
import "./homeStyle.css";
import { NavLink } from "react-router-dom";
import MedalImg from "../../assets/images/medal.png";
import AirImg from "../../assets/images/air.png";

// BtnImages

import papperimg from "../../assets/images/navigation_icon/foto-papir.png";
import cupImg from "../../assets/images/navigation_icon/foto-solja.png";
import puzzleImg from "../../assets/images/navigation_icon/foto-puzzle.png";
import tshirtImg from "../../assets/images/navigation_icon/foto-majica.png";
import calendarImg from "../../assets/images/navigation_icon/foto-calendar.png";
import bookImg from "../../assets/images/navigation_icon/foto-book.png";

// fa

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home_component">
        <div className="image_section_home">
          <div className="text_wrap">
            <img className="medalImg" src={MedalImg} alt="Medal" />
            <h4>Aplikacija Blic Urošević</h4>
            <p>
              <span>Aplikacija Blic Urošević</span> vam omogućava
              <span> brzu i jednostavnu</span> izradu fotografija na podlogama
              poput šolja, puzla, majica ili foto-papira visokog kvaliteta.
            </p>
            <img src={AirImg} alt="Air" className="airImg" />
            <p>
              <span>Dostava je besplatna</span> ukoliko naručite više od 100
              fotografija, a proizvod će vam stići na kućnu adresu kroz nekoliko
              dana.
            </p>
            <a href="#scroll_animation" className="scrollAnimation_text">
              Klikni za dalje
              <FontAwesomeIcon icon={faAngleDown} />
            </a>
          </div>
        </div>
        <div className="steps" id="scroll_animation">
          <div className="container">
            <div className="steps_holder">
              <div className="step">
                <div className="circle">
                  <p>1</p>
                </div>
                <h6>Korak:</h6>
                <p>Odaberite podlogu za štampu.</p>
              </div>
              <div className="step">
                <div className="circle">
                  <p>2</p>
                </div>
                <h6>Korak:</h6>
                <p>
                  Učitajte fotografije sa telefona/ kompjutera ili sa neke od
                  društvenih mreža.
                </p>
              </div>
              <div className="step">
                <div className="circle">
                  <p>3</p>
                </div>
                <h6>Korak:</h6>
                <p>Potvrdite porudžbinu.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="choose_print_layer">
          <div className="container">
            <div className="choose_print_layer_holder">
              <h2>Odaberite podlogu za štampu</h2>
              <div className="choose_print_layer_buttons">
                <div className="layar_btn">
                  <span>
                    <img src={papperimg} alt="papperimg" />
                  </span>
                  <NavLink to="/photoPapperUploadImages">Foto-Papir</NavLink>
                </div>
                <div className="layar_btn">
                  <span>
                    <img src={cupImg} alt="cupImg" />
                  </span>
                  <NavLink to="/photoCupUploadImages">Foto Šolja</NavLink>
                </div>
                <div className="layar_btn">
                  <span>
                    <img src={puzzleImg} alt="puzzleImg" />
                  </span>
                  <NavLink to="/photoPuzzleUploadImages">Foto Puzzle</NavLink>
                </div>
                <div className="layar_btn">
                  <span>
                    <img src={tshirtImg} alt="tshirtImg" />
                  </span>
                  <NavLink to="/photoTshirtUploadImages">Foto Majica</NavLink>
                </div>
                <div className="layar_btn">
                  <span>
                    <img src={calendarImg} alt="calendarImg" />
                  </span>
                  <NavLink to="/photoCalendarUploadImages">
                    Foto Kalendar
                  </NavLink>
                </div>
                <div className="layar_btn">
                  <span>
                    <img src={bookImg} alt="bookImg" />
                  </span>
                  <NavLink to="/photoBookUploadImages">Foto Book</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
