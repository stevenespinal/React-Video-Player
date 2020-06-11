import React, {useState, useEffect} from "react";
import Video from "../Video";
import Playlist from "../containers/Playlist";
import {ThemeProvider} from "styled-components";
import StyledWbnPlayer from "../styles/StyledWbnPlayer";

const theme = {
  bgcolor: '#353535',
  bgcolorItem: '#414141',
  bgcolorItemActive: '#405C63',
  bgcolorPlayed: '#526D4E',
  border: 'none',
  borderPlayed: 'none',
  color: '#FFF'
}

const themeLight = {
  bgcolor: '#FFF',
  bgcolorItem: '#FFF',
  bgcolorItemActive: '#80A7B1',
  bgcolorPlayed: '#7D9979',
  border: '1px solid #353535',
  borderPlayed: 'none',
  color: '#353535'
}

const VideoPlayer = ({match, history, location}) => {
  const videos = JSON.parse(document.querySelector(`[name="videos"]`).value);

  const [state, setState] = useState({
    videos: videos.playlist,
    activeVideo: videos.playlist[0],
    nightMode: true,
    playlistId: videos.playlistId,
    autoplay: false
  });

  useEffect(() => {
    const {activeVideo} = match.params;

    if (activeVideo !== undefined) {
      const newActiveVideo = state.videos.findIndex(video => video.id === activeVideo);
      setState(prev => ({
        ...prev,
        activeVideo: prev.videos[newActiveVideo],
        autoplay: location.autoplay
      }));
    } else {
      history.push({pathname: `/${state.activeVideo.id}`, autoplay: false})
    }
  }, [history, location.autoplay, match.params, state.activeVideo.id, state.videos]);

  const nightModeCallback = () => {
    setState(prevState => ({
      ...prevState,
      nightMode: !prevState.nightMode
    }));
  }

  const endCallback = () => {
    const {activeVideo} = match.params;
    const currentVideoIndex = state.videos.findIndex(video => video.id === activeVideo);
    const nextVideo = currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;

    history.push({
      pathname: `/${state.videos[nextVideo].id}`,
      autoplay: false
    });
  }

  const progressCallback = () => {

  }

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      {state.video !== null ? (
        <StyledWbnPlayer>
          <Video
            active={state.activeVideo}
            endCallback={endCallback}
            autoplay={state.autoplay}
            progressCallback={progressCallback}
          />
          <Playlist videos={state.videos} active={state.activeVideo} nightModeCallback={nightModeCallback}
                    nightMode={state.nightMode}/>
        </StyledWbnPlayer>
      ) : null}
    </ThemeProvider>
  )
};


export default VideoPlayer;