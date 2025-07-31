import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

// Controller function to generate image from prompt
// http://localhost:4000/api/image/generate-image
export const generateImage = async (req, res) => {
  try {
    // Use userId from authenticated user (set by authUser middleware)
    const userId = req.user._id;
    const { prompt } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    // Fetch user details
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check credit balance
    if (user.creditBalance < 1) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits',
        creditBalance: user.creditBalance,
      });
    }

    // Create FormData for Clipdrop API
    const formData = new FormData();
    formData.append('prompt', prompt);

    // Call Clipdrop API
    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        ...formData.getHeaders(), // Ensure multipart/form-data headers
      },
      responseType: 'arraybuffer',
    });

    // Convert arrayBuffer to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct credit after successful API call
    user.creditBalance -= 1;
    await user.save(); // Use save() to ensure atomic update

    // Send response
    res.json({
      success: true,
      message: 'Image Generated',
      resultImage,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error('Generate image error:', error.message, error.response?.data || error);
    if (error.response) {
      return res.status(error.response.status || 500).json({
        success: false,
        message: error.response.data?.message || 'Failed to generate image',
      });
    }
    res.status(500).json({ success: false, message: 'Server error occurred' });
  }
};