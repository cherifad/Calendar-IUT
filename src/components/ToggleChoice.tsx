import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
} from 'react-native';

type MyProps = {
  text: string;
  theme: any;
};

type MyState = {
  isEnabled: boolean;
};

export default class ToggleChoice extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  render() {
    const toggleSwitch = () =>
      this.setState({isEnabled: !this.state.isEnabled});
    return (
      <View className=" mt-2 mb-2">
        <Pressable onPress={toggleSwitch}>
          <View className='flex-row justify-between'>
            <View className="flex-row">
              <Text
                style={{color: this.props.theme.text}}
                className="text-base">
                {this.props.text}{' '}
              </Text>
              {this.state.isEnabled ? (
                <Text style={styles.green} className="text-base">
                  On
                </Text>
              ) : (
                <Text style={styles.red} className="text-base">
                  Off
                </Text>
              )}
            </View>
            <View>
              <Switch
                trackColor={{false: '#767577', true: '#7CFC00'}}
                thumbColor={this.state.isEnabled ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={this.state.isEnabled}
              />
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
});
