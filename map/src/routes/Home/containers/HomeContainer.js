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
} from "../modules/home";

const mapStateToProps = (state) => ({
    region:state.home.region,
    inputData: state.home.inputData || {},
    resultTypes :state.home.resultTypes || {},
    predictions:state.home.predictions || [],
    selectedAddress : state.home.selectedAddress || [],
    settings : state.home.settings || {},
    
});
const mapActionCreators ={getCurrentLocation,
     getInputData, 
     toggleSearchResultModal,
     getAddressPrediction,
     getSelectedAdress,
     saveTrack,
     openSettings,
     getSettings,
     setSettings
    };

export default connect(mapStateToProps, mapActionCreators)(Home);