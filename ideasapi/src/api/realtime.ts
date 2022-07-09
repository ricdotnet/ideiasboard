import { Router } from 'express';

const realtime: Router = Router();

const connections: any[] = [];

realtime.get('/', (req, res) => {
  console.log('realtime GET endpoint...');

  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  res.on('close', () => {
    console.log('connection closed...');
  });

  connections.push(res);
});

realtime.post('/', (req, res) => {
  console.log('realtime POST endpoint...');

  res.status(200).send({ message: 'hello from POST realtime' });
});

realtime.post('/test', (req, res) => {
  connections.forEach(c => {
    c.write(`data: ${req.body.board}\n\n`);
  });
  res.end();
});

export { realtime };
