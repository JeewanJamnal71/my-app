import React, { Component, ReactNode } from 'react';
import {
  ImageBackground,
  View,
  ImageSourcePropType,
  ViewStyle,
  GestureResponderEvent,
  Alert,
  TouchableHighlight,
  Text
} from 'react-native';

interface ImageMapperProps {
  imgHeight: number;
  imgWidth: number;
  imgSource: ImageSourcePropType;
  imgMap: any;
  containerStyle?: ViewStyle;
  multiselect?: boolean;
  selectedAreaId?: string | string[] | null;
  onPress: (item: ImageMapItem, index: number, event: GestureResponderEvent) => void;
}

interface ImageMapItem {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width?: number | null;
  height?: number | null;
  shape: 'rectangle' | 'circle';
  fill?: string | null;
  prefill?: string | null;
  id: string;
  radius?: number;
}

class ImageMapper extends Component<ImageMapperProps> {

    
  buildStyle(item: ImageMapItem, index: number): ViewStyle {
    const { x1, y1, x2, y2, width, height, shape, fill, prefill, id, radius } = item;
    const { selectedAreaId, multiselect } = this.props;
    let areaId = selectedAreaId;

    if (multiselect && (selectedAreaId === null || selectedAreaId === undefined)) {
      areaId = [];
    }

    const style: ViewStyle = {
      width: 0,
      height: 0,
      borderRadius:3,
      left: x1,
      top: y1,
    };

    if (shape === 'rectangle') {
      style.width = width === null || width === undefined ? x2 - x1 : width;
      style.height = height === null || height === undefined ? y2 - y1 : height;
    }
    return style;
  }

  render(): ReactNode {
    const { imgHeight, imgWidth, imgSource, imgMap, containerStyle } = this.props;

    return (
      <View style={[{ flex: 1 }, containerStyle]}>
        <ImageBackground style={{ height: imgHeight, width: imgWidth }} source={imgSource}>
          {imgMap.map((item:any, index:number) => (
            <TouchableHighlight
              underlayColor={'#EEEBEB'}
              key={item.id}
              onPress={(event: GestureResponderEvent) => {this.props.onPress(item, index, event);Alert.alert("Body",item.name)}}
              style={[{ position: 'absolute' }, this.buildStyle(item, index)]}
            ><Text></Text></TouchableHighlight>
          ))}
        </ImageBackground>

      </View>
    );
  }
}

ImageMapper.defaultProps = {
  multiselect: false,
};

export default ImageMapper;
