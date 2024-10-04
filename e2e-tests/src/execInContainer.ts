import {exec} from 'child_process';

export function execInContainer(containerName: string, command: string) {
  return new Promise((resolve, reject) => {
    exec(`docker exec ${containerName} ${command}`, {maxBuffer: 1024 * 1024 * 10}, (error, stdout, stderr) => { // 1 Mo
      if (error) {
        console.error(`Erreur: ${stderr}`);
        return reject(error);
      }
      console.log(`Sortie: ${stdout}`);
      resolve(stdout);
    });
  });
}
