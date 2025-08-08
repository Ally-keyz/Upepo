import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styled } from 'nativewind';

const icons = {
  Home: 'home',
  Booking: 'qrcode',
  Tickets: 'comment-alt',
  Profile: 'user-alt',
};

const StyledView = styled(View);
const StyledTouchable = styled(TouchableOpacity);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const routes = state.routes;

  return (
    <StyledView className="absolute bottom-14 left-5 right-5 items-center z-10">
      <StyledView className="flex-row bg-zinc-100/50 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md">
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <StyledTouchable
              key={route.key}
              className={`flex-1 items-center justify-center rounded-2xl px-4 py-2 mx-1 ${
                isFocused ? 'bg-black' : ''
              }`}
              onPress={onPress}
            >
              <FontAwesome5
                name={icons[label]}
                size={18}
                color={isFocused ? '#fff' : '#808080'}
              />
            </StyledTouchable>
          );
        })}
      </StyledView>
    </StyledView>
  );
};

export default CustomTabBar;
