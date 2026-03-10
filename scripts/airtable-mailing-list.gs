// Google Apps Script — Airtable Mailing List Proxy
// Paste this into your Apps Script editor (script.google.com)
//
// Setup:
//   1. Open Script Editor → Project Settings → Script Properties
//   2. Add property: AIRTABLE_TOKEN = your Personal Access Token
//   3. Deploy as Web App (Execute as: Me, Access: Anyone)

var BASE_ID = 'appKZNlVqsXmdMztH';
var TABLE_NAME = 'Mailing List';

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var email = (body.email || '').trim().toLowerCase();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(400, 'Invalid email address');
    }

    var token = PropertiesService.getScriptProperties().getProperty('AIRTABLE_TOKEN');
    if (!token) {
      return jsonResponse(500, 'Server configuration error');
    }

    // Check for duplicate
    var filterFormula = encodeURIComponent('{Email} = "' + email + '"');
    var searchUrl = 'https://api.airtable.com/v0/' + BASE_ID + '/' + encodeURIComponent(TABLE_NAME)
      + '?filterByFormula=' + filterFormula + '&maxRecords=1';

    var searchResp = UrlFetchApp.fetch(searchUrl, {
      method: 'get',
      headers: { 'Authorization': 'Bearer ' + token },
      muteHttpExceptions: true
    });

    var searchData = JSON.parse(searchResp.getContentText());
    if (searchData.records && searchData.records.length > 0) {
      return jsonResponse(200, 'Already subscribed');
    }

    // Create record
    var createUrl = 'https://api.airtable.com/v0/' + BASE_ID + '/' + encodeURIComponent(TABLE_NAME);
    var createResp = UrlFetchApp.fetch(createUrl, {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        records: [{ fields: { 'Email': email } }]
      }),
      muteHttpExceptions: true
    });

    var createData = JSON.parse(createResp.getContentText());
    if (createData.records && createData.records.length > 0) {
      return jsonResponse(200, 'Subscribed');
    } else {
      return jsonResponse(500, 'Failed to create record');
    }

  } catch (err) {
    return jsonResponse(500, 'Server error: ' + err.message);
  }
}

function jsonResponse(code, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: code, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
