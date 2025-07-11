import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const PreviewScreen = () => {
  const route = useRoute();
  const { uri, type } = route.params || {};

  if (!uri || !type) {
    return (
      <View style={styles.centered}>
        <Text>❌ Invalid file data. Cannot preview.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {type === 'image' ? (
        <Image
          source={{ uri }}
          style={styles.image}
          onError={() => alert('Failed to load image')}
        />
      ) : type === 'pdf' ? (
        <WebView
          source={{ uri }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="blue" style={styles.loader} />
          )}
        />
      ) : (
        <View style={styles.centered}>
          <Text>⚠️ Preview not available for this file type.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreviewScreen;
