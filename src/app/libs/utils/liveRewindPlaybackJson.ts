const liveRewindPlaybackJsonToPath = (input: string | null) => {
  const playback = typeof input === "string" ? JSON.parse(input) : null;
  if (!playback) return null;

  return playback.media?.[0]?.path ?? null;
};

export default liveRewindPlaybackJsonToPath;
