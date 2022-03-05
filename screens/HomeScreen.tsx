import { StyleSheet } from 'react-native';

import ListCoin from '../components/ListCoin'
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Coin</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ListCoin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


export default HomeScreen