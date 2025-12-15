interface StockHeadersParams {
  access_token: string;
  tr_id?: string;
}

export const getStockHeaders = ({
  access_token,
  tr_id = "FHKST01010200",
}: StockHeadersParams) => {
  return {
    authorization: `Bearer ${access_token}`,
    appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY as string,
    appsecret: process.env.NEXT_PUBLIC_KIS_APP_SECRET as string,
    tr_id,
    custtype: "P", // 개인: 'P', 법인: 'B'
  };
};
