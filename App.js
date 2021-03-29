import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data:{},
      url:'https://0q27loouph.execute-api.us-east-1.amazonaws.com/',
      error: false
    }
  }
  dialCall(number){
    (Platform!=='default') 
                      && Linking.openURL((Platform.OS === 'android')
                                          ?`tel:${number}`
                                          :`telprompt:${number}`);
  };

  componentDidMount(){
    this.getData();
  }

  getData= async ()=>{
    this.setState({loading:true})
     await fetch(this.state.url)
      .then(res=>res.json())
      .then(res=>{
        this.setState({
          data: res,
          loading:false 
        })
      })
      .catch(e=>({
        loading: false,
        error: e
      }))
  };

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Text style={styles.header}>LOADING DATA...</Text>
        </View>
      )
    }
    if (this.state.error){
      return (
        <View style={styles.container}>
          <Text style={styles.header}>LOAD ERROR</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
                <TouchableOpacity 
                  style={styles.imageLogo}
                  onPress={() => Linking.openURL('https://nutrial.us/')}
                >
                <Image
                  style={styles.imageLogo}
                  source={require('./assets/logoNutrialus.png')}
                  />
                </TouchableOpacity>
              </View>
            <Image
              style={styles.imageView}
              source={{uri: this.state.data.image}}
              />
            <View style={styles.textContainer}>
              <Text style={styles.header}>USER</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}><Icon name="user" size={20} /> {this.state.data.name}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`mailto:${this.state.data.email}`) }>
                  <Text style={styles.text}><Icon name="mail" size={20} /> {this.state.data.email}</Text>
                  </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{this.dialCall(this.state.data.phone)}}
                >
                <Text style={styles.text}><Icon name="phone" size={20} /> {this.state.data.phone}</Text> 
                </TouchableOpacity>
              </View>
              <Text>{this.state.data.nutritionist}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.buttonView}
            onPress={()=>this.componentDidMount()} 
          >
            <Text
              style={styles.textBotton}
              >NEXT CLIENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles =StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FDEEE2',
    alignItems:'center',
    justifyContent:'center',
  },
  cardContainer:{
    backgroundColor: '#fff',
    borderRadius:20,
    width: 340,
    height: 680,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5, 
  },
  card: {
    flex: 1,
    alignItems:'center',
  },
  logoContainer:{
    position: 'absolute',
    top: 10,
    width: 160,
    height: 25,
    zIndex:40.0,
    alignItems:'center',
    justifyContent:'center'
  },
  imageLogo:{
    width: '100%',
    height: '100%',
    
  },
  imageView: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius:20,
    borderTopRightRadius: 20,
  },
  textContainer:{
    height: '25%',
    flex: 1,
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  header:{
    fontWeight:"bold",
    fontSize:24,
    color:"#2B2350",
    marginBottom:0
  },
  detailsContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    fontSize:16,
    color:"#2B2350",
    marginBottom:10
  },
  buttonView: {
    backgroundColor: "#F4A261",
    height: '10%',
    borderBottomLeftRadius:20,
    borderBottomRightRadius: 20, 
  },
  textBotton:{
    textAlign:'center',
    padding:18,
    color: "white",
    fontWeight: "bold", 
  }
})
