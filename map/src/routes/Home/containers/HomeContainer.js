import {connect} from "react-redux";
import Home from "../components/Home";
import {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPrediction,
    getSelectedAdress
} from "../modules/home";

const mapStateToProps = (state) => ({
    region:state.home.region,
    inputData: state.home.inputData || {},
    resultTypes :state.home.resultTypes || {},
    predictions:state.home.predictions || [],
    selectedAddress : state.home.selectedAddress || [],
    
});
const mapActionCreators ={getCurrentLocation,
     getInputData, 
     toggleSearchResultModal,
     getAddressPrediction,
     getSelectedAdress
    };

export default connect(mapStateToProps, mapActionCreators)(Home);