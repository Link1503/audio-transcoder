const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const inputDirectory = './m4a_input';
const outputDirectory = './mp3_output';

// Create input and output directories if they don't exist
fs.mkdirSync(inputDirectory, { recursive: true });
fs.mkdirSync(outputDirectory, { recursive: true });

fs.readdir(inputDirectory, (err, files) => {
  if (err) throw err;

  files.filter(file => path.extname(file) === '.m4a').forEach(file => {
    const inputPath = path.join(inputDirectory, file);
    const outputPath = path.join(outputDirectory, file.replace('.m4a', '.mp3'));

    ffmpeg(inputPath)
      .audioCodec('libmp3lame')
      .audioBitrate('128k') // Customize bitrate if needed
      .on('error', (err) => console.error('Error:', err))
      .on('end', () => console.log(`Converted ${file} to MP3`))
      .save(outputPath);
  });
});
