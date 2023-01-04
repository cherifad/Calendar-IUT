import React from 'react';
import {Pressable, Text, View} from 'react-native';

type MyProps = {
  date: Date;
  sameDate: boolean;
  day: String;
  moment: String;
  Type: string;
  plats: Array<string>;
};

const frenchDay: {[index: number]: string} = {
  0: 'Dimanche',
  1: 'Lundi',
  2: 'Mardi',
  3: 'Mercredi',
  4: 'Jeudi',
  5: 'Vendredi',
  6: 'Samedi',
};

const frenchMonth: {[index: number]: string} = {
    0: 'Janvier',
    1: 'Février',
    2: 'Mars',
    3: 'Avril',
    4: 'Mai',
    5: 'Juin',
    6: 'Juillet',
    7: 'Août',
    8: 'Septembre',
    9: 'Octobre',
    10: 'Novembre',
    11: 'Décembre',
  }

type MyState = {
  modalVisible: boolean;
};

const today = new Date();

export default class FoodCard extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return false;
  }

  render() {
    return (
      <View>
        <Pressable onPress={() => this.setState({modalVisible: true})}>
          <View className="p-5" style={this.props.sameDate ? {marginBottom: -50} : {marginBottom: -25}}>

            {/** If it's another day */}
            {this.props.sameDate ? (
              <View className="flex-row items-center mb-2">
                <View className="flex-1 h-1 bg-black mr-2"></View>
                <Text className="font-bold">
                  {frenchDay[this.props.date.getUTCDay()] +
                    ' ' +
                    (this.props.date.getUTCDate()).toString() +
                    ' ' +
                    frenchMonth[this.props.date.getUTCMonth()]}
                </Text>
                <View className="flex-1 h-1 bg-black ml-2"></View>
              </View>
            ) : null}

            <View
              className="p-3 rounded-xl border-black dark:border-white"
              style={{
                borderLeftWidth: 2.5,
                borderRightWidth: 2.5,
                borderTopWidth: 2.5,
                borderBottomWidth: 4.5,
                backgroundColor: this.props.date.getDate() == today.getUTCDate() ? '#f1faee' : '#edede9',
              }}>
              <Text className="mb-2 italic">
                {this.props.moment}
              </Text>
              <Text className="mb-2 text-3xl font-extrabold uppercase text-black">
                {this.props.Type}
              </Text>
              <Text className="dark:text-black text-black">
                {this.props.plats.map((plat) => {
                    return plat + '\n';
                })}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}
