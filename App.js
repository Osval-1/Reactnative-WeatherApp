import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/Weather.js'


export default function App() {

  return (
    <View style={styles.container}>
      <Weather></Weather>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#070707',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
