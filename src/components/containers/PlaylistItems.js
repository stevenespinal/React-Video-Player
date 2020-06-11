import React from "react";
import PlaylistItem from "../PlaylistItem";
import StyledPlaylistitems from "../styles/StyledPlaylistitems";
import withLink from "../hoc/withLink";

const PlayListItemWithLink = withLink(PlaylistItem)

const PlaylistItems = ({videos, active}) => (
  <StyledPlaylistitems>
    {/*<PlaylistItem/>*/}
    {videos.map(vid => (
      <PlayListItemWithLink key={vid.id} video={vid} active={vid.id === active.id} played={vid.played}/>
    ))}
  </StyledPlaylistitems>
)

export default PlaylistItems;