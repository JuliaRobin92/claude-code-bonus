const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
  try {
    const tunnel = await localtunnel({ port: 3000 });

    const message = `
=================================
🚀 PUBLIEKE URL BESCHIKBAAR:
=================================
${tunnel.url}
=================================
`;

    console.log(message);
    fs.writeFileSync('/tmp/tunnel-url.txt', tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel gesloten');
    });

    // Keep the process running
    process.on('SIGINT', () => {
      tunnel.close();
      process.exit();
    });
  } catch (error) {
    console.error('Error creating tunnel:', error);
    process.exit(1);
  }
})();
