import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native';

export default function Details({ route, navigation }) {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [films, setFilms] = useState('');
  const [shortFilms, setShortFilms] = useState('');
  const [tvShows, setTvShows] = useState('');
  const [videoGames, setVideoGames] = useState('');
  const [parkAttractions, setParkAttractions] = useState('');
  const [created, setCreated] = useState('');
  const [updated, setUpdated] = useState('');
  
  useEffect(() => {
    if (route.params?.character) {
      setName(route.params.character.name);
      setCreated(convertDatetime(route.params.character.createdAt));
      setUpdated(convertDatetime(route.params.character.updatedAt));
      setImage(route.params.character.imageUrl);
      setFilms(route.params.character.films.join(", "));
      setShortFilms(route.params.character.shortFilms.join(", "));
      setTvShows(route.params.character.tvShows.join(", "));
      setVideoGames(route.params.character.videoGames.join(", "));
      setParkAttractions(route.params.character.parkAttractions.join(", "));
    }
    BackHandler.addEventListener('hardwareBackPress',close);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress',close);
    }
  }, [route.params?.character])

  const convertDatetime = (datetime) => {
    const date = datetime.split("T")[0].split("-").reverse().join(".");
    const time = datetime.split("T")[1].slice(0, -5);
    return date + " " + time;
  }
 
  const close = () => {
    navigation.goBack(null);
    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text>Created: {created}</Text>
      <Text>Updated: {updated}</Text>
      { image.length > 0 && 
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
      }
      <Text>Films: {films}</Text>
      <Text>Short films: {shortFilms}</Text>
      <Text>TV shows: {tvShows}</Text>
      <Text>Video games: {videoGames}</Text>
      <Text>Park attractions: {parkAttractions}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  characters: {
    padding: 20,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  imageWrapper: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
});