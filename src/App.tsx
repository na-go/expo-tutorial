import { registerRootComponent } from 'expo'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import TopPage from './top-page'

export default function App() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopPage />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

registerRootComponent(App)
