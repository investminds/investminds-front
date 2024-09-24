import axios from "axios";

const BFF_API_BASE_URL = import.meta.env.VITE_BFF_URL;

const api = axios.create({
  baseURL: BFF_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const sendMessageToAssistant = async (threadId, message, onChunkReceived) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${BFF_API_BASE_URL}/api/bff/openai/thread/message`,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Transfer-Encoding": "chunked",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          threadId,
          content: message,
        }),
      }
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);

      const parsed = JSON.parse(text);
      if (parsed[0]?.text?.value) {
        onChunkReceived(parsed[0]?.text?.value);
      }
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const startThread = async (userId) => {
  try {
    const response = await api.post(`/api/bff/user/thread/create/${userId}`);
    return response.data.threadId;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const retrieveThreadMessages = async (threadId, params = {}) => {
  try {
    const response = await api.get(`/api/bff/openai/thread/${threadId}`, {
      params,
    });

    const messages = response.data.messages.map((msg) => ({
      id: msg.id,
      content: msg.content.text.value,
      sender: msg.role,
      timestamp: msg.created_at,
    }));

    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

const listActivePlans = async () => {
  try {
    const response = await api.get(`/api/bff/payment/plans`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const createSubscription = async (subscriptionData) => {
  try {
    const response = await api.post(
      `/api/bff/payment/subscription`,
      subscriptionData
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getSubscriptions = async () => {
  try {
    const response = await api.get(`/api/bff/payment/subscriptions`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  sendMessageToAssistant,
  startThread,
  retrieveThreadMessages,
  listActivePlans,
  createSubscription,
  getSubscriptions,
};
