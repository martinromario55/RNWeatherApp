import { StatusBar } from 'expo-status-bar'
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

export default function App() {
  // Weather API
  const [city, setCity] = useState(null)
  useEffect(() => {
    const getWeather = async () => {
      const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=Nairobi'
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      }

      try {
        const response = await fetch(url, options)
        const result = await response.json()
        setCity(result)
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }
    getWeather()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {city && (
        <ImageBackground
          source={{
            uri: city.current.is_day
              ? 'https://bit.ly/4bzYX30'
              : 'https://bit.ly/3HRzjsy',
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>{city.location.name}</Text>
            <Feather name="settings" size={24} color="#fff" />
          </View>

          <View style={styles.temp}>
            <Text style={styles.tempShown}>{`${city.current.temp_c}°`}</Text>
            <Text style={styles.tempText}>{city.current.condition.text}</Text>
          </View>

          <View style={styles.condition}>
            <Text
              style={styles.feels}
            >{`Feels like ${city.current.feelslike_c}°`}</Text>
            <Text style={styles.weather}>
              <Feather name="wind" size={24} color="#fff" />
              {`${city.current.wind_kph}Kph`}
            </Text>
          </View>
        </ImageBackground>
      )}
      {Platform.OS === 'ios' && <StatusBar style="dark" />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  temp: {
    alignItems: 'center',
  },
  tempShown: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 140,
  },
  tempText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  condition: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingHorizontal: 10,
    paddingVertical: 70,
    marginTop: 32,
  },
  feels: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  weather: {
    color: '#fff',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
