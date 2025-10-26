const getVodUrl = (parsedXml: any) => {
  return parsedXml?.MPD?.Period?.[0]?.AdaptationSet?.[0]?.Representation?.[0]
    ?.BaseURL?.[0];
};

export default getVodUrl;
