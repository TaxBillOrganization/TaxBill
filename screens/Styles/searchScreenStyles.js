import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const windowHeight = Dimensions.get('window').height;   
const windowWidth = Dimensions.get('window').width;
const styles = {
    searchBox:{
        top:0,
        position:"absolute",
        width:width,
        flex:1,
    },
    inputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:10,
        marginBottom:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7,
        flex:1,
    },
    inputDate:{
        marginLeft:15,
        marginRight:10,
        marginBottom:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7,flex:1,
    
    },
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7,flex:1,
    },
    inputSearch:{
        fontSize:14,flex:1,
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0,
        flex:1
    },
    settingsContainer:{
     
        height:500,
        width:300,
        backgroundColor:"#000",
       left:0,
       
  
    },
    optionsContainer:{
       
        position:"absolute",
        width:40,
        height:40,
        left:(windowWidth/4)+(windowWidth/10),
        top:(windowHeight/10)-(windowHeight/5),
        opacity:0.8,
        flexDirection:"row",
       
        
  
  
    },
    iconContainer:{
        fontSize:40
  
    },
    container: {
      //top:(windowHeight/6),
      left:(windowWidth/6),
      backgroundColor:"black",
      opacity:0.7,
      height:(windowHeight/3),
      width:(windowWidth/2)+(windowWidth/5),
  
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
  
        fontSize:25,
        marginTop:5,
        color:"#FFF",
        marginLeft:10
      },
     label : {
        fontSize:25,
        color:"#FFF",
        opacity:0.9,
        marginLeft:5,
      },
      rowContainer:{
        flexDirection:"row",
       marginLeft:(windowWidth/11),
        marginTop:(windowHeight/45),
      },
      image: {
        flex: 1,
        width: null,
        alignSelf: "stretch",

    },
    profileImage: {
        width: 130,
        height: 130,
        overflow: "hidden",
        marginTop:"2.7%",
    },
    text: { 
        color: "black", 
        fontWeight: "bold", 
        fontSize: 20, 
    },
};

export default styles;