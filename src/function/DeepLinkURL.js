import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';

export default function useDeepLinkURL() {
  const [linkedURL, setLinkedURL] = useState(null);

  // 1. If the app is not already open, it is opened and the url is passed in as the initialURL
  // You can handle these events with Linking.getInitialURL(url) -- it returns a Promise that
  // resolves to the url, if there is one.
  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      (initialUrl)
      setLinkedURL(initialUrl);
    };

    getUrlAsync();
  }, []);

  // 2. If the app is already open, the app is foregrounded and a Linking event is fired
  // You can handle these events with Linking.addEventListener(url, callback)
  useEffect(() => {
    const callback = (url) => {
      setLinkedURL(url.url);
    };

    const listener = Linking.addEventListener('url', callback);
    return () => listener.remove();
  }, []);

  const resetURL = () => {
    setLinkedURL(null);
  };

  return {linkedURL, resetURL};
}
