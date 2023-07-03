import { StyleSheet, View, Text, Alert, TextInput, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'


const openWeatherApiKey = 'insert your key here'
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
const Weather = () => {
    const [cityName, setCityName] = useState('')
    const [currentWeather, setCurrentWeather] = useState({
        description: '', icon: '', temp: '', humidity: ''
    })
    const [coordinates, setCoordinates] = useState({
        longitude: null,
        latitude: null
    })
    useEffect(() => {
        return findWeather
    },[coordinates])

    const findCity = async () => {
        let location

        try {
            //fetch coordinates from Api
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${openWeatherApiKey}`)
            //check if network is responsive 
            if (!response.ok) {
                throw new Error("Network response was not OK,could not get the coordinates");
            }
            //convert to json
            location = await response.json();
        } catch (error) {
            console.log(error)
        } finally {
            // console.log(location)
            setCoordinates({ longitude: location[0].lon, latitude: location[0].lat }
            )
            findWeather()
        }

    }
    const findWeather = async () => {
        let weather
        try {
            //fetch Weather from Api
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${openWeatherApiKey}&units=metric`)
            //check if network is responsive 
            if (!response.ok) {
                throw new Error("Network response was not OK,could not get the weather");
            }
            //convert to json
            weather = await response.json();
        } catch (error) {
            console.log(error)
        } finally {
            console.log(weather)
            setCurrentWeather({
                description: weather.weather[0].description,
                icon: weather.weather[0].icon,
                temp: weather.main.temp,
                humidity: weather.main.humidity,
            })
        }
    }
    const { description, icon, temp, humidity } = currentWeather
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter City Name"
                    placeholderTextColor={'#fff'}
                    onChangeText={(city) => setCityName(city)}
                />
                <Pressable style={styles.button} title='Search' onPress={findCity} >
                    <Text style={styles.text}>Search</Text>
                </Pressable>
            </View>
            <Text style={styles.text}>Weather in {cityName}</Text>
        < View style = {
    styles.inputContainer
                } >
<Text Text style = {
    styles.text
} > precipitation :
</Text>


                <Text style={styles.text} >{description}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Temperature: </Text>
                <Text style={styles.text} >{temp}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>humidity: </Text>
                <Text style={styles.text} >{humidity}</Text>
            </View>
        </View>
    )
}

export default Weather
const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 200,
        color: '#fff',
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '070707',
        justifyContent: 'space-between',
    },
    textInput: {
        color: '#fff',
        backgroundColor: '#201f1f',
        width: 200,
        padding: 10,
        margin: 2,
        borderRadius: 20,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#201f1f',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});