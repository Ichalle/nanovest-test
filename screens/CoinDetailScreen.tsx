import { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addWatchlist, removeWatchlist } from "../redux/watchlistReducer";
import { Text, View } from '../components/Themed';

const CoinDetailScreen = ({ route, navigation }: any) => {
  const data = route.params
  const [watched, setWatched] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const dataWatchlist = useSelector((state: RootState) => state);

  const addToWatchlist = () => {
    dispatch(addWatchlist(data));
  }

  useEffect(() => {
    if (data && dataWatchlist.length > 0) {
      dataWatchlist.map((o) => {
        if (o.name === data.name) {
          setWatched(true)
        }
      })
    } else {
      setWatched(false)
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.cardLogo}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri:data.icon_url}}
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.title}>{data.name_full}</Text>
        <Text style={styles.description}>
          Max Supply: {' '}
          <Text style={[styles.description, {fontWeight: '600'}]}>
            {data.max_supply}
          </Text>
        </Text>
      </View>
      <View>
        {watched ? (
          <TouchableOpacity style={[styles.btn, styles.bgRed]} onPress={() => {
              console.log(data.name, 'dataname,,')
              dispatch(removeWatchlist(data.name))
            }}>
            <Text style={styles.textWhite}>
              Remove from watchlist
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={() => addToWatchlist()}>
            <Text style={styles.textWhite}>
              Add to watchlist
            </Text>
          </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}

export default CoinDetailScreen;

const styles = StyleSheet.create({
  cardLogo: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#9999',
    margin: '1%',
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginBottom: -60,
    zIndex: 10
  },
  cardBody: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#9999',
    backgroundColor: '#F1EAFE',
    margin: '1%',
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  btn: {
    backgroundColor: '#561FA3',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20
  },
  bgRed: {
    backgroundColor: '#ff0000'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    MarginTop: 20,
    color: '#561FA3'
  },
  description: {
    fontSize: 20,
    color: '#561FA3'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textWhite: {
    color: '#fff'
  }
});
