import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiUri = `${process.env.EXPO_PUBLIC_API_URI}/?key=${apiKey}`;
const formatUri = (params) => {
  let uri = `${apiUri}&per_page=30&editors_choice=true`;
  if (!uri) {
    return uri;
  }
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    uri += `&${key}=${value}`;
  });
  return uri;
};
export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUri(params));
    const { data } = response;
    return { success: true, data };
  } catch (err) {
    console.error("Error", err.message);
    return { success: false, msg: err.message };
  }
};
