import * as React from 'react'
import * as Permissions from 'expo-permissions';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
  constructor(){
      super();
      this.state = {
        hasCameraPermissions : null,
        buttonState: 'normal',
        scanned: false,
        scannedData: ''
      }
  }  

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          /*status === "granted" is true when user has granted permission
            status === "granted" is false when user has not granted the permission
          */
          hasCameraPermissions: status === "granted",
          buttonState: 'clicked',
          scanned: false
        });
      }
  
      

      handleBarCodeScanned = async({type, data})=>{
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState === "clicked" && hasCameraPermissions){
            return(
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            );
          }

          else if (buttonState === "normal"){
            return(
                <View style ={{flex:1, justifyContent:'center', alignText:'center'}}>
                 
            <Image source={require("../assets/scanner.jpg")} style={styles.imageStyle}/>
                                     
            <Text style={{fontWeight:'bold', textAlign:'center', fontSize:30}}>BARCODE SCANNER</Text>
            
            <Text style={styles.text}>
                {hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"}
            </Text> 

            <TouchableOpacity 
            style = {styles.QRbutton} 
            onPress = {this.getCameraPermissions}
            title = "Barcode Scanner">
            <Text style={styles.text}>Scan QR Code</Text>
            </TouchableOpacity>

             

                </View>
            )
          }
        
    }
}
const styles = StyleSheet.create({
    QRbutton: {
        alignSelf: "center",
        backgroundColor: "aqua",
        height: 40,
        width: 150,
        borderRadius: 15,
        marginTop: 10,
        borderWidth: 3,
        borderRadius: 20
    },
    text: {
      textAlign: 'center',
      marginTop: 8,
      fontWeight: 'bold'
    },
    imageStyle: {
      width:260,
      height:300,
      alignSelf:'center',
      marginTop:100
    }
})