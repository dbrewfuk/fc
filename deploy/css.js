/* eslint-disable */

/**
 * This uses OU Campus API
 * More information can be found at https://developers.omniupdate.com/
 */

require('pretty-error').start();
const querystring = require('querystring');
const fs = require('fs');
const axios = require('axios');
const commitMessage = process.argv[2] || 'API Publish';
axios.defaults.baseURL = 'https://a.cms.omniupdate.com';

const steps = {
  login: {
    success: checkoutFile,
    fail: logout,
  },
  checkout_file: {
    success: saveFile,
    fail: logout,
  },
  checkin_file: {
    success: logout,
    fail: logout,
  },
  save_file: {
    success: publishFile,
    fail: checkinFile,
  },
  revert_file: {
    success: checkinFile,
    fail: logout,
  },
  publish_file: {
    success: logout,
    fail: revertFile,
  },
};

// OU Campus request parameters
const skin = 'oucampus';
const site = 'www';
const account = 'kctcs';
let authorization_token;
const serverFilePath = '/_resources-redesign/css/main.min.css';
const localFilePath = './dist/css/main.min.css';
let fileContents;



// Init
login();

/*##################################################################################################
*                                           FUNCTIONS
##################################################################################################*/

/**
 * Log in into OU Campus API
 */
function login() {
  console.log('Logging in...');
  axios.post('/authentication/login', querystring.stringify({
    skin,
    account,
    username: 'systemoffice',
    password: '%aouOlaOUL$6',
  }))
    .then((response) => {
      if (response.status === 200) {
        authorization_token = response.data.gadget_token;
        steps.login.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);
      steps.login.fail();
    });
}


/**
 * Attempt to checkout file
 */
function checkoutFile() {
  console.log('Checking out file...');
  axios.post('/files/checkout', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: serverFilePath,
  }))
    .then((response) => {
      if (response.status === 200) {
        steps.checkout_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.checkout_file.fail();
    });
}

/**
 * Check infile
 */
function checkinFile() {
  console.log('Checking in file...');
  axios.post('/files/checkin', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: serverFilePath,
  }))
    .then((response) => {
      if (response.status === 200) {
        steps.checkin_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.checkin_file.fail();
    });
}


/**
 * Attempt to save file
 */
function saveFile() {
  // get file
  console.log('Getting file contents...');
  fs.readFile(localFilePath, 'utf8', (err, contents) => {
    fileContents = contents;

    console.log('Saving file...');
    axios.post('/files/save', querystring.stringify({
      authorization_token,
      skin,
      account,
      site,
      path: serverFilePath,
      text: fileContents,
      overwrite: true,
      wysiwyg: false,
    }))
      .then((response) => {
        if (response.status === 200) {
          steps.save_file.success();
        }
      })
      .catch((error) => {
        const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
        console.error(err.stack);

        console.log('Starting fail script...');
        steps.save_file.fail();
      });
  });
}


function revertFile() {
  // Get file versions
  axios.get('/files/versions', {
    params: {
      authorization_token,
      skin,
      account,
      site,
      path: serverFilePath,
    }
  })
    .then(response => {
      if (response.status === 200) {
        const last_version = response.data[0].revision;

        // revert file to last version
        axios.post('/files/revert', querystring.stringify({
          authorization_token,
          skin,
          account,
          site,
          path: serverFilePath,
          revision: last_version,
        }))
          .then(response => {
            if (response.status === 200) {
              steps.revert_file.success();
            }
          })
          .catch(error => {
            const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
            console.error(err.stack);

            console.log('Starting fail script...');
            steps.revert_file.fail();
          })
      }
    })
    .catch(error => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.revert_file.fail();
    })
}


/**
 * Publish file
 */
function publishFile() {
  console.log('Publishing file...');
  axios.post('/files/publish', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: serverFilePath,
    log: commitMessage,
    include_checked_out: true,
  }))
    .then((response) => {
      if (response.status === 200) {
        console.log('File published successfully!');
        steps.publish_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.publish_file.fail();
    });
}


/**
 * Logout of OU Campus API
 */
function logout() {
  console.log('Logging out...');
  axios.post('/authentication/logout', querystring.stringify({
    skin,
    account,
    user: 'rcunha0001',
    email: 'raphael.cunha@kctcs.edu',
    callback: '',
  }))
    .then((response) => {
      if (response.status) {
        console.log('Successful logout.');
      }
    })
    .catch(error => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);
    });
}
