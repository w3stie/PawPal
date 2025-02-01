import * as ExpoClipboard from 'expo-clipboard';

export const copyToClipboard = async (text) => {
  try {
    await ExpoClipboard.setStringAsync(text);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw error;
  }
};

function ClipboardUtil() {
    // Your clipboard utility logic here
}

export default ClipboardUtil; 