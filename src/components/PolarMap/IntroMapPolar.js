// import React, { useEffect, useState } from 'react';

// import { Constants } from '../../config/constants';
// import { useGlobal } from '../../providers/globalProvider';
// import { useMap } from '../../providers/mapProvider';
// import styles from '../../styles/home/introMap.module.css';
// import EventMapFilter from '../map/eventMapFilter';
// import EventMapFilterMobileView from '../map/eventMapFilterMobileView';
// import FilterButton from '../map/filterButton';
// import FilterPanel from '../map/filterPanel';
// import Map from '../map/map';
// import MapEventPanel from '../map/mapEventPanel';
// import MapEventRoutePanel from '../map/mapEventRoutePanel';
// import MapSearch from '../map/mapSearch';
// import MapStorePanel from '../map/mapStorePanel';
// import MapTop from '../map/MapTop';
// import PolarMap from './PolarMap';

// const IntroMapPolar = ({ peopleCategoryList, peopleCountryList }) => {
//   const {
//     currentActivePanel,
//     eventRouteActive,
//     setEventRouteActive,
//     currentMapData,
//     activeEventType
//   } = useMap();
//   const {
//     isMobile,
//     setMobileFullscreen,
//     offMobileMapSidePanel,
//     setOffMobileMapSidePanel
//   } = useGlobal();
//   const [panelActive, setPanelActive] = useState(false);
//   const [mobileFilter, setMobileFilter] = useState(false);
//   const [renderMap, setRenderMap] = useState(false);
//   const [filterPanelActive, setFilterPanelActive] = useState(false);

//   useEffect(() => {
//     if (isMobile && mobileFilter) {
//       setMobileFullscreen(true);
//     } else {
//       setMobileFullscreen(false);
//     }
//   }, [mobileFilter]);

//   useEffect(() => {
//     if (isMobile && offMobileMapSidePanel) {
//       setMobileFullscreen(false);
//       setEventRouteActive(null);
//     }
//   }, [offMobileMapSidePanel]);

//   useEffect(() => {
//     if (
//       eventRouteActive ||
//       currentActivePanel === Constants.mapRenderEventActive.SINGLE
//     ) {
//       setPanelActive(true);
//       if (isMobile) {
//         setOffMobileMapSidePanel(false);
//         setMobileFullscreen(true);
//       } else {
//         setMobileFullscreen(false);
//       }
//     } else {
//       setPanelActive(false);
//       setMobileFullscreen(false);
//     }
//   }, [eventRouteActive, currentActivePanel]);

//   useEffect(() => {
//     setTimeout(() => {
//       setRenderMap(true);
//     }, 500);
//   });

//   const openFilterPanel = open => {
//     setFilterPanelActive(open);
//   };
//   return (
//     <div className="intro-image">
//       <div className="container simplepad text-center ">
//         <div id="mapSection" className="mapContainer position-relative">
//           {renderMap && (
//             <div
//               className={
//                 styles.innerLayout +
//                 (panelActive ? ' ' + styles.viewPanelActive : '')
//               }
//             >
//               {isMobile && activeEventType && (
//                 <div className={styles.maptopper}>
//                   <MapTop setMobileFilter={setMobileFilter} />
//                 </div>
//               )}
//               <div className={styles.innerMapContainer}>
//                 {/* This search option not for this Jan-2022 release
//                 {!panelActive && <MapSearch />} */}
//                 <PolarMap />
//                 {/* {!panelActive && <EventMapFilter />} */}
//                 {/* {mobileFilter && (
//                   <EventMapFilterMobileView setMobileFilter={setMobileFilter} />
//                 )} */}
//                 {/* {filterPanelActive && <FilterPanel open={openFilterPanel} />} */}
//                 <div className={styles.filterButton}>
//                   {/* <FilterButton onClick={setMobileFilter} /> */}
//                 </div>
//               </div>
//               {eventRouteActive && <MapEventRoutePanel />}
//               {currentActivePanel === Constants.mapRenderEventActive.SINGLE && (
//                 <>
//                   {currentMapData &&
//                     currentMapData.focusEvent.eventType ===
//                       Constants.updatedEventTypes.brandStoreEvent && (
//                       <MapStorePanel />
//                     )}
//                   {currentMapData &&
//                     currentMapData.focusEvent.eventType ===
//                       Constants.eventTypes.people && (
//                       <MapEventPanel
//                         peopleCategoryLists={peopleCategoryList}
//                         peopleCountryList={peopleCountryList}
//                       />
//                     )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntroMapPolar;
