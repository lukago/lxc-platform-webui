import {
  ASSIGN_LXC,
  UNASSIGN_LXC,
  FETCH_LXC_STATUS,
  SOCKET_FETCH_LXC_STATUS_SUCCESS,
  START_LXC,
  STOP_LXC, FETCH_SERVER_INFO,
} from "./types";
import SockJS from "sockjs-client";
import {links} from "../../../../config/appData";
import Stomp from "stomp-websocket";
import {reactLocalStorage} from "reactjs-localstorage";

export const connectSocket = (lxcName) => (dispatch) => {
  const socket = new SockJS(`${links.BASE_URL}/sc/lxcplatform`);
  const stompClient = Stomp.over(socket);
  const token = reactLocalStorage.get('token');
  stompClient.connect({Authorization: `Bearer ${token}`}, (frame) => {
    stompClient.subscribe('/user/sc/topic/jobs', (frame) => {
      const job = JSON.parse(frame.body);
      console.log(job);
      if (job.jobStatus === 'DONE' && job.jobCode === 'FETCH') {
        dispatch({
          type: SOCKET_FETCH_LXC_STATUS_SUCCESS,
          payload: {data: job.result},
        })
      }

      else if (job.jobStatus === 'DONE' && job.jobCode === 'START') {
        dispatch(fetchLxcStatus(lxcName))
      }

      else if (job.jobStatus === 'DONE' && job.jobCode === 'STOP') {
        dispatch(fetchLxcStatus(lxcName))
      }
    });
  });
  dispatch({
    type: 'SOCKET_CONNECT',
    payload: stompClient,
  });
};


export const disconnectSocket = (stompClient) => (dispatch) => {
  if (stompClient != null) {
    stompClient.disconnect();
    console.log("Disconnected");
  }

  dispatch({
    type: 'SOCKET_DC',
  });
};

export const fetchLxcStatus = (lxcName) => {
  return {
    type: FETCH_LXC_STATUS,
    payload: {
      request: {
        method: 'get',
        url: `/api/lxc/${lxcName}/status`,
      },
    },
  };
};

export const fetchServerInfo = () => {
  return {
    type: FETCH_SERVER_INFO,
    payload: {
      request: {
        method: 'get',
        url: `/api/lxc/server`,
      },
    },
  };
};

export const startLxc = (lxcName) => {
  return {
    type: START_LXC,
    payload: {
      request: {
        method: 'post',
        url: `/api/lxc/${lxcName}/start`,
      },
    },
  };
};

export const stopLxc = (lxcName) => {
  return {
    type: STOP_LXC,
    payload: {
      request: {
        method: 'post',
        url: `/api/lxc/${lxcName}/stop`,
      },
    },
  };
};

export const assignLxc = (lxcName, username) => {
  return {
    type: ASSIGN_LXC,
    payload: {
      request: {
        method: 'post',
        url: `/api/lxc/${lxcName}/assign?username=${username}`,
      },
    },
  };
};

export const unassignLxc = (lxcName) => {
  return {
    type: UNASSIGN_LXC,
    payload: {
      request: {
        method: 'post',
        url: `/api/lxc/${lxcName}/unassign`,
      },
    },
  };
};