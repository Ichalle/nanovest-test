import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import ListCoin from '../components/ListCoin'
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [isGrid, setIsGrid] = useState<boolean>(true)
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>View</Text>
        <TouchableOpacity
          onPress={() => {
            setIsGrid(!isGrid)
          }}>
          {isGrid ? (
            <Ionicons name="md-grid-outline" size={24} color="black" />
            ) : (
            <Ionicons name="md-list" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <ListCoin isGrid={isGrid} />
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  viewContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  }
});


export default HomeScreen