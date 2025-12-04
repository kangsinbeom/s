import { NextRequest, NextResponse } from "next/server";
import WebSocket, { WebSocketServer } from "ws";
import { getReqInfo, getWsData, isJsonString } from "./utils";
import { tr_keys } from "@/app/utils/tr_keys";

let serverWs: WebSocketServer | null = null;
let isWsHandlerBound = false;
const WS_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const GET = (req: NextRequest) => {
  // proxy server - client 연결하는 webSocket

  if (!serverWs) {
    serverWs = new WebSocketServer({ port: 8080 });
  }
  if (!isWsHandlerBound) {
    serverWs.on("connection", (ws) => {
      console.log("web socket connected");

      // kis web socket 연결
      const kisWs = new WebSocket(`${WS_URL}`);
      console.log("kis connected");

      // 10개의 실시간 체결가에 대한 send 로직
      const reqList = getReqInfo({
        req,
        tr_id: "H0STCNT0",
        keys: tr_keys,
      }) as string[];
      reqList.forEach((initialMessage) => {
        kisWs.on("open", () => {
          kisWs.send(initialMessage);
        });
      });

      // 클라이언트에서 보낸 code 수신하여 실시간 호가에 대한 Websocket을 등록 및 해제하는 로직
      let currentCode: string | null = null;
      ws.on("message", (data) => {
        const parse = JSON.parse(data.toString()) as { code: string };
        const code = parse.code;

        // 기존 연결 해제
        if (currentCode) {
          const disconnectedMessage = getReqInfo({
            req,
            tr_id: "H0STASP0",
            keys: currentCode,
            tr_type: "2",
          });
          kisWs.send(disconnectedMessage);
        }

        // 새롭게 체결호가 연결
        const connectMessage = getReqInfo({
          req,
          tr_id: "H0STASP0",
          keys: code,
          tr_type: "2",
        });
        kisWs.send(connectMessage);

        currentCode = code;
      });

      // 수신하는 메시지를 클라이언트로 전달하는 로직
      kisWs.on("message", (data) => {
        const parse = data.toString();

        if (!isJsonString(parse)) {
          // 데이터를 가공하는 함수

          const data = getWsData(parse);
          ws.send(JSON.stringify(data));
        }
      });

      ws.on("close", () => {
        kisWs.close();
      });
    });
    isWsHandlerBound = true;
  }
  // 연결 시 action

  return NextResponse.json({
    message: "WebSocket server started",
  });
};
