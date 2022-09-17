import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([])

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}` )
    .then(response => response.json())
    .then(data => setRepositories(data.meals))
    .catch(error => {
      Alert.alert('Jokin meni pieleen', error)
    })
  }


  return (
    <View style={styles.container}>
      
      <FlatList
        style={{width:350}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
          <View>
            <Text style={{fontSize: 17, fontWeight: "bold"}}> {item.strMeal} </Text>
          
            <Image 
              style={{ width: 100, height: 100}}
              source={{ uri: `${item.strMealThumb}`}}
            />
            
          </View>
        }
        data={repositories}
      />

      <TextInput style={styles.input}
        placeholder='Antaisitko hakusanan, kiitos.'
        onChangeText={ text => setKeyword(text) }        
      />

      <Button
        title='Etsi'
        onPress={getRepositories}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 23,
    width: 300
  }
});
