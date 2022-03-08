import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ScrollView,
  Image,
  View,
  ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import services from '../services';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text } from './Themed';
import { Coins } from '../interfaces'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

type Props = {
  isGrid?: boolean
}

const Item = ({ data }: { data: Coins }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate<any>('CoinDetail', { ...data } )
      }}
    >
      <Image
        style={{width: 50, height: 50}}
        source={{uri:data.icon_url}}
      />
      <Text style={styles.labelCoin}>{data.name}</Text>
    </TouchableOpacity>
  );
}

const CoinList = ({ isGrid }: Props) => {
  const navigation = useNavigation()
  const [key, setKey] = useState<string>('')
  const [data, setData] = useState<Coins[]>([])

  const renderItem: ListRenderItem<Coins> = ({ item }) => (
    <Item data={item} />
  );

  useEffect(() => {
    setKey('1935fb1087e519cd0092976a6c34426d')
    const getData = async () => {
      try {
        await services.getCoins(key).then((resp) => {
          if (resp && resp.crypto) {
            setData(Object.values(resp.crypto))
          } else {
            setData([])
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [key])

  return (
    <>
      <ScrollView style={[styles.widthFull, styles.px20, styles.bgGray]}>
        {data && data.length > 0 ? (
          <>
            {isGrid ? (
            <>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {data && data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.cardGrid}
                      key={index}
                      onPress={() => {
                        navigation.navigate<any>('CoinDetail', { ...item } )
                      }}>
                      <Image
                        style={{width: 50, height: 50}}
                        source={{uri:item.icon_url}}
                      />
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </>
            ) : (
              <>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.name}
                />
              </>
            ) }
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  cardGrid: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#9999',
    margin: '1%',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120
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
})

export default CoinList