import React,{useState,useEffect} from 'react';
import { SafeAreaView,Button, View, Text, Image,TouchableOpacity,Keyboard,Alert,FlatList,StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-modern-datepicker';



//-------------------------------------------- P A N T A L L A   D E   I N I C I O --------------------------------------------------
PantallaInicio=({navigation})=>{
  const [usuario,setUsuario]=useState('')
  const [contrasena,setContrasena]=useState('')

   navigationOptions = {
    header:null
  };

  Registro=()=>{
    navigation.navigate('Registro')
  }

 Entrar=()=>{
  
 if(!!usuario && !!contrasena)
 {
 
 fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=login&nombre='+usuario+'&contrasena='+contrasena, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const encontrado=responseJson.records;
      
         if(encontrado.length>0)
         {
      
          navigation.navigate('Menu',{idUsuario:encontrado[0].id,   elNombreDeLaTienda:encontrado[0].tienda}) //Usuario y nombre de la tienda
          
         }
         else
         {
          Alert.alert(
          'Usuario',
          'No encontrado!!',
           [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
           ],
            { cancelable: false }
          )  
          
                
         }
      })
      .catch((error) => {
         console.error(error);
          Alert.alert(
  'Aviso',
  'Error de Internet!!',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
);
      });
 }else
 {
           Alert.alert(
  'Aviso',
  'No introdujo datos',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
);
     
 }
 }

      return (
      <View style={{ flex:1,padding:10, backgroundColor:'white' }}>
        
        <Text style={{fontSize:34,marginTop:25,alignSelf:'center'}}>VentaSK.com</Text>
  <Image
          style={{width: 370, height: 160,alignSelf:'center',marginTop:15}}
          source={require('./imagenes/logo1.png')}
        />
  <Text style={{fontSize:16,marginTop:25,alignSelf:'center'}}>Administrador</Text>
  <View style={{marginLeft:10,marginRight:10}}>      
  <Input
  placeholder='USUARIO'
  onChangeText = {(text) => setUsuario(text)}
  rightIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
/>
  <Input 
  placeholder='CONTRASEÑA'
   onChangeText = {(contrasena) => setContrasena(contrasena)}
  secureTextEntry={true} 
  rightIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
    />
  }
/>
</View>
<TouchableOpacity style={{height: 50,backgroundColor:'purple', marginTop:15,borderRadius:5,justifyContent: 'center',marginLeft:20,marginRight:20}} onPress={() =>  Entrar()}>
  <Text style={{color:'white',fontSize:22,textAlign:'center', textAlignVertical:'center'}}>Ingresar</Text>
</TouchableOpacity>



  <View>
  
  <View>
    <Text style={{color:'black',fontSize:18,textAlign:'center', textAlignVertical:'center', paddingTop:10}}>¿No tines una cuenta?</Text>
  </View>

</View>
<TouchableOpacity style={{height: 50,backgroundColor:'purple', marginTop:5,borderRadius:5,justifyContent: 'center',marginLeft:20,marginRight:20}} onPress={() =>  Registro()}>
  <Text style={{color:'white',fontSize:22,textAlign:'center', textAlignVertical:'center'}}>Registrate</Text>
</TouchableOpacity>



  </View>
  );
}


//------------------------------------------------- M E N U   P R I N C I P A L ----------------------------------------------

MenuNav=({navigation,route})=>{

   navigationOptions = {
    header:null
  };

  const { idUsuario ,elNombreDeLaTienda} = route.params;
  const [names,setNames]=useState( [
         {
            id: 0,
            valor: 'Productos',
            url:'https://www.pngkit.com/png/full/350-3508614_productos-de-limpieza-industrial-en-cantabria-house-cleaning.png',
            pagina:"Productos",
          },
         {
            id: 1,
            valor: 'Clientes',
            url:'https://cdn-icons-png.flaticon.com/512/2919/2919600.png',
            pagina:"Clientes",
          }, 
          {
            id: 2,
            valor: 'Vender',
            url:'https://uploads-ssl.webflow.com/575ef60509a5a7a9116d9f8c/5d365b530eef9b33492165af_EGA%20Futura%20Ventas.png',
            pagina:"Vender",
          }, 
          {
            id: 3,
            valor: 'Reporte',
            url:'https://cdn-icons-png.flaticon.com/512/1055/1055644.png',
            pagina:"Reporte",
          }, 
      ]
   
)
   alertItemName = (item) => {
      alert(item.fruta)
   }

   ira = (item) => {
     navigation.navigate(item.pagina,{idUsuario})
   }

  
    return (
       <View>
        <View style={styles.container2}>
          <Text style = {styles.text2}>{elNombreDeLaTienda}</Text>
        </View>
       
            {
               names.map((item, index) => (
                 
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => ira(item)}>
                     
                      <Image source={{uri: item.url}} style={{width: 100, height: 100}} />

                      <Text style = {styles.text}>
                        {item.valor}
                      </Text>
                  
                  </TouchableOpacity>
                
               ))
            }
         </View>
    );
  
}

const styles = StyleSheet.create({
 container: {
      padding: 5,
      marginTop: 3,
      marginLeft:5, 
      marginRight:5,
      backgroundColor: '#c124ed',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
   },
    container2: {
      padding: 5,
      marginTop: 3,
      marginLeft:5, 
      marginRight:5,
      backgroundColor: '#380f37',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
   },
   container3: {
      padding: 5,
      marginTop: 3,
      marginLeft:5, 
      marginRight:5,
      backgroundColor: '#03300c',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
   },

   text: {
     marginTop:10,
     marginLeft:25,
     height: 40,
     fontSize:24,
      color: 'white',
      
   },
   text2: {
     marginTop:10,
     marginLeft:20,
     height: 40,
      fontSize:24,
      color: 'white',
      fontWeight: 'bold'
   },
   text3: {
     marginTop:3,
     marginLeft:20,
     height: 40,
      fontSize:24,
      color: 'black',
      fontWeight: 'bold'
      
   },
    text4: {
     marginTop:10,
     marginLeft:20,
     height: 40,
      fontSize:15,
      color: 'black',
      fontWeight: 'bold'
   },
   text5: {
     marginTop:10,
     marginLeft:20,
     height: 40,
      fontSize:24,
      color: '#0dd635',
      fontWeight: 'bold'
   },
})

//------------------------------------------------------ P A N T A L L A   D E   R E G I S T R O -------------------------------------------

PantallaRegistrarse=({navigation,route})=>{
  navigationOptions = {
    header:null
  }

  const [nombre,setNombre]=useState('')
  const [contrasena,setContrasena]=useState('')
  const [correo,setCorreo]=useState('')
  const [tienda,setTienda]=useState('')

  Guardar=()=>
  {
    
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=registroUsuario&nombre='+nombre
      +'&contrasena='+contrasena
      +'&correo='+correo
      +'&tienda='+tienda;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje=="error")
         alert("Error al agregar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
  }

  RegistrarUsuario=()=>{
      
  }

  return (
         <View style={{marginLeft:10,marginRight:10}}> 
  
          <Input
            placeholder='USUARIO'
            onChangeText = {(text) => setNombre(text)}
            
          />
          
          <Input 
            placeholder='CONTRASEÑA'
            onChangeText = {(contrasena) => setContrasena(contrasena)}
            secureTextEntry={true} 
            
          />
  
          <Input
            placeholder='CORREO'
            onChangeText = {(text) => setCorreo(text)}
            
          />

          <Input
            placeholder='TIENDA'
            onChangeText = {(text) => setTienda(text)}
            
          />

          <TouchableOpacity 
          style={{height: 50,backgroundColor:'purple', marginTop:15,borderRadius:5,justifyContent: 'center',marginLeft:20,marginRight:20}}
            onPress={() => Guardar()}
          >

          <Text style={{color:'white',fontSize:22,textAlign:'center', textAlignVertical:'center'}}>Registrarse</Text>
          </TouchableOpacity>
          
        </View>
      );



}


//----------------------------------------------------------------- L I S T A R   P R O D U C T O S ------------------------------------------
ListarProductos=({navigation,route})=> {
  const [elementos,setElementos]=useState([])
  const[total,setTotal]=useState(0)
  const { idUsuario } = route.params;
 
cargarRegistros=()=>
{

      fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=productos&id='+idUsuario, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
       
         const listado=responseJson;
         setElementos(listado)   
         setTotal(listado.length)
         
      })
      .catch((error) => {
         console.error(error);
      });
}

useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);



           
    return (
      <View style={{flex:1,backgroundColor:"white",padding:10}} >

              
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10, paddingTop:8,marginRight:10}}>{total} productos</Text>
      
      <FlatList
        data={elementos}
        renderItem={({ item }) => <TouchableOpacity
                     key = {item.id}
                     //onPress = {() => this.alertItemName(item)}
                     onPress={() => navigation.navigate('Detalleproduco',{producto:item})}
                     style={{marginTop:10,marginLeft:2,borderColor:"purple",borderRadius:5,borderWidth:2}}
                     >
                     <View style={{flexGrow: 1,flexDirection:'row',marginTop:15,marginLeft:2}}>
                     <Image
                      style={{width: 90, height: 90}}
                      source={{uri: item.urlproducto}}
                    />
                     <View style={{flex:1,marginLeft:5}}>
                     <Text style = {{flex:1,fontSize:14,flexWrap: 'wrap',flexShrink:1}}>
                        {item.nombre}
                     </Text>
                     <Text style = {{flex:1,fontSize:12,fontWeight: 'bold',}}>
                        ${item.preciodeventa}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight:"bold"}}>
                        quedan {item.cantidad} unidades
                     </Text>
                     </View>
                     </View>
                  </TouchableOpacity>}
        keyExtractor={item => item.id}
      />
        <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       position: 'absolute',                                          
       bottom: 10,                                                    
       right: 10,
       height:70,
       backgroundColor:'purple',
       borderRadius:100,
       
     }}
     onPress={() => navigation.navigate('Agregarproducto',{idUsuario:idUsuario})}
 >
   <Icon name="plus"  size={30} color="white" />
  </TouchableOpacity>
      </View>
    );
  
}

//const AppContainer = createAppContainer(RootStack);
function HomeScreen() {
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

//--------------------------------------------------------------- A G R E G A R   P R O D U C T O ----------------------------------
PaginaAgregar=({navigation,route})=>{
  const [nombre,setNombre]=useState('')
  const [descripcion,setDescripcion]=useState('')
  const [preciodeventa,setPreciodeventa]=useState('')
  const [preciodecosto,setPreciodecosto]=useState('')
  const [cantidad,setCantidad]=useState('')
  const [fotografia,setFotografia]=useState('')
 
  const { idUsuario } = route.params;
 
  navigationOptions = {
    title: 'Agregar producto',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  Guardar=()=>
  {
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=agregarProducto&nombre='+nombre
      +'&descripcion='+descripcion
      +'&cantidad='+cantidad
      +'&preciodecosto='+preciodecosto
      +'&preciodeventa='+preciodeventa
      +'&urlproducto='+fotografia
      +'&idusuario='+idUsuario;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje=="error")
         alert("Error al agregar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
  }

    return (
      <View style={{ flex: 1, padding:20,backgroundColor:'white' }}>
        <Input
         placeholder='Nombre'
         onChangeText = {(text) => setNombre(text)}
        />
        <Input
         inputStyle={{marginTop:10}}
         placeholder='Descripción'
         onChangeText = {(text) => setDescripcion(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='Precio de costo'
        onChangeText = {(text) =>setPreciodecosto(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='Precio de venta'
        onChangeText = {(text) => setPreciodeventa(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='Cantidad'
         onChangeText = {(text) => setCantidad(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='URL de fotografía'
         onChangeText = {(text) => setFotografia(text)}
        />
        <TouchableOpacity 
         style={{height: 50,backgroundColor:'purple', marginTop:15,borderRadius:5,justifyContent: 'center',marginLeft:20,marginRight:20}}
         onPress={() => Guardar()}
         >
         <Text style={{color:'white',fontSize:22,textAlign:'center', textAlignVertical:'center'}}>Guardar</Text>
        </TouchableOpacity>
      </View>
      
    );
  
}


//------------------------------------------------------------------ D E T A L L E S   D E   P R O D U C T O S --------------------------------
PaginaDetalle=({navigation,route})=>
{
  const { producto } = route.params;
 
  const [nombre,setNombre]=useState(producto.nombre)
  const [descripcion,setDescripcion]=useState(producto.descripcion)
  const [preciodeventa,setPreciodeventa]=useState(producto.preciodeventa)
  const [preciodecosto,setPreciodecosto]=useState(producto.preciodecosto)
  const [cantidad,setCantidad]=useState(producto.cantidad)
  const [fotografia,setFotografia]=useState(producto.urlproducto)
  const [id,setId]=useState(producto.id)
 const [idusuario,setIdusuario]=useState(producto.idusuario)
 
 
  Actualizar=()=>
  {
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=editarProducto&nombre='+nombre
      +'&descripcion='+descripcion
      +'&cantidad='+cantidad
      +'&preciodecosto='+preciodecosto
      +'&preciodeventa='+preciodeventa
      +'&urlproducto='+fotografia
      +'&id='+id
      +'&idusuario='+idusuario;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje==="error")
         alert("Error al actualizar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
      
  }

Eliminar=()=>
  {
    
      fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=eliminarProducto&id='+id, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje==="error")
         alert("Error al eliminar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
  }

  
   
    return (  
      <View style={{flex:1, backgroundColor:'white'}}>

    

       <TouchableOpacity 
         style={{backgroundColor:'#380f37',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5}}
         onPress={() => {Actualizar()}}
         >
         <Text style={{color:'white',fontSize:22}}>Actualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         style={{backgroundColor:'#380f37',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5}}
         onPress={() => {Eliminar()}}
         >
         <Text style={{color:'white',fontSize:22}}>Eliminar</Text>
        </TouchableOpacity>
    

      <ScrollView style={{flex:1}}> 
      <View style={{ flex: 1,padding:20 }}>
      
        <Input
         label="Nombre"
         value={nombre}
         placeholder='Nombre'
         onChangeText = {(text) => setNombre(text)}
        />
        <Input
        label="Descripción"
         value={descripcion}
         inputStyle={{marginTop:10}}
         placeholder='Descripción'
         onChangeText = {(text) => setDescripcion(text)}
        />
        <Input
        label="Precio de costo"
         value={preciodecosto}
        inputStyle={{marginTop:10}}
        placeholder='Precio de costo'
        onChangeText = {(text) => setPreciodecosto(text)}
        />
        <Input
        label="Precio de venta"
         value={preciodeventa}
        inputStyle={{marginTop:10}}
        placeholder='Precio de venta'
        onChangeText = {(text) => setPreciodeventa(text)}
        />
        <Input
        label="Cantidad"
         value={cantidad}
        inputStyle={{marginTop:10}}
        placeholder='Cantidad'
         onChangeText = {(text) => setCantidad(text)}
        />
        <Input
        label="Fotografía"
         value={fotografia}
        inputStyle={{marginTop:10}}
        placeholder='URL de fotografía'
         onChangeText = {(text) => setFotografia(text)}
        />
       
        </View>
       </ScrollView>
       </View>
      
    );
  
}

//------------------------------------------------------ L I S T A R   C L I E N T E S ------------------------------------------
ListarClientes=({navigation,route})=>{
  const [elementos,setElementos]=useState([])
  const[total,setTotal]=useState(0)
  const { idUsuario } = route.params;

  cargarRegistros=()=>{

      fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=clientes&id='+idUsuario, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
       
         const listado=responseJson;
         setElementos(listado)   
         setTotal(listado.length)
         
      })
      .catch((error) => {
         console.error(error);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
      <View style={{flex:1,backgroundColor:"white",padding:10}} >

              
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10, paddingTop: 8,  marginRight:10}}>{total} Clientes</Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => <TouchableOpacity
                     key = {item.id}
                     //onPress = {() => this.alertItemName(item)}
                     onPress={() => navigation.navigate('DetalleCliente',{producto:item})}
                     style={{marginTop:10,marginLeft:2,borderColor:"purple",borderRadius:5,borderWidth:2}}
                     >
                     <View style={{flexGrow: 1,flexDirection:'row',marginTop:15,marginLeft:2}}>
                     <Image
                      style={{width: 90, height: 90,}}
                      source={{uri: item.urlpersona}}
                    />
                     <View style={{flex:1,marginLeft:5}}>
                     <Text style = {{flex:1,fontSize:14,flexWrap: 'wrap',flexShrink:1}}>
                        {item.nombre}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight: 'bold',}}>
                        Correo : {item.correo}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight:"bold"}}>
                        Telefono : {item.telefono} 
                     </Text>
                     </View>
                     </View>
                  </TouchableOpacity>}
        keyExtractor={item => item.id}
      />
        <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       position: 'absolute',                                          
       bottom: 10,                                                    
       right: 10,
       height:70,
       backgroundColor:'purple',
       borderRadius:100,
       
     }}
     onPress={() => navigation.navigate('AgregarCliente',{idUsuario:idUsuario})}
 >
   <Icon name="plus"  size={30} color="white" />
  </TouchableOpacity>
      </View>
    );

}

//------------------------------------------------------ D E T A L L E S   D E L   C L I E N T E ----------------------------------

DetalleCliente=({navigation,route})=>{
  const { producto } = route.params;
  const [nombre,setNombre]=useState(producto.nombre)
  const [direccion,setDireccion]=useState(producto.direccion)
  const [telefono,setTelefono]=useState(producto.telefono)
  const [correo,setCorreo]=useState(producto.correo)
  const [fotografia,setFotografia]=useState(producto.urlpersona)
  const [id,setId]=useState(producto.id)
  const [idusuario,setIdusuario]=useState(producto.idusuario)

  Actualizar=()=>  //Actualiza el registro
  {
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=cambiarCliente&nombre='+nombre
      +'&direccion='+direccion
      +'&telefono='+telefono
      +'&correo='+correo
      +'&fotografia='+fotografia
      +'&idusuario='+idusuario
      +'&id='+id;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje==="error")
         alert("Error al actualizar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
      
  }

  Eliminar=()=>   //Elimina el registro
  {
    
      fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=eliminarCliente&id='+id, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje==="error")
         alert("Error al eliminar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
  }

  return (  
      <View style={{flex:1, backgroundColor:'white'}}>

    

       <TouchableOpacity 
         style={{backgroundColor:'#380f37',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5}}
         onPress={() => {Actualizar()}}
         >
         <Text style={{color:'white',fontSize:22}}>Actualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         style={{backgroundColor:'#380f37',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5}}
         onPress={() => {Eliminar()}}
         >
         <Text style={{color:'white',fontSize:22}}>Eliminar</Text>
        </TouchableOpacity>
    

      <ScrollView style={{flex:1}}> 
      <View style={{ flex: 1,padding:20 }}>

        <Input
         label="Nombre"
         value={nombre}
         onChangeText = {(text) => setNombre(text)}
        />
        <Input
        label="Dirección"
         value={direccion}
         inputStyle={{marginTop:10}}
         onChangeText = {(text) => setDireccion(text)}
        />
        <Input
        label="Telefono"
         value={telefono}
        inputStyle={{marginTop:10}}
        onChangeText = {(text) => setTelefono(text)}
        />
        <Input
        label="Correo"
        value={correo}
        inputStyle={{marginTop:10}}
        onChangeText = {(text) => setCorreo(text)}
        />
        <Input
        label="Fotografía"
        value={fotografia}
        inputStyle={{marginTop:10}}
         onChangeText = {(text) => setFotografia(text)}
        />
        </View>
       </ScrollView>
       </View>
      
  );

}

//------------------------------------------------------ A G R E G A R   N U E V O   C L I E N T E --------------------------------

AgregarCliente=({navigation,route})=>{
  const [nombre,setNombre]=useState('')
  const [direccion,setDireccion]=useState('')
  const [telefono,setTelefono]=useState('')
  const [correo,setCorreo]=useState('')
  const [fotografia,setFotografia]=useState('')
  const { idUsuario } = route.params;

  navigationOptions = {
    title: 'Agregar Nuevo cliente',
    headerStyle: {
      backgroundColor: 'purple',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  Guardar=()=>
  {
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=agregarClientes&nombre='+nombre
      +'&direccion='+direccion
      +'&telefono='+telefono
      +'&correo='+correo
      +'&fotografia='+fotografia
      +'&idusuario='+idUsuario;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje=="error")
         alert("Error al agregar!");
         else
         {
         alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
      });
  }

  return (
      <View style={{ flex: 1, padding:20,backgroundColor:'white' }}>
        <Input
         placeholder='Nombre'
         onChangeText = {(text) => setNombre(text)}
        />
        <Input
         inputStyle={{marginTop:10}}
         placeholder='Dirección'
         onChangeText = {(text) => setDireccion(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='Telefono'
        onChangeText = {(text) =>setTelefono(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='Correo'
        onChangeText = {(text) => setCorreo(text)}
        />
        <Input
        inputStyle={{marginTop:10}}
        placeholder='URL de fotografía'
         onChangeText = {(text) => setFotografia(text)}
        />
        <TouchableOpacity 
         style={{height: 50,backgroundColor:'purple', marginTop:15,borderRadius:5,justifyContent: 'center',marginLeft:20,marginRight:20}}
         onPress={() => Guardar()}
         >
         <Text style={{color:'white',fontSize:22,textAlign:'center', textAlignVertical:'center'}}>Guardar</Text>
        </TouchableOpacity>
      </View>
      
  );

}
//------------------------------------------------------------------- V E N T A S ---------------------------------------------
Vender=({navigation,route})=>{
  const [elementos,setElementos]=useState([])
  const[total,setTotal]=useState(0)
  const { idUsuario } = route.params;

  cargarRegistros=()=>{

    fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=clientes&id='+idUsuario, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
       
         const listado=responseJson;
         setElementos(listado)   
         setTotal(listado.length)
         
      })
      .catch((error) => {
         console.error(error);
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
      <View style={{flex:1,backgroundColor:"white",padding:10}} >

              
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10, paddingTop: 8,marginRight:10}}>{total} Clientes</Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => <TouchableOpacity
                     key = {item.id}
                     //onPress = {() => this.alertItemName(item)}
                     onPress={() => navigation.navigate('ElegirProductos',{idUsuario:idUsuario,datosCliente:item})}
                     style={{marginTop:10,marginLeft:2,borderColor:"gray",borderRadius:5,borderWidth:2}}
                     >
                     <View style={{flexGrow: 1,flexDirection:'row',marginTop:15,marginLeft:2}}>
                     <Image
                      style={{width: 90, height: 90,}}
                      source={{uri: item.urlpersona}}
                    />
                     <View style={{flex:1,marginLeft:5}}>
                     <Text style = {{flex:1,fontSize:14,flexWrap: 'wrap',flexShrink:1}}>
                        {item.nombre}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight: 'bold',}}>
                        Correo : {item.correo}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight:"bold"}}>
                        Telefono : {item.telefono} 
                     </Text>
                     </View>
                     </View>
                  </TouchableOpacity>}
        keyExtractor={item => item.id}
      />
      </View>
    );
}


//------------------------------------------------------ S E L E C C I O N A R   P R O D U C T O S   P A R A   V E N T A S ----------
let array = {}
let contItems = 1

ElegirProductos=({navigation,route})=>{
  let [elementos,setElementos]=useState([])
  const[total,setTotal]=useState(0)
  const { idUsuario } = route.params;
  const { datosCliente } = route.params;
  const [carrito, setCarrito] = useState([]);

  cargarRegistros=()=>{

    fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=productos&id='+idUsuario, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
       
         const listado=responseJson;
         setElementos(listado)   
         setTotal(listado.length)
         
      })
      .catch((error) => {
         console.error(error);
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
      <View style={{flex:1,backgroundColor:"white",padding:10}} >
              
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10, paddingTop: 8,marginRight:10}}>{total} productos</Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => <TouchableOpacity
                     key = {item.id}
                     
                     onPress = {() => {
                       const resultado = carrito.find( producto => producto.id === item.id );
                       
                       if (resultado== undefined) {
                        carrito.push({id:item.id, nombre:item.nombre,cantidad:1, url:item.urlproducto, preciodeventa:item.preciodeventa,preciodecosto:item.preciodecosto})
                        alert('Se ha agregado exitosamente'+JSON.stringify(carrito))
                       } else {
                          for(x of carrito)
                          {
                            if(x.id==item.id)
                            {
                              if(x.cantidad==item.cantidad) {
                                alert("Lo sentimos, el producto ya no se encuentra disponible")
                              } else {
                                x.cantidad++
                              }
                            }
                          }
                         }
                     }}
                     style={{marginTop:10,marginLeft:2,borderColor:"gray",borderRadius:5,borderWidth:2}}
                     >
                     <View style={{flexGrow: 1,flexDirection:'row',marginTop:15,marginLeft:2}}>
                     <Image
                      style={{width: 90, height: 90}}
                      source={{uri: item.urlproducto}}
                    />
                     <View style={{flex:1,marginLeft:5}}>
                     <Text style = {{flex:1,fontSize:14,flexWrap: 'wrap',flexShrink:1}}>
                        {item.nombre}
                     </Text>
                     <Text style = {{flex:1,fontSize:12,fontWeight: 'bold',}}>
                        ${item.preciodeventa}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight:"bold"}}>
                        {item.cantidad} unidades en existencia
                        
                     </Text>
                     </View>
                     </View>
                  </TouchableOpacity>
                  }
        keyExtractor={item => item.id}
      />
    <TouchableOpacity 
         style={{backgroundColor:'purple',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5, paddingTop: 5}}
         onPress = {() => {
           let venta = 0;
           let costo = 0;
            for (let a = 0; a < parseInt(carrito.length); a++) {
              plus = parseInt(JSON.stringify(parseInt(carrito[a].preciodeventa)))* parseInt(JSON.stringify(parseInt(carrito[a].cantidad)));
              venta  = venta + plus

              plus2 = parseInt(JSON.stringify(parseInt(carrito[a].preciodecosto)))* parseInt(JSON.stringify(parseInt(carrito[a].cantidad)));
              costo = costo + plus2
            }
            
            navigation.navigate('Carrito',{idUsuario:idUsuario,datosCliente:carrito,cliente:datosCliente,costo:costo,venta :venta })}

          }
         >
         <Text style={{color:'white',fontSize:22}}>Comprar</Text>
        </TouchableOpacity>
      </View>
      
  );
}

//------------------------------------------------------ C O M P R A   F I N A L   V E N T A S -----------------------------------
PantallCompraFinal=({navigation,route})=>{
  const { idUsuario } = route.params;
  const { datosCliente } = route.params;
  const { cliente } = route.params;
  const { costo } = route.params;
  const { venta } = route.params;
  var [fecha,setFecha]=useState('')
  let [elementos,setElementos]=useState([])
  let { i } = useState(0)
  let suma = useState(0)
  let [idRecibo,setidRecibo]=useState([])

    cargarRegistros=()=>{
      fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=productos&id='+idUsuario, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         const listado=responseJson;
         setElementos(listado)
         setTotal(listado.length)
         
      })
      .catch((error) => {
         console.error(error);
    });
  }

  guardarRecibo=(fecha,idCliente,_costo,_venta)=>{    
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=agregarRecibo&fecha='+fecha
      +'&idcliente='+idCliente
      +'&costo='+_costo
      +'&venta='+_venta;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje=="error")
          alert("Error al guardar recibo!");
         else
         {
         //alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!(Recibo)");
    });
  }

  guardarDetalle=(_idRecibo,idProducto,cantidad, precio)=>{
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=detalleAgregar&idrecibo='+_idRecibo
      +'&idproducto='+idProducto
      +'&cantidad='+cantidad
      +'&precio='+precio;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje=="error")
          alert("Error al guardar Detalle!");
         else
         {
         //alert(mensaje);
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!(Detalle)");
      });
  }

  getLastId=()=>{          
    fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=ultimoRegistroGuardado', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        const listado=responseJson;
        setidRecibo(listado)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  editarCantidadProducto=(cantidad, id)=>{
    const urlapi='https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=cambiarCantidadProducto'
      +'&cantidad='+cantidad
      +'&id='+id;
      
      fetch(urlapi, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         const mensaje=responseJson.estatus;
         console.log(mensaje);
         if(mensaje==="error")
         alert("Error al actualizar!");
         else
         {
          navigation.goBack();
         }
      })
      .catch((error) => {
         console.error(error);
         alert("Error de Internet!!");
    });    
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      getLastId();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
  <View style={{flex:1,backgroundColor:"white",padding:10}} >
  <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10, paddingTop: 8,marginRight:10}}>Cliente : {cliente.nombre}</Text>
      <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10, paddingTop: 8, marginRight:10}}>{datosCliente.length} productos</Text>
          <FlatList
        data={datosCliente}
        renderItem={({ item }) => <TouchableOpacity
                     key = {item.id}
                     
                     onPress = {() => {
                       const resultado = carrito.find( producto => producto.id === item.id );
                       if (resultado== undefined & x.cantidad!=0) {
                        carrito.push({id:item.id, nombre:item.nombre,cantidad:1, url:item.urlproducto, preciodeventa:item.preciodeventa})
                        alert('Agregado a carrito!'+JSON.stringify(carrito))
                       } else {
                         if(x.cantidad==item.cantidad) {
                           alert("Ya no puedes agregar mas al carrito, se acabo este producto")
                         } else {

                          for(x of carrito)
                          {
                            if(x.id==item.id)
                            {
                              x.cantidad++
                            }
                          }
                         }
                       }
                     }}
                     style={{marginTop:10,marginLeft:2,borderColor:"purple",borderRadius:5,borderWidth:2}}
                     >
                     <View style={{flexGrow: 1,flexDirection:'row',marginTop:15,marginLeft:2}}>
                     <Image
                      style={{width: 90, height: 90}}
                      source={{uri: item.url}}
                    />
                     <View style={{flex:1,marginLeft:5}}>
                     <Text style = {{flex:1,fontSize:14,flexWrap: 'wrap',flexShrink:1}}>
                        {item.nombre}
                     </Text>
                     <Text style = {{flex:1,fontSize:12,fontWeight: 'bold',}}>
                        ${item.preciodeventa}
                     </Text>
                     <Text style = {{flex:1,fontSize:10,fontWeight:"bold"}}>
                        Agregaste {item.cantidad} unidad(es)
                        
                     </Text>
                     </View>
                     </View>
                  </TouchableOpacity>
                  }
        keyExtractor={item => item.id}
      />
      <View style={styles.container2}>
      <Text style = {styles.text2}>Precio de costo $ {costo} </Text>
      </View>
      <View style={styles.container2}>
      <Text style = {styles.text2}>Precio de venta $ {venta} </Text>
      </View>
        
          <TouchableOpacity 
         style={{backgroundColor:'purple',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5}}
         onPress = {() => {
          
            let idObtenido = [];
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-'+ dd
          
            guardarRecibo(today,idUsuario,costo,venta);
            getLastId();

            let idres = parseInt(JSON.stringify(parseInt(idRecibo[0].id))) + 1
            for (let x = 0; x <= parseInt(datosCliente.length) - 1; x++) {
              setTimeout(() => {  guardarDetalle(idres,datosCliente[x].id,datosCliente[x].cantidad, datosCliente[x].preciodeventa); }, 500);
              
            }

            for (let x = 0; x <= parseInt(datosCliente.length) - 1; x++) {
              setTimeout(() => {  editarCantidadProducto(parseInt(elementos[x].cantidad) - datosCliente[x].cantidad,datosCliente[x].id ); }, 500);
              
            }

            navigation.navigate(-4)
           
           }}
         >
         <Text style={{color:'white',fontSize:22, paddingTop:5}}>OK</Text>
        </TouchableOpacity>
      </View>
  );
}

//------------------------------------------------------ R E P O R T E   F E C H A S -------------------------------------------

Reporte=({navigation,route})=>{
  const[total,setTotal]=useState(0)
  const { idUsuario } = route.params;
  const { datosCliente } = route.params;
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
     
    return (
      <View style={{flex:1,backgroundColor:"white",padding:10}} >
      <Text style = {styles.text3}>De la fecha</Text>
      <DatePicker

      mode="date"
      minuteInterval={3}
      onSelectedChange={selectedTime => setTime1(selectedTime)}

    />

      <Text style = {styles.text3}>A la fecha</Text>
      <DatePicker

      mode="date"
      minuteInterval={3}
      onSelectedChange={selectedTime => setTime2(selectedTime)}
      on
    />

    <TouchableOpacity 
         style={{backgroundColor:'purple',height:40,borderRadius:5, alignItems: "center", marginTop:20,marginBottom:20}}
         onPress={() => navigation.navigate('ReporteFinanciero',{idUsuario:idUsuario,time1:time1,time2:time2})}
         >
         <Text style={{color:'white',fontSize:22, paddingTop: 8}}>Generar Reporte</Text>
        </TouchableOpacity>
      </View>
    );
}

//------------------------------------------------------ R E P O R T E   F I N A L --------------------------------------------------------
ReporteFinanciero=({navigation,route})=> {
  const [elementos,setElementos]=useState([])
  const { idUsuario } = route.params;
  const { time1 } = route.params;
  const { time2 } = route.params;

  cargarRegistros=()=>
  {
    fetch('https://pmoviles1jj.000webhostapp.com/api/apiv.php?comando=filtrarFecha&idcliente='+idUsuario+
    '&inicio='+time1+
    '&final='+time2
    , {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
        
          const listado=responseJson;
          setElementos(listado)   
          setTotal(listado.length)
         
          
        })
        .catch((error) => {
          console.error(error);
        });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);






      return (
      <View style={{flex:1,backgroundColor:"white",padding:10}} >

      <FlatList
        data={elementos}
        renderItem={({ item }) => <TouchableOpacity
                     key = {item.id}
                     //onPress = {() => this.alertItemName(item)}
                     >
                     <View style={{flex:1,backgroundColor:"white",padding:10}} >

                      <Text style = {styles.text4}>De la fecha {time1} a la fecha {time2}</Text>

                      <Text style = {styles.text4}>Precio al costo de los productos vendidos : </Text>
                      <View style={styles.container2}>
                        <Text style = {styles.text2}>$ {item.costo} </Text>
                      </View>
                      

                      <Text style = {styles.text4}>Precio a la venta de los productos vendidos : </Text>
                      <View style={styles.container2}>
                        <Text style = {styles.text2}>$ {item.venta} </Text>
                      </View>

                      <Text style = {styles.text4}>Ganancia total : </Text>
                      <View style={styles.container3}>
                        <Text style = {styles.text5}>$ {item.ganancia} </Text>
                      </View>
                    </View>

                    <View>
                      <TouchableOpacity 
                        style={{backgroundColor:'purple',height:40,borderRadius:5, alignItems: "center",marginLeft:5,marginRight:5, marginTop:5}}
                        onPress = {() => {
                          navigation.goBack();
                          navigation.goBack();
                        }}
                        >
                        <Text style={{color:'white',fontSize:22, paddingTop:5}}>OK</Text>
                      </TouchableOpacity>
                    </View>
                    

                  </TouchableOpacity>}
        keyExtractor={item => item.id}
      />

      </View>
  );
     

  
}

//------------------------------------------------------ B A R R A S   D E   N A V E G A C I O N -----------------------------------
const Stack = createNativeStackNavigator();

function App() {

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={PantallaInicio} options={{headerShown: false}} />
        <Stack.Screen name="Productos" component={ListarProductos} options={{headerShown: true,headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Agregarproducto" component={PaginaAgregar} options={{headerShown: true,title: 'Agregar producto', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Detalleproduco" component={PaginaDetalle} options={{headerShown: true,title: 'Editar producto', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Menu" component={MenuNav} options={{headerShown: true,      title:      'Menu de inicio', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Registro" component={PantallaRegistrarse} options={{headerShown: true,      title:      'Registrarse', headerStyle: {
    backgroundColor: 'purple'
  },headerTintColor: '#fff'}} />
          <Stack.Screen name="DetalleCliente" component={DetalleCliente} options={{headerShown: true, title:      'Detalle del cliente',headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />  
  <Stack.Screen name="Clientes" component={ListarClientes} options={{headerShown: true,headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="AgregarCliente" component={AgregarCliente} options={{headerShown: true,title: 'Agregar Cliente', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Vender" component={Vender} options={{headerShown: true,title: 'Selecciona el cliente', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="ElegirProductos" component={ElegirProductos} options={{headerShown: true,title: 'Elige los productos', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Carrito" component={PantallCompraFinal} options={{headerShown: true, title: 'Productos a vender',headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="Reporte" component={Reporte} options={{headerShown: true,title: 'Fecha de los tickets', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
          <Stack.Screen name="ReporteFinanciero" component={ReporteFinanciero} options={{headerShown: true,title: 'Reporte de ventas en un periodo dado', headerStyle: {
            backgroundColor: 'purple'
          },headerTintColor: '#fff'}} />
      </Stack.Navigator>
      

          
          

    </NavigationContainer>
  );
}

export default App;