import React, { Component } from 'react';
import { View, ViewStyle } from 'react-native';
import ImageMapper from './ImageMapper';
import { RECTANGLE_MAP } from './Maps';

const HumanImg = require('./front.png');

interface Example1State {
  selectedAreaId: any;
}

class Example1 extends Component<{}, Example1State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedAreaId: []
    };
  }

  mainImgWasPressed(item: any, idx: number, event: any) {
    const { selectedAreaId } = this.state;
    if (Array.isArray(selectedAreaId)) {
      const indexInState = selectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        this.setState({
          selectedAreaId: [
            ...selectedAreaId.slice(0, indexInState),
            ...selectedAreaId.slice(indexInState + 1)
          ]
        });
      } else {
        console.log('Setting Id', item.id);
        this.setState({ selectedAreaId: [...selectedAreaId, item.id] });
      }
    } else {
      if (item.id === selectedAreaId) {
        this.setState({ selectedAreaId: null });
      } else {
        this.setState({ selectedAreaId: item.id });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent:'center'}}>
        <ImageMapper
          imgHeight={551}
          imgWidth={244}
          imgSource={HumanImg}
          imgMap={RECTANGLE_MAP}
          onPress={(item, idx, event) => this.mainImgWasPressed(item, idx, event)}
          containerStyle={{ top: 10 } as ViewStyle}
          selectedAreaId={this.state.selectedAreaId}
          multiselect
        />
      </View>
    );
  }
}

export default Example1;