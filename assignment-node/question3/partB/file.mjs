import { promises as fs } from 'fs';

async function createFiles() {
  try {
    // Create data.txt with "Hello World"
    await fs.writeFile('data.txt', 'Hello World');
    console.log('data.txt created.');

 
    

    await fs.writeFile('Readme.md', readmeContent);
    console.log('Readme.md created.');



     // Step 3: Read and print data.txt
    const data = await fs.readFile('data.txt', 'utf8');
    console.log('Content of data.txt:');
    console.log(data);

    // Step 4: Append new line to data.txt
    await fs.appendFile('data.txt', '\nThis is second line');
    console.log('Appended "This is second line" to data.txt.');

    // Step 5: Delete Readme.md
    await fs.unlink('Readme.md');
    console.log('Readme.md deleted.');

    

  } catch (error) {
    console.error('Error creating files:', error.message);
  }
}

createFiles();
