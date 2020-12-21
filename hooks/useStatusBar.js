import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function useStatusBar(style, animated = true) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor("black")
      StatusBar.setBarStyle(style, animated);
    }, [])
  );
}
