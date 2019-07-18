import {FETCH_LXC_LIST} from './types';
import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'
import {reactLocalStorage} from "reactjs-localstorage";
import {links} from "../../../config/appData";

let socket;
let stompClient;

export const connectSocket = () => (dispatch) => {
  socket = new SockJS(`${links.BASE_URL}/sc/lxcplatform`);
  stompClient = Stomp.over(socket);
  const token = reactLocalStorage.get('token');
  stompClient.connect({Authorization: `Bearer ${token}`}, (frame) => {
    stompClient.subscribe(`/user/sc/topic/jobs`, (frame) => {
      const job = JSON.parse(frame.body);
      console.log(job);
      if (job.jobStatus === 'DONE' && job.jobCode === 'CREATE') {
        console.log('fetching lxc list dispatch');
        dispatch(fetchLxcList())
      }
    });
  });
  dispatch({
    type: 'SOCKET_CONNECT',
    payload: stompClient,
  });
};

export const disconnectSocket = () => (dispatch) => {
  if (stompClient != null) {
    try {
      stompClient.disconnect();
    } catch (e) {
      console.log('Could not disconnect');
    }
    console.log("Disconnected");
  }

  dispatch({
    type: 'SOCKET_DC',
  });
};

export const fetchLxcList = () => {
  return {
    type: FETCH_LXC_LIST,
    payload: {
      request: {
        method: 'get',
        url: '/api/users/me/lxc',
      },
    },
  };
};