import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        top:150,
        position:"absolute",
        width:width,
        height:50,
        
    },
    inputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:8,
        marginBottom:0,
        backgroundColor:"#FFF",
        opacity:0.9,
        borderRadius:7,
        flexDirection:"row",
        height:"80%",
        alignItems:"center",
    },
    secondInputWrapper:{
        flex:1,
        marginLeft:5,
        marginRight:10,
        marginTop:0,
        marginBottom:"2%",
        backgroundColor:"#f7f7f7",
        opacity:0.9,
        borderRadius:7,
        borderColor:"#f7f7f7",
        borderWidth:1,
        width:130,
        height:30,
        alignItems:"center",
        
    },
    inputSearch:{
        fontSize:14,
        alignItems:"center",
        marginTop:'8%',
        color:"f5f5f5",
        height:"10",
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0,
        marginLeft:25,
        
    }
};

export default styles;