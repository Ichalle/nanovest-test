import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Coins } from '../interfaces'

const CoinDetailScreen = ({ route, navigation }: any) => {
  const data = route.params
  return (
    <View style={styles.container}>
      <Image
        style={{width: 50, height: 50}}
        source={{uri:data.icon_url}}
      />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.title}>{data.max_supply}</Text>
      <Text style={styles.title}>{data.name_full}</Text>
      <Text style={styles.title}>{data.symbol}</Text>
    </View>
  );
}

export default CoinDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
