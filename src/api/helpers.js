// TODO write unit tests for any helper functions

/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */
export const request = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${apiUrl} request failed:`, error);
    throw error;
  }
}
