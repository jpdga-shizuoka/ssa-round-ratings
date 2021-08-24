#!/usr/bin/env node

const fs = require('fs');
const path = './src/assets/models/';
const roundsName = 'rounds.json';
const eventsName = 'events.json';

const rounds = JSON.parse(fs.readFileSync(path + roundsName, 'utf8'));
const events = JSON.parse(fs.readFileSync(path + eventsName, 'utf8'));

events.forEach(event => {
  if (event.layout) {
    const cbj = event.layout;
    event.layout = { cbj };
  }
});
events.sort((a, b) => {
  if (a.period.from > b.period.from) {
    return -1;
  }
  if (a.period.from < b.period.from) {
    return 1;
  }
  return 0;
});

fs.writeFileSync(path + eventsName, JSON.stringify(events, null, '  '));
