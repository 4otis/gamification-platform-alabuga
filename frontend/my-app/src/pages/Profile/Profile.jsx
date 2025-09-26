import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// Рамка с кнопкой внутри SVG (как у тебя)
const Frame = ({ onCustomize }) => (
  <svg width="100%" height="100%" viewBox="0 0 669 632" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M364.193 630H12C6.47715 630 2 625.523 2 620V284.049C2 284.049 2 284.049 2 284.049C2.00004 283.188 2.11114 282.337 2.32633 281.516C2.68503 280.146 3.33292 278.859 4.23761 277.745L76.6179 188.625C78.0654 186.843 78.8555 184.617 78.8555 182.321V12C78.8555 6.47715 83.3326 2 88.8555 2H602.5C607.678 2 611.936 5.935 612.448 10.9776C612.482 11.3137 612.5 11.6548 612.5 12V196.708C612.5 198.535 613 200.326 613.946 201.888L665.554 287.112C666.5 288.674 667 290.465 667 292.292V537.5C667 543.023 662.523 547.5 657 547.5H450.807C448.058 547.5 445.43 548.632 443.541 550.63L371.459 626.87C369.57 628.868 366.942 630 364.193 630Z" fill="#00A7D2" stroke="black" strokeWidth="4"/>
    <path d="M473 232.671V38C473 32.4772 477.477 28 483 28H515C520.523 28 525 32.4772 525 38V232.637C525 235.419 526.159 238.075 528.198 239.968L632.802 337.032C634.841 338.925 636 341.581 636 344.363V366.898C636 375.656 625.541 380.183 619.156 374.189L476.156 239.962C474.142 238.072 473 235.433 473 232.671Z" fill="#008AAC"/>
    <path d="M213 232.671V38C213 32.4772 208.523 28 203 28H171C165.477 28 161 32.4772 161 38V232.858C161 235.51 159.946 238.054 158.071 239.929L25.0711 372.929C18.7714 379.229 23.2331 390 32.1421 390H46.042C48.5847 390 51.0319 389.031 52.8859 387.291Л209.844 239.962C211.858 238.072 213 235.433 213 232.671З" fill="#008AAC"/>
    <path d="M219 446H106C100.477 446 96 450.477 96 456V486.656C96 492.118 100.382 496.569 105.843 496.655L286.5 499.5H408L585.84 502.338C591.425 502.427 596 497.924 596 492.339V471.5V456C596 450.477 591.523 446 586 446H408H219Z" fill="#008AAC"/>

    {/* Кнопка внутри SVG */}
    <foreignObject x="40" y="560" width="342" height="53">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <button type="button" className="customize-btn" onClick={onCustomize} aria-label="Открыть настройки кастомизации">
          КАСТОМИЗАЦИЯ
        </button>
      </div>
    </foreignObject>
  </svg>
);

// Прокручиваемый список (как у тебя)
const ScrollList = ({ items }) => (
  <div className="list-panel">
    <div className="list-scroll">
      {items.map((item, i) => (
        <button key={i} className="list-item" type="button">
          <span className="list-item__label">{item}</span>
        </button>
      ))}
    </div>
  </div>
);

const AttributePlate = ({ name }) => {
  // центр второй плашки в пределах 1280×326
  const innerX = 39; // (1280 - 702) / 2
  const innerY = 26;  // визуальный отступ сверху

  return (
    <svg transform={`translate(${120}, ${0}) scale(1.2)`} className="attribute-plate-svg" viewBox="0 0 1280 326" xmlns="http://www.w3.org/2000/svg">
      <g >
        <path
          d="M1115.19 324L12.2148 324C6.69199 324 2.21484 319.523 2.21484 314V87.2394C2.21484 84.6836 3.19343 82.2248 4.94964 80.368L76.1113 5.12855C78.0001 3.1315 80.6277 2 83.3765 2H845.715H1267.21C1272.74 2 1277.21 6.47715 1277.21 12V167.744C1277.21 170.463 1276.11 173.065 1274.15 174.951L1122.12 321.207C1120.26 322.999 1117.77 324 1115.19 324Z"
          fill="#CACACA" stroke="black" strokeWidth="4"
        />
      </g>

      {/* Внутренняя плашка */}
      <g transform={`translate(${innerX}, ${innerY})`}>
        <path
          d="M691.349 2H70.6582C68.661 2.00012 66.736 2.74733 65.2617 4.09473L5.08203 59.0947C-0.307573 64.0208 3.17771 73 10.4795 73H640.492C642.723 73 644.852 72.0692 646.366 70.4316L697.223 15.4316C701.96 10.3088 698.326 2.00014 691.349 2Z"
          fill="#D9D9D9" stroke="black" strokeWidth="4"
        />
        <text
          x="351" y="38"
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="Inter, Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0B1F2A"
        >
          {name}
        </text>
      </g>
    </svg>
  );
};


const ManaExpPlate = ({ mana, exp }) => {
  return (
    <svg
      transform={`translate(${65}, ${0})`}
      className="mana-exp-plate"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 305 158"
      width="350"
      height="250"
    >
      {/* верхняя плашка */}
      <path
        d="M270.982 2L12.2148 2.00005C6.69199 2.00005 2.21484 6.4772 2.21484 12V50.4473C2.21484 53.4961 3.60573 56.3784 5.99246 58.2756L26.8171 74.8283C28.5863 76.2345 30.7796 77 33.0395 77H292.215C297.738 77 302.215 72.5228 302.215 67V28.8833C302.215 25.8351 300.825 22.9533 298.439 21.0562L277.206 4.17284C275.437 2.76592 273.243 2 270.982 2Z"
        fill="#CACACA"
        stroke="black"
        strokeWidth="4"
      />

      {/* нижняя плашка — смещаем на 79px вниз */}
      <g transform={`translate(${0}, ${15}), translate(0,79)`}>
        <path
          d="M33.4476 2L292.215 2.00005C297.738 2.00005 302.215 6.4772 302.215 12V50.4473C302.215 53.4961 300.824 56.3784 298.437 58.2756L277.613 74.8283C275.843 76.2345 273.65 77 271.39 77H12.2148C6.69199 77 2.21484 72.5228 2.21484 67V28.8833C2.21484 25.8351 3.60516 22.9533 5.99106 21.0562L27.2238 4.17284C28.9932 2.76592 31.187 2 33.4476 2Z"
          fill="#CACACA"
          stroke="black"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};


export default function Profile() {
  const navigate = useNavigate();
  const items = Array.from({ length: 20 }, (_, i) => `Элемент ${i + 1}`);

  return (
    <>
      <div className="ava-artif-container">
        <div className="frame">
          <Frame onCustomize={() => navigate("/customize")} />
        </div>
        <ScrollList items={items} />
      </div>

      <div className="atr-container atr-flex">
        <div className="mana-col">
          <ManaExpPlate mana="100" exp="100" />
        </div>
        <div className="attr-col">
          <AttributePlate name="Иван Иванов" />
        </div>
      </div>

    </>
  );
}
