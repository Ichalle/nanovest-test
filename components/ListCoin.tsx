import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ScrollView,
  Image } from 'react-native';
import { useState, useEffect } from 'react';
import services from '../services';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { Coins } from '../interfaces'
import { useNavigation } from '@react-navigation/native';


const Item = ({ data }: { data: Coins }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={{marginBottom: 30}}
      onPress={() => {
        navigation.navigate<any>('CoinDetail', { ...data } )
      }}
    >
      <Image
        style={{width: 50, height: 50}}
        source={{uri:data.icon_url}}
      />
      <Text>{data.name}</Text>
    </TouchableOpacity>
  );
}

const CoinList = () => {
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
      <ScrollView>
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        ) : (
          <Text>Loading...</Text>
        )}

      </ScrollView>
    </>
  )
}

export default CoinList