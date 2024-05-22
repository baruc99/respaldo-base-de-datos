const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');


const backupDir = path.join(__dirname, 'backups');


if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const mysqldumpPath = '/Applications/MAMP/Library/bin/mysqldump'; // Cambia `which mysqldump`


const backupAllDatabases = async () => {
  try {
    const backupFile = `${backupDir}/all-databases-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.sql`;
    const mysqldump = `${mysqldumpPath} --all-databases > "${backupFile}"`;

    await new Promise((resolve, reject) => {
      exec(mysqldump, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando de respaldo: ${error.message}`);
          reject(error);
        } else if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(new Error(stderr));
        } else {
          console.log(`Respaldo completado: ${backupFile}`);
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(`Fallo en el respaldo de las bases de datos: ${error.message}`);
  }
};

// '* * * * *': Se ejecuta cada minuto.
// '0 * * * *': Se ejecuta cada hora.
// '0 0 * * *': Se ejecuta a medianoche (00:00) todos los días.
// '0 12 * * *': Se ejecuta al mediodía (12:00) todos los días.
// '0 0 * * 0': Se ejecuta a medianoche todos los domingos.
// '0 0 1 * *': Se ejecuta a medianoche del primer día de cada mes.


cron.schedule('* * * * *', () => { 
  console.log('Iniciando tarea de respaldo de bases de datos...');

  backupAllDatabases();
});


/* para automatizar la tarea 
pm2 start backup.js
pm2 save
pm2 startup
*/