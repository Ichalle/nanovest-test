import { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addWatchlist } from "../redux/watchlistReducer";
import { Text, View } from '../components/Themed';

const CoinDetailScreen = ({ route, navigation }: any) => {
  const data = route.params
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(addWatchlist(data));
  })

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
