module.exports = (req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from app.js!\n');
};
