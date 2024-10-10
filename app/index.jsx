import { Link, Redirect, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View,Text, SafeAreaView } from 'react-native';

const Index = () => {
    return (
      <Redirect href={'/auth/login'} />

    );
}

const styles = StyleSheet.create({})

export default Index;
