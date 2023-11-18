import axios from 'axios';
require('dotenv').config();

export const fetchLatestPledges = async () => {
  return await axios.get(`${process.env.PLEDGE_SERVICE_URL}/latest-pledges`);
};

export const fetchNameMap = async () => {
  return await axios.get(`${process.env.PLEDGE_SERVICE_URL}/name-map`);
};
