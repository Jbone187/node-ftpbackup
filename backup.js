module.exports = function () {

  const {
    spawn
  } = require('child_process');
  const Client = require('ftp');
  const cron = require('node-cron');


  //Task Scheduler
  cron.schedule('0 0 * * *', function () {

    //Zip File
    const zip = spawn('zip', ['-r', 'node.zip', '/opt/jma']);

    zip.stdout.on('data', function (data) {

      console.log(`stdout: ${data}`);
    });

    //FTP Tranfer

    setTimeout(function () { //wait for file compression
      const ftp = new Client();

      ftp.on('ready', function () {

        ftp.put('node.zip', '/nodebk/node.zip', function (err) {
          if (err) throw err;

          console.log('Upload Complete');

          ftp.end();
        });

      });

      // connect to server
      ftp.connect({
        host: '',
        user: '',
        password: ''
      });

    }, 10000);
  });
};