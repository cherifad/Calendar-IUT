import React from 'react';
import {Pressable, Text, View} from 'react-native';

type MyProps = {
  start: Date;
  end: Date;
  name: string;
  place: string;
  prof: string;
  theme: any;
  group: string;
  color: string;
  showDate: boolean;
};

const frenchDay: {[index: number]: string} = {
  0: 'Dimanche',
  1: 'Lundi',
  2: 'Mardi',
  3: 'Mercredi',
  4: 'Jeudi',
  5: 'Vendredi',
  6: 'Samedi',
}

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

function Progression(start: Date, end: Date, current: Date) {
  if (current < start) {
    return 'Pas encore commencé';
  } else if (current > end) {
    return 'Terminé';
  } else {
    const inter = end.getTime() - start.getTime();
    const progress = current.getTime() - start.getTime();
    return ((progress * 100) / inter).toFixed(1).toString() + '%';
  }
}

export default class StudyCard extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (this.props.prof !== nextProps.prof) {
      return true;
    }
    if (this.props.theme !== nextProps.theme) {
      return true;
    }
    if (this.props.group !== nextProps.group) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        <Pressable onPress={() => this.setState({modalVisible: true})}>
          <View className="p-5" style={{marginBottom: -25}}>

            {/** If it's another day */}
            {this.props.showDate ? (
            <View className='flex-row items-center mb-2'>
              <View className='flex-1 h-1 bg-black mr-2'></View>
              <Text className='font-bold'>{
              frenchDay[this.props.start.getUTCDay()] + ' ' + 
              (this.props.start.getUTCDate()).toString() + ' ' + 
              frenchMonth[this.props.start.getUTCMonth()]
                }</Text>
              <View className='flex-1 h-1 bg-black ml-2'></View>
            </View>
            ) : null}

            <View
              className="p-3 rounded-xl border-black dark:border-white"
              style={{
                borderLeftWidth: 2.5,
                borderRightWidth: 2.5,
                borderTopWidth: 2.5,
                borderBottomWidth: 4.5,
                backgroundColor: this.props.color,
              }}>
              <Text className="mb-2 italic">
                {this.props.place} -{' '}
                {Progression(this.props.start, this.props.end, today)}
              </Text>
              <Text className="mb-2 text-3xl font-extrabold uppercase text-black">
                {this.props.name}
              </Text>
              <Text className="dark:text-black text-black">
                {this.props.prof} - {this.props.start.getUTCHours() + 2}h 
                {this.props.start.getUTCMinutes() == 0 ? null : this.props.start.getUTCMinutes()}-
                {this.props.end.getUTCHours() + 2}h {this.props.end.getUTCMinutes() == 0 ? null : this.props.end.getUTCMinutes()}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}
