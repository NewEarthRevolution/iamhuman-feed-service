import express from 'express';
import { fetchLatestPledges, fetchNameMap } from '../services/feedService';

const router = express.Router();

router.get('/globe-initialize', async (req, res) => {
  try {
    const response = await fetchLatestPledges();
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest pledges' });
  }
});

router.get('/name-map', async (req, res) => {
  try {
    const response = await fetchNameMap();
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching name map' });
  }
});

export default router;
