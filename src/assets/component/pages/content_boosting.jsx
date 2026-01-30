import React, { useEffect, useState, useMemo } from "react";
import { api } from "../utilities/SocialMedia/AllApi";
import YouTubePlaylists from "../utilities/youtubevideo";
import Fbcontent from "../utilities/fbcontent";

const ContentBoosting = () => {
  return (
    <>
      <YouTubePlaylists />
      <Fbcontent/>
    </>
  )
}
export default ContentBoosting;
