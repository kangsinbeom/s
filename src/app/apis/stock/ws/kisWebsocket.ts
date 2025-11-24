import WebSocket from "ws";

let TestKisWs: WebSocket | null = null;

export const getTsetKisWs = () => TestKisWs;
export const setKisWs = (ws: WebSocket) => {
  TestKisWs = ws;
};
