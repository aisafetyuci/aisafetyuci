var BASE_ID = 'appKZNlVqsXmdMztH';
var TABLE_NAME = 'Mailing List';

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var email = (body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(400, 'Invalid email address');
    }

    var token = PropertiesService.getScriptProperties().getProperty('AIRTABLE_TOKEN');
    if (!token) {
      return jsonResponse(500, 'Server configuration error');
    }

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
