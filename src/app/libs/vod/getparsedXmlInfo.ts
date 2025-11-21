export const getparsedXmlInfo = (parsedXml: any) => {
  const videoAdaptationSet = parsedXml.MPD.Period[0].AdaptationSet.find(
    (a: any) => a.$.mimeType === "video/mp2t"
  );

  const representation = videoAdaptationSet.Representation[0];
  const repId = representation.$.id; // "dcc78f60-b0f4-11f0-ae19-a0369ffabdf8"
  const baseUrl = representation.BaseURL[0];
  const segmentTemplate = representation.SegmentTemplate[0].$;
  const segmentTimeline =
    representation.SegmentTemplate[0].SegmentTimeline[0].S[0].$;
  const totalSegments = parseInt(segmentTimeline.r) + 1; // 1873개
  const segmentScale = parseInt(segmentTimeline.d) / 1000;
  const data = {
    repId,
    baseUrl,
    media: segmentTemplate.media,
    startNumber: segmentTemplate.startNumber,
    totalSegments,
    segmentScale,
    a: parseInt(segmentTimeline.d),
  };

  const segmentUrls = [];

  for (let i = 0; i <= 14; i++) {
    const segmentNumber = i.toString().padStart(6, "0");
    const segmentFile = segmentTemplate.media
      .replace("$RepresentationID$", repId)
      .replace("$Number%06d$", segmentNumber);

    segmentUrls.push(`${baseUrl}${segmentFile}`);
  }
  return segmentUrls;
};
