import {StyleSheet,Dimensions} from "react-native";
const windowHeight = Dimensions.get('window').height;   
const windowWidth = Dimensions.get('window').width;


const styles ={
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    starStyle:{
        fontSize:10
    },
    profileImage: {
        width: windowWidth/3,
        height: windowHeight/4,
        borderRadius: 70,
        overflow: "hidden"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
    },
    viewContainer:{
        height:windowHeight/2,
    },
    buttonSave:{
        position:"absolute",
        marginLeft:"2%",
        width: windowWidth/3.5,
        height: windowHeight/20,
        top:windowHeight/2.9,
        backgroundColor:"#0076ff",
        borderRadius:8,
        alignItems:"center",
        opacity:0.8,
    },
    buttonDelete:{
        position:"absolute",
        marginLeft:"2%",
        width: windowWidth/3.5,
        height: windowHeight/20,
        top:windowHeight/2.9,
        backgroundColor:"#cf0808",
        borderRadius:8,
        alignItems:"center",
        opacity:0.8,
    },
    buttonIgnore:{
        position:"absolute",
        marginLeft:"2%",
        width: windowWidth/3.5,
        height: windowHeight/20,
        top:windowHeight/2.9,
        left:windowWidth/1.5,
        backgroundColor:"#0076ff",
        borderRadius:8,
        alignItems:"center",
        opacity:0.8,
    },
    map:{

        ...StyleSheet.absoluteFillObject
    }
}
export default styles;