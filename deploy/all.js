/* eslint-disable */

/**
 * This uses OU Campus API
 * More information can be found at https://developers.omniupdate.com/
 */

require('pretty-error').start();
const querystring = require('querystring');
const fs = require('fs');
const axios = require('axios');
axios.defaults.baseURL = 'https://a.cms.omniupdate.com';

const steps = {
  login: {
    success: checkoutJsFile,
    fail: logout,
  },
  checkout_js_file: {
    success: checkoutCssFile,
    fail: logout,
  },
  checkin_js_file: {
    success: logout,
    fail: logout,
  },
  checkout_css_file: {
    success: saveJsFile,
    fail: checkinJsFile,
  },
  checkin_css_file: {
    success: checkinJsFile,
    fail: logout,
  },
  save_js_file: {
    success: saveCssFile,
    fail: checkinCssFile,
  },
  revert_js_file: {
    success: checkinCssFile,
    fail: logout,
  },
  save_css_file: {
    success: publishJsFile,
    fail: revertJsFile,
  },
  revert_css_file: {
    success: revertJsFile,
    fail: logout,
  },
  publish_js_file: {
    success: publishCssFile,
    fail: revertCssFile,
  },
  publish_css_file: {
    success: logout,
    fail: revertCssFile,
  },
};

// OU Campus request parameters
const skin = 'oucampus';
const site = 'www';
const account = 'kctcs';
let authorization_token;
const jsPath = '/_resources-redesign/js/main.min.js';
const cssPath = '/_resources-redesign/css/main.min.css';
let js;
let css;



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
 * Attempt to checkout JS file
 */
function checkoutJsFile() {
  console.log('Checking out JS file...');
  axios.post('/files/checkout', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: jsPath,
  }))
    .then((response) => {
      if (response.status === 200) {
        console.log('Successfully checked out JS file!');
        steps.checkout_js_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script..');
      steps.checkout_js_file.fail();
    });
}

/**
 * Check in JS file
 */
function checkinJsFile() {
  console.log('Checking in JS file...');
  axios.post('/files/checkin', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: jsPath,
  }))
    .then((response) => {
      if (response.status === 200) {
        steps.checkin_js_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.checkin_js_file.fail();
    });
}

/**
 * Attempt to checkout CSS file
 */
function checkoutCssFile() {
  console.log('Checking out CSS file...');
  axios.post('/files/checkout', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: cssPath,
  }))
    .then((response) => {
      if (response.status === 200) {
        steps.checkout_css_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.checkout_css_file.fail();
    });
}

/**
 * Check in CSS file
 */
function checkinCssFile() {
  console.log('Checking in CSS file...');
  axios.post('/files/checkin', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: cssPath,
  }))
    .then((response) => {
      if (response.status === 200) {
        steps.checkin_css_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.checkin_css_file.fail();
    });
}


/**
 * Attempt to save JS file
 */
function saveJsFile() {
  console.log('Getting JS file contents...');

  fs.readFile('./dist/js/main.min.js', 'utf8', (err, contents) => {
    js = contents;

    console.log('Saving JS file...');
    axios.post('/files/save', querystring.stringify({
      authorization_token,
      skin,
      account,
      site,
      path: jsPath,
      overwrite: true,
      wysiwyg: false,
      text: js,
    }))
      .then((response) => {
        if (response.status === 200) {
          console.log('JS file saved successfully!');
          steps.save_js_file.success();
        }
      })
      .catch((error) => {
        const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
        console.error(err.stack);

        console.log('Starting fail script...');
        steps.save_js_file.fail();
      });
  });
}


/**
 * Revert JS file
 */
function revertJsFile() {
  // Get file versions
  axios.get('/files/versions', {
    params: {
      authorization_token,
      skin,
      account,
      site,
      path: jsPath,
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
          path: jsPath,
          revision: last_version,
        }))
          .then(response => {
            if (response.status === 200) {
              steps.revert_js_file.success();
            }
          })
          .catch(error => {
            const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
            console.error(err.stack);

            console.log('Starting fail script...');
            steps.revert_js_file.fail();
          })
      }
    })
    .catch(error => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.revert_js_file.fail();
    })
}


/**
 * Attempt to save CSS file
 */
function saveCssFile() {
  // get CSS file
  console.log('Getting CSS file contents...');
  fs.readFile('./dist/css/main.min.css', 'utf8', (err, contents) => {
    css = contents;

    console.log('Saving CSS file...');
    axios.post('/files/save', querystring.stringify({
      authorization_token,
      skin,
      account,
      site,
      path: cssPath,
      text: css,
      overwrite: true,
      wysiwyg: false,
    }))
      .then((response) => {
        if (response.status === 200) {
          steps.save_css_file.success();
        }
      })
      .catch((error) => {
        const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
        console.error(err.stack);

        console.log('Starting fail script...');
        steps.save_css_file.fail();
      });
  });
}


function revertCssFile() {
  // Get file versions
  axios.get('/files/versions', {
    params: {
      authorization_token,
      skin,
      account,
      site,
      path: cssPath,
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
          path: cssPath,
          revision: last_version,
        }))
          .then(response => {
            if (response.status === 200) {
              steps.revert_css_file.success();
            }
          })
          .catch(error => {
            const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
            console.error(err.stack);

            console.log('Starting fail script...');
            steps.revert_css_file.fail();
          })
      }
    })
    .catch(error => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.revert_js_file.fail();
    })
}

/**
 * Publish JS file
 */
function publishJsFile() {
  console.log('Publishing JS file...');
  axios.post('/files/publish', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: jsPath,
    log: 'API publish',
    include_checked_out: true,
  }))
    .then((response) => {
      if (response.status === 200) {
        steps.publish_js_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.publish_js_file.fail();
    });
}


/**
 * Publish CSS file
 */
function publishCssFile() {
  console.log('Publishing CSS file...');
  axios.post('/files/publish', querystring.stringify({
    authorization_token,
    skin,
    account,
    site,
    path: cssPath,
    log: 'API publish',
    include_checked_out: true,
  }))
    .then((response) => {
      if (response.status === 200) {
        console.log('All files published successfully!');
        steps.publish_css_file.success();
      }
    })
    .catch((error) => {
      const err = new Error(`Request returned ${error.response.status}, with response: ${error.response.data.error}`);
      console.error(err.stack);

      console.log('Starting fail script...');
      steps.publish_css_file.fail();
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
