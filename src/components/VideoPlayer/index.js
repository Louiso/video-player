import React, {useRef, useState, useCallback} from 'react';
import Video from 'react-native-video';
import {View, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Spinner} from '@ui-kitten/components';
import {useDebouncedCallback} from '../../hooks/useDebounce';

const VideoPlayer = ({src}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef();
  const forceUpdateVideo = useDebouncedCallback(
    () => videoRef.current?.forceUpdate(),
    300,
    [],
  );

  const _handleBuffer = () => {};

  const _handleVideoError = (...error) => {
    console.log('_handleVideoError -> error', error);
  };

  const _handleProgress = ({currentTime: value}) => {
    if (Math.abs(currentTime - value) <= 0 && !loading) {
      setLoading(true);
    } else if (Math.abs(currentTime - value) > 0 && loading) {
      setLoading(false);
    }
    setCurrentTime(value);
  };

  const _handleClickPlayPause = (value) => () => {
    setPaused(value);
  };
  const _handleLoad = ({duration: value}) => {
    setDuration(value);
    setLoading(false);
  };

  const _handleChangeSlider = (slide) => {
    videoRef.current?.seek(slide * duration);
    setCurrentTime(slide * duration);
    setLoading(true);
  };

  const _handleSeek = useCallback(() => {
    forceUpdateVideo();
  }, [forceUpdateVideo]);

  return (
    <View style={styles.containerVideo}>
      <Video
        volume={1.0}
        paused={paused}
        onSeek={_handleSeek}
        onLoad={_handleLoad}
        onProgress={_handleProgress}
        source={{uri: src}}
        resizeMode={'contain'}
        ref={(ref) => (videoRef.current = ref)}
        onBuffer={_handleBuffer}
        onError={_handleVideoError}
        style={styles.backgroundVideo}
      />
      {!paused && loading && (
        <View style={styles.spinnerContainer}>
          <Spinner size="large" />
        </View>
      )}
      <View style={styles.container}>
        {paused ? (
          <Icon
            name="play-arrow"
            color="white"
            onPress={_handleClickPlayPause(false)}
          />
        ) : (
          <Icon
            name="pause"
            color="white"
            onPress={_handleClickPlayPause(true)}
          />
        )}
      </View>
      <View style={styles.footerPlayerContainer}>
        <View style={styles.footerActionsContainer}>
          <View style={styles.actionContainer}>
            {/* <Icon name="chevron-left" color="white" /> */}
            {paused ? (
              <Icon
                name="play-arrow"
                color="white"
                onPress={_handleClickPlayPause(false)}
              />
            ) : (
              <Icon
                name="pause"
                color="white"
                onPress={_handleClickPlayPause(true)}
              />
            )}
            {/* <Icon name="chevron-right" color="white" /> */}
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            thumbTintColor="white"
            value={currentTime / duration}
            minimumTrackTintColor="#FFFFFF"
            onValueChange={_handleChangeSlider}
            maximumTrackTintColor="#000000"
          />
          <View>
            <Icon name="fullscreen" color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerVideo: {
    height: 180,
    width: '100%',
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  slider: {
    width: '80%',
    height: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  footerPlayerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    padding: 4,
  },
  footerActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default VideoPlayer;
