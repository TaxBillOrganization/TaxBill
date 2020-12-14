import {connect} from "react-redux";
import Home from "../components/Home";
import {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPrediction,
    getSelectedAdress,
    saveTrack,
    openSettings,
    getSettings,
    setSettings,
    getDate,
} from "../modules/home";

const mapStateToProps = (state) => ({
    region:state.home.region,
    inputData: state.home.inputData || {},
    resultTypes :state.home.resultTypes || {},
    predictions:state.home.predictions || [],
    selectedAddress : state.home.selectedAddress || [],
    settings : state.home.settings || {},
    Date : state.home.Date || {},
    
});
const mapActionCreators ={getCurrentLocation,
     getInputData, 
     toggleSearchResultModal,
     getAddressPrediction,
     getSelectedAdress,
     saveTrack,
     openSettings,
     getSettings,
     setSettings,
     getDate
    };

export default connect(mapStateToProps, mapActionCreators)(Home);