export interface VodApiResponse {
  code: number;
  message: string | null;
  content: VodContent;
}

export interface VodContent {
  videoNo: number;
  videoId: string;
  videoTitle: string;
  videoType: string;
  publishDate: string;
  thumbnailImageUrl: string;
  trailerUrl: string | null;
  duration: number;
  readCount: number;
  publishDateAt: number;
  categoryType: string;
  videoCategory: string;
  videoCategoryValue: string;
  exposure: boolean;
  adult: boolean;
  clipActive: boolean;
  livePv: number;
  tags: string[];
  channel: VodChannel;
  blindType: string | null;
  watchTimeline: any | null;
  paidProductId: string | null;
  tvAppViewingPolicyType: string;
  paidPromotion: boolean;
  inKey: string | null;
  liveOpenDate: string;
  vodStatus: string;
  liveRewindPlaybackJson: string;
  prevVideo: VodPrevNextVideo;
  nextVideo: VodPrevNextVideo;
  userAdultStatus: any | null;
  adParameter: {
    tag: string;
  };
  videoChatEnabled: boolean;
  videoChatChannelId: string;
  paidProduct: any | null;
}

export interface VodChannel {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  verifiedMark: boolean;
  activatedChannelBadgeIds: ㅏㅏstring[];
}

export interface VodPrevNextVideo {
  videoNo: number;
  videoId: string;
  videoTitle: string;
  videoType: string;
  publishDate: string;
  thumbnailImageUrl: string;
  trailerUrl: string | null;
  duration: number;
  readCount: number;
  publishDateAt: number;
  categoryType: string;
  videoCategory: string;
  videoCategoryValue: string;
  exposure: boolean;
  adult: boolean;
  clipActive: boolean;
  livePv: number;
  tags: string[];
  channel: VodChannel;
  blindType: string | null;
  watchTimeline: any | null;
  paidProductId: string | null;
  tvAppViewingPolicyType: string;
}
