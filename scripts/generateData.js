import axios from 'axios';
import { writeFileSync } from 'fs';
import 'dotenv/config'

async function genGithub() {
  const results = await axios.get('https://api.github.com/users/dchicchon/events/public', {
    headers: {
      'User-Agent': 'portfolio',
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const recentEvents = results.data.filter(event => {
    const eventDate = new Date(event.created_at);
    return eventDate >= oneWeekAgo;
  });
  const githubEvents = recentEvents.map(event => {
    return {
      sourceType: 'github',
      type: event.type,
      repo: event.repo,
      date: event.created_at
    }
  })
  return githubEvents
}

async function genStrava() {
  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env

  let auth_token;
  try {
    const authResponse = await axios.post('https://www.strava.com/oauth/token', {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
    auth_token = authResponse.data.access_token;
  } catch (err) {
    console.log(err)
  }

  let activities = []
  const now = Math.floor(Date.now() / 1000);
  const oneWeekAgo = now - (7 * 24 * 60 * 60);
  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      params: {
        after: oneWeekAgo
      },
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
    activities = response.data.map(activity => {
      return {
        sourceType: 'strava',
        name: activity.name,
        distance: activity.distance,
        moving_time: activity.moving_time,
        elapsed_time: activity.elapsed_time,
        type: activity.type,
        sport_type: activity.sport_type,
        date: activity.start_date,
        date_local: activity.start_date_local,
        average_speed: activity.average_speed
      }
    })
  } catch (err) {
    console.log(err)
  }
  return activities
}

async function start() {
  // generate recent activities for everything
  const stravaData = await genStrava();
  const githubData = await genGithub();
  const data = [...stravaData, ...githubData]
  const parsedData = data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  }).map(item => {
    return {
      ...item,
      date: new Date(item.date).toLocaleDateString()
    }
  })
  console.log(parsedData);
  const jsonString = JSON.stringify(parsedData, null, 2);
  writeFileSync('./data.json', jsonString, 'utf8')
  console.log('done writing file')
}

start();
