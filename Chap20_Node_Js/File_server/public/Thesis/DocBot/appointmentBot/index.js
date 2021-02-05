/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');

// Enter your calendar ID below and service account JSON below
const calendarId = "c_gn1g803bgildsgjd8uk1j19ql0@group.calendar.google.com"
const serviceAccount ={
    "type": "service_account",
    "project_id": "appointmentscheduler-ktpm",
    "private_key_id": "5edc68a4241770d98e15932d4af8c4dd895b1fdf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDm40hn1ceXDEFa\nv2JhfmpbDGYC/BZUGgUBNBuWME9D8PgYsU3E1OvwZZGu6Emss+ktXuI79l8Ii37H\n7rlW0MoFwQ/KAJmuNQySLKxcBlNM4VNAPuo+c4wFuuKfHT08MPTIoXE6B0P2u5pt\n2gHsfH8U9i0Gug37Rkv/cy8LkDgzwhHJTJmiGew+9sVORwX6b5eOhTMLO0L98x92\nKkhydniJTQT8F+745A8wOYS/74Z+7z5NeLNz090oMX5fMeBD3+tKCx7na93f3Xox\nI4pNOIKpiiuwzHSgpXdhCIA5ti5IpBtTi++7qN/vH5usp1JzViFgWboGTt6r/kub\nCCYpI2V1AgMBAAECggEAF2/Vzzh7oKENV0VbGrNm32QkTMRDDflwLZ2Y+UdhHG/u\n9y60SrkkVAwzXBJXPDEtB758b4LERc1HKstYQ/BAuZHN5P7nmq/m3UWsn1DDDuhG\nd5yLUZiQC5rbWzRwHVaI2n7MzAulwftsIx+Al31RtxKAIpErTyjlGQKbsWxL0DD/\nEwrmBzNFc477M62eCV8HG781+xUryLzN2/xlLsRZUX0OUd7NlvpytmjOqw4O4u69\nOBGfs//PupRXK3uY4ycE2Nq65N1mgfnEKYhoetjqUy9sI2iAJ/DTa+KhVywtazRS\n31QOFQk3b7YfDDnjWqV3cgyPklMXfrEEn2O/oBd8UQKBgQD7r4f7ZB6KGvtjNTjm\nxc6Yel99ffRRLF+P9vUWx2QlkIIaDjPmfhfLgGIziR57aTIyyfME0cgCgHPTraaN\n3Wi7oLnGfWoCYXWKReauqENBQs4zxT7EGOcPyRNyxLfthQ8T6YOjP6sJS/uVQdGX\nRh/eArIdz8/ZzCfi5UBUWxTzGQKBgQDq2HwYtOEOVXPvwyu5sOwr3GToH/a8Bk/x\nv7tfm/ddRaBYUQjI5Z8x5QC9aTMitoyIaesq2PCjg9qdXcwwGne5lb8umZkOpAzE\nwAUd3JZkKmx9uk+J/jXqRQH+NOHA84pT/LByxSwiEHcY5Pp/VgxLlMKogyBXcgKS\n8odrcxTMvQKBgA+fYa11FYA1FI2f7BxHAv/r+KltfBDd1EC3b5cuYUUDp0++ufIA\nubFkErRoOoAmk3sblf4il2uwVYA6MzBzIeEjpORxPHdRXV5r4FnPD/2pC+uivral\nZRJRxOdG1rPjon/16rnjZdZ55O/q2fut2qSJPk0jbR9z0LYAzPFvhelhAoGAD36h\nEXA9uRhiQdt6sxG9Q1eTQM17FgTEmYqw7in4NCs33RvbnIWp7zzQw66BNTUeKJH0\nditCFUfJ0MAzjKjyZUhACO8Rbincvc59h+7Z7VnvNoxoWw5uuDo9W2xZyMVIxynQ\n6oGf28+CTB4veN9QiFwUS9H6/EoFaXSfArPhF3ECgYA9IvhTPqtoOafUfktwmpbx\nyQM3QSJ9xh/E3dfQIIbNQk3qQk7IMS9b9rAXYbA9uJ4Y7Te151GWZQWkxu3bYFU6\n2fj/Vaglc4qL3SX/r42jDmGd4JIRWTBWyXeno5dL4A5c/pxiRHigKJrJJ51+qaL1\n4gs7F7ZOh1oyRfsO+zyWsA==\n-----END PRIVATE KEY-----\n",
    "client_email": "eyebotappointment@appointmentscheduler-ktpm.iam.gserviceaccount.com",
    "client_id": "109570197488560574830",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/eyebotappointment%40appointmentscheduler-ktpm.iam.gserviceaccount.com"
  }; // Starts with {"type": "service_account",...

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'America/Los_Angeles';
const timeZoneOffset = '-07:00';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log("Parameters", agent.parameters);
  const appointment_type = agent.parameters.AppointmentType
  function makeAppointment (agent) {
    // Calculate appointment start and end datetimes (end = +1hr from start)
    //console.log("Parameters", agent.parameters.date);
    const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
    const appointmentTimeString = dateTimeStart.toLocaleString(
      'en-US',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );

    // Check the availibility of the time, and make an appointment if there is time on the calendar
    return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
      agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
    }).catch(() => {
      agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
    });
  }

  let intentMap = new Map();
  intentMap.set('Set appointment', makeAppointment);
  agent.handleRequest(intentMap);
});



function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth, // List events for time period
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there is a event already on the Calendar
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create event for the requested time period
        calendar.events.insert({ auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: appointment_type +' Appointment', description: appointment_type,
            start: {dateTime: dateTimeStart},
            end: {dateTime: dateTimeEnd}}
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}