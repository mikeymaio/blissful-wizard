import React, { useState } from "react";
import Flip from "react-reveal/Flip";
import Roll from "react-reveal/Roll";
import Modal from "./modal";
import logo from "../images/bw-logo.svg";

export default (props) => {
  const html = document.getElementsByTagName("html")[0];
  html.style.overflowY = "hidden";
  const [modalOpen, setModalOpen] = useState(true);
  setTimeout(() => {
    setModalOpen(false);
    html.style.overflowY = "scroll";
  }, 5000);
  return (
    <Modal
      visible={modalOpen}
      isIntro
      hideClose
      hideOverflow
      backgroundClass="has-background-white"
      scrollContent={false}
    >
      <h1
        className="logo has-text-centered is-size-1"
        style={{ fontFamily: "Lobster Two" }}
      >
        <Flip left cascade duration={2500}>
          Blissful Wizard
        </Flip>
      </h1>
      <p className="image is-4by3">
        <Roll bottom>
          <img src={logo} alt="Blissful Wizard Logo" />
        </Roll>
      </p>
      <h3
        className="logo-subtext has-text-centered is-size-3 is-size-4-mobile"
        style={{ fontFamily: "Lobster Two" }}
      >
        <Flip left cascade duration={2500}>
          Handmade in East Village, NYC
        </Flip>
      </h3>
    </Modal>
  );
};
