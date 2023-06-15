import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'data');
  //Read the json data file data.json
  const albumData = await fs.readFile(jsonDirectory + '/albums.json', 'utf8');
  const postData = await fs.readFile(jsonDirectory + '/posts.json', 'utf8');
  const allData = { albums: JSON.parse(albumData), posts: JSON.parse(postData) };
  //Return the content of the data file in json format
  res.status(200).json(allData);
}