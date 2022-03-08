import { StyleSheet, FlatList , Button,
  ListRenderItem, TouchableOpacity, Image, ScrollView} from 'react-native';

import { Text, View } from '../components/Themed';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { removeWatchlist } from "../redux/watchlistReducer";
import { Coins } from '../interfaces'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Item = ({ data }: { data: Coins }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <TouchableOpacity
      style={[styles.listItem, styles.rowBetween]}
    >
      <View style={[styles.rowBetween, {backgroundColor: 'transparent', alignItems: 'center',}]}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri:data.icon_url}}
        />
        <Text style={styles.labelCoin}>{data.name}</Text>
      </View>
      <Button
        title='delete'
        onPress={() => {
          dispatch(removeWatchlist(data.name))
        }}
      />
    </TouchableOpacity>
  );
}

const MyWatchListScreen = () => {
  const dataWatchlist = useSelector((state: RootState) => state);
  const renderItem: ListRenderItem<Coins> = ({ item }) => (
    <Item data={item} />
  );
  return (
    <ScrollView style={[styles.widthFull, styles.px20, styles.bgGray]}>
      {dataWatchlist && dataWatchlist.length > 0 ? (
        <>
          <FlatList
            data={dataWatchlist}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        </>
        ) : (
          <Text>You don't have watchlists</Text>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
  widthFull: {
    width: windowWidth
  },
  px20: {
    paddingRight: 20,
    paddingLeft: 20
  },
  bgGray: {
    backgroundColor: '#f7f7f7'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomColor: '#9999',
    borderBottomWidth: 1
  },
  labelCoin: {
    fontSize: 18,
    paddingLeft: 20
  }
});

export default MyWatchListScreen;