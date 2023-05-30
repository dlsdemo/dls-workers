// Retrieve the Cloudflare Workers and HTTP headers
fetch('https://headers.dlsdemo.com/')
  .then(response => {
    // Retrieve the CF-Cache-Status header from the response
    const cfCacheStatus = response.headers.get('CF-Cache-Status');
    return { response, cfCacheStatus };
  })
  .then(({ response, cfCacheStatus }) => {
    // Parse the response body as JSON
    return response.json()
      .then(data => ({ data, cfCacheStatus }));
  })
  .then(({ data, cfCacheStatus }) => {
    // Manipulate the retrieved data and update the container
    const container = document.getElementById('container');
    const output = `CF-Cache-Status: ${cfCacheStatus}\n\n${JSON.stringify(data, null, 2)}`;
    container.innerText = output;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
