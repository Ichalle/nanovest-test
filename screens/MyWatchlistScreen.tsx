import { StyleSheet, TextInput , Button} from 'react-native';
import { useState } from 'react';

import { Text, View } from '../components/Themed';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { removeWatchlist } from "../redux/watchlistReducer";


const MyWatchListScreen = () => {
  const dataWatchlist = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  console.log(dataWatchlist, 'datawatchlists,,,,,')
  return (
    <View style={styles.container}>
      {dataWatchlist.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Button
            title='delete'
            onPress={() => {
              dispatch(removeWatchlist(item.name))
            }}
          />
        </View>
      ))}
    </View>
  );
}

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

export default MyWatchListScreen;