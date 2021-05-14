import React, { memo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import geoUrl from '../world.json';

const markers = [
  {
    name: 'Banyan Air Service',
    address: `Fort Lauderdale Executive Airport (KFXE)<br />
    Ft. Lauderdale, FL<br />
    +1 954.491.3170`,
    coordinates: [-80.16916599 - 10, 26.1916659 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Duncan Aviation',
    address: `Battle Creek Airport (KBTL)<br />
    Battle Creek, MI<br />
    +1 800.525.2376`,
    coordinates: [-85.551164462 - 12, 42.234332396 + 12],
  },
  {
    name: 'Duncan Aviation',
    address: `Lincoln Airport (KLNK)<br />
    Lincoln, NE<br />
    +1 800.228.4277`,
    coordinates: [-96.755496978 - 12, 40.850663264 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Elliot Aviation',
    address: `Des Moines Airport (KDSM)<br />
    Des Moines, IA<br />
    +1 800.332.3511`,
    coordinates: [-93.6604968 - 12, 41.5347119 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Elliot Aviation',
    address: `Flying Cloud Airport (KFCM)<br />
    Eden Prairie, MN<br />
    +1 800.541.9110`,
    coordinates: [-93.4543 - 12, 44.823 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Elliot Aviation',
    address: `Quad City Airport (KMLI)<br />
    Milan, IL<br />
    +1 800.447.6711`,
    coordinates: [-90.504497982 - 12, 41.44249823 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Mayo Aviation',
    address: `Fort Lauderdale Executive Airport (KFXE)<br />
    Ft. Lauderdale, FL<br />
    +1 954.491.3170`,
    coordinates: [-87.56281, 45.29327],
  },
  {
    name: 'Northeast Air',
    address: `Portland International Jetport (KPWM)<br />
    Portland, ME<br />
    +1 877.354.7881`,
    coordinates: [-70.3055 - 12, 43.641 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'RBR Aviation',
    address: `Love Field (KDAL)<br />
    Dallas, TX<br />
    +1 214.351.6604`,
    coordinates: [-96.851349 - 12, 32.848152 + 8],
    type: 'serviceCenter',
  },
  {
    name: 'Rose Aircraft Services, LLC',
    address: `Fort Lauderdale Executive Airport (KFXE)<br />
    Ft. Lauderdale, FL<br />
    +1 954.491.3170`,
    coordinates: [-87.56281, 45.29327],
    type: 'serviceCenter',
  },
  {
    name: 'SoCal Jet Services',
    address: `Long Beach Airport (KLGB)<br />
    Long Beach, CA<br />
    +1 800.372.1698`,
    coordinates: [-118.151 - 15, 33.8173 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Western Aircraft',
    address: `Boise Airport (KBOI)<br />
    Boise, ID 83705<br />
    +1 800.333.3442`,
    coordinates: [-116.220332452 - 12, 43.558664432 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Atlas Air Service AG',
    address: `Bremen Airport (EDDW)<br />
    Bremen, Germany<br />
    +49 421.53658.760`,
    coordinates: [8.785330192 - 6, 53.041833166 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'ASG Limited',
    address: `Guernsey International Airport (EGJB)<br />
    Guernsey, Channel Islands<br />
    +44 1481.265750`,
    coordinates: [-2.601164262 - 6, 49.434331596 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Bromma Air Maintenance AB',
    address: `Bromma Airport (ESSB)<br />
    Bromma, Sweden<br />
    +46 8.566.190.00`,
    coordinates: [17.937162918 - 6, 59.352665256 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Conal',
    address: `Av. Santos Dumont (SDCO)<br />
    Sorocaba – SP, Brazil<br />
    +55 15.3313.9500`,
    coordinates: [-43.5525 - 3, -21.45667 + 9],
    type: 'serviceCenter',
  },
  {
    name: 'Prince Aviation',
    address: `Belgrade Nikola Tesla Airport (LYBE)<br />
    Belgrade, Serbia<br />
    +381 11.209.75.85`,
    coordinates: [20.30416545 - 6, 44.81833006 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Signature Technicair',
    address: `Bournemouth Airport (EGHH)<br />
    Christchurch, Dorset UK<br />
    +44 (0) 1202.573243`,
    coordinates: [-1.838829978 - 6, 50.774663568 + 12],
    type: 'serviceCenter',
  },
  {
    name: 'Solojet Aviação',
    address: `Chacara Aeroporto (SBJD)<br />
    Jundiai – SP, Brazil<br />
    +55 11.4582.7899`,
    coordinates: [-46.88417 - 3, -23.186393 + 9],
    type: 'serviceCenter',
  },
  {
    name: 'Tamarack West Coast Transformation Center',
    address: `Sandpoint Airport (KSZT)<br />
    Sandpoint, ID<br />
    +1 208.255.4400`,
    coordinates: [-128.56281, 56.29327],
    type: 'transformationCenter',
  },
  {
    name: 'Tamarack East Coast Transformation Center',
    address: `Aiken Regional Airport (KAIK)<br />
    Aiken, SC<br />
    +1 803.609.7776`,
    coordinates: [-87.56281 + 1, 45.29327 + 1],
    type: 'transformationCenter',
  },
  {
    name: 'Tamarack European Transformation Center',
    address: `Oxford Airport (EGTK)<br />
    Kidlington, UK<br />
    +44 (0) 1865.502.484`,
    coordinates: [-1.3230496 - 6, 51.8370683 + 12],
    type: 'transformationCenter',
  },
];

const MapChart = ({ setTooltipContent }) => {
  const rootEl = document.getElementById('root');
  const defaultFilter = rootEl.getAttribute('data-show');
  const showFilterControls = JSON.parse(
    rootEl.getAttribute('data-showFilterControls')
  );
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);
  const [filter, setFilter] = useState(defaultFilter ? defaultFilter : '');

  const markersToFilter = markers.filter((marker) => {
    if (marker.type === filter) return marker;

    if (filter === '') return marker;

    return '';
  });

  return (
    <div className="map--container">
      {showFilterControls && (
        <ul className="map--filters">
          <li>
            <button
              type="button"
              className={filter === '' ? 'active' : ''}
              onClick={() => setFilter('')}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              className={filter === 'transformationCenter' ? 'active' : ''}
              onClick={() =>
                filter === 'transformationCenter'
                  ? setFilter('')
                  : setFilter('transformationCenter')
              }
            >
              Transformation Centers
            </button>
          </li>
          <li>
            <button
              type="button"
              className={filter === 'serviceCenter' ? 'active' : ''}
              onClick={() =>
                filter === 'serviceCenter'
                  ? setFilter('')
                  : setFilter('serviceCenter')
              }
            >
              Service Centers
            </button>
          </li>
        </ul>
      )}
      <ul className="map--controls">
        <li>
          <button type="button" onClick={() => setZoom((prev) => prev + 0.25)}>
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.252 20.124C38.2524 23.7092 37.1896 27.2139 35.1981 30.195C33.2065 33.1761 30.3756 35.4997 27.0635 36.8719C23.7513 38.244 20.1066 38.6031 16.5903 37.9038C13.074 37.2045 9.84408 35.4781 7.30899 32.943C4.7739 30.4079 3.04753 27.178 2.3482 23.6617C1.64886 20.1454 2.00799 16.5007 3.38015 13.1886C4.75231 9.87638 7.07588 7.04551 10.057 5.05395C13.0381 3.06239 16.5429 1.9996 20.128 2C24.9346 2.00053 29.5442 3.91019 32.943 7.30898C36.3418 10.7078 38.2515 15.3174 38.252 20.124Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.002 20H29.002"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.002 29V11"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32.944 32.94L47.002 47"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setZoom((prev) => prev - 0.25)}>
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.252 20.124C38.2524 23.7091 37.1897 27.2137 35.1982 30.1948C33.2067 33.1759 30.376 35.4994 27.0639 36.8717C23.7519 38.2439 20.1073 38.6031 16.591 37.904C13.0748 37.2048 9.84486 35.4786 7.3097 32.9437C4.77453 30.4088 3.048 27.1791 2.34844 23.6629C1.64888 20.1468 2.00772 16.5022 3.37958 13.1899C4.75143 9.87773 7.07469 7.04672 10.0555 5.05492C13.0364 3.06312 16.5409 2 20.126 2C24.933 2 29.5431 3.90942 32.9423 7.30828C36.3415 10.7071 38.2515 15.317 38.252 20.124V20.124Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.002 20H29.002"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32.944 32.94L47.002 47"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
        {zoom !== 1 && (
          <li>
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setCenter([0, 0]);
              }}
            >
              <svg
                width="46"
                height="43"
                viewBox="0 0 46 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 25.9832V34.9832H2"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.434 34.9892C7.33992 31.7545 5.45247 27.5542 5.08833 23.0928C4.72419 18.6315 5.90551 14.1807 8.43409 10.4871C10.9627 6.79354 14.6846 4.08201 18.9755 2.80746C23.2664 1.53292 27.8651 1.77291 32 3.48717"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.424 34.9792C7.09949 31.5046 5.18081 26.9211 5.03868 22.1143C4.89656 17.3075 6.54107 12.6187 9.65448 8.95372C12.7679 5.28876 17.1292 2.90783 21.8957 2.27098C26.6622 1.63413 31.4956 2.78656 35.462 5.5056C39.4283 8.22463 42.2461 12.3173 43.3709 16.9928C44.4957 21.6682 43.8477 26.5947 41.552 30.8202C39.2563 35.0457 35.4759 38.2704 30.9413 39.8711C26.4066 41.4719 21.4396 41.3351 17 39.4872"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
      <ComposableMap data-tip="">
        <ZoomableGroup
          zoom={zoom}
          center={center}
          style={{ transition: 'all 100ms ease' }}
          maxZoom={1}
        >
          <Geographies
            geography={geoUrl}
            onClick={(e) => {
              setZoom(1);
              setCenter([0, 0]);
            }}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                let countries = [
                  'United States of America',
                  'United Kingdom',
                  'Canada',
                  'Mexico',
                  'Brazil',
                  'Australia',
                  'France',
                  'Germany',
                  'Italy',
                  'Finland',
                  'Romania',
                  'Bulgaria',
                  'Spain',
                  'Portugal',
                  'Ireland',
                  'Norway',
                  'Sweden',
                  'Austria',
                  'Netherlands',
                  'Bosnia and Herz.',
                  'Serbia',
                  'Switzerland',
                  'Greece',
                  'Herzegovina',
                  'Croatia',
                  'Slovenia',
                  'Czechia',
                  'Albania',
                  'Belgium',
                  'Luxembourg',
                  'Switzerland',
                  'Kosovo',
                  'Estonia',
                  'Latvia',
                  'Poland',
                  'Liechtenstein',
                  'Montenegro',
                  'Hungary',
                  'Macedonia',
                  'Amsterdam',
                  'Bulgaria',
                  'Romania',
                  'Slovakia',
                ];
                let shouldColor = countries.some(() =>
                  countries.includes(geo.properties.NAME)
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={shouldColor ? '#2392D0' : '#EAEAEC'}
                    stroke={shouldColor ? '#2392D0' : '#EAEAEC'}
                  />
                );
              })
            }
          </Geographies>
          {markersToFilter.map(
            ({ name, coordinates, type, address }, index) => (
              <Marker
                key={index}
                coordinates={coordinates}
                onClick={() => {
                  setZoom(window.screen.width <= 480 ? 1 : 2.5);
                  setCenter(window.screen.width <= 480 ? [0, 0] : coordinates);
                }}
                onMouseEnter={() => {
                  setTooltipContent(
                    `<div class="map--tooltip"><h3>${name}</h3><address>${address}</address></div>`
                  );
                }}
                onMouseLeave={() => {
                  setTooltipContent('');
                }}
              >
                <path
                  d="M10.5 0.917603C5.1141 0.917603 0.75 5.26415 0.75 10.6481C0.75 19.9574 10.5 32.0981 10.5 32.0981C10.5 32.0981 20.25 19.9555 20.25 10.6481C20.25 5.2661 15.8859 0.917603 10.5 0.917603ZM10.5 16.0321C9.10364 16.0321 7.76446 15.4774 6.77708 14.49C5.7897 13.5026 5.235 12.1634 5.235 10.7671C5.235 9.37069 5.7897 8.03151 6.77708 7.04414C7.76446 6.05676 9.10364 5.50205 10.5 5.50205C11.8964 5.50205 13.2355 6.05676 14.2229 7.04414C15.2103 8.03151 15.765 9.37069 15.765 10.7671C15.765 12.1634 15.2103 13.5026 14.2229 14.49C13.2355 15.4774 11.8964 16.0321 10.5 16.0321Z"
                  style={{ opacity: 0.8 }}
                  fill={type === 'transformationCenter' ? '#0D374F' : '#176490'}
                />
              </Marker>
            )
          )}
        </ZoomableGroup>
      </ComposableMap>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .rsm-geographies,
            .rsm-geography {
              outline: none;
              border: none;
            }

            path:focus-visible,
            path:focus {
              outline: none;
              border-color: inherit;
              -webkit-box-shadow: none;
              box-shadow: none;
            }`,
        }}
      />
    </div>
  );
};

export default memo(MapChart);
