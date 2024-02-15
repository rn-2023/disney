import { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';

const URL = 'https://api.disneyapi.dev/character';

export default function Characters({ navigation }) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(
      (result) => {
        setError(null);
        setIsLoaded(true);
        let sortedCharacters = 
          result.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setCharacters(sortedCharacters);
      },(error) => {
        setError(error);
        setIsLoaded(true);
        setCharacters([]);
      }
    )
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  else if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {characters.map((character, index) => (
            (character.imageUrl !== undefined)  &&
            <Pressable 
              key={index} 
              onPress={() => navigation.navigate('Details', {character: character}) }>
                <View style={styles.characters} key={character._id}>
                  <Text style={styles.character}>{character.name}</Text>
                  <View style={styles.imageWrapper}>
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: character.imageUrl,
                      }}
                    />
                  </View>
                </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  characters: {
    padding: 20,
    alignItems: 'stretch',
    borderTopWidth: 2,
    borderTopColor: '#333'
  },
  imageWrapper: {
    alignItems: 'center',
  },
  character: {
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 0,
    padding: 0,
  },
  thumbnail: {
    width: 250,
    height: 250,
  },
});