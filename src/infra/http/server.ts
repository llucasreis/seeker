import express from 'express';

const server = express();
server.use(express.json());

server.listen(process.env.APP_PORT, () => {
  console.log(`Seeker is running at port: ${process.env.APP_PORT}`);
});
