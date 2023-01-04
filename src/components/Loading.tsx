import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Loading = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setInterval(() => {
            toggleLoading();
        }, 500);
    }, []);

    function toggleLoading() {
        setLoading(!loading);
    }

  return (
    <View
      className="p-5 flex-row items-center mb-5 mt-5 rounded-xl border-x-2 border-t-2 border-black border-b-4"
      style={[styles.container, {backgroundColor: '#e63946'}]}>
      <View>
        <Text className="text-4xl font-extrabold text-black">
          Chargement {loading ? '...' : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 2.5,
    borderBottomWidth: 4.5,
  },
});

export default Loading;
