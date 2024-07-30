require('dotenv').config();
const { MongoClient, ServerApiVersion, insertOne } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    console.log('Connected to DB!');
    const times = client.db('times');
    const bossCollection = times.collection('Alchemical Hydra');
    insert(times);
  })
  .catch((err) => {
    console.log(err);
  });

const choices = [
  'Alchemical Hydra',
  'COX',
  'COX: CM',
  'Duke Sucellus',
  'Duke Sucellus: Awakened',
  'Fight Caves',
  'Fortis Colosseum',
  'Gauntlet',
  'Gauntlet: CG',
  'Grotesque Guardians',
  'Hespori',
  'Inferno',
  'Phantom Muspah',
  'PNM',
  'The Leviathan',
  'The Leviathan: Awakened',
  'The Mimic',
  'The Nightmare',
  'The Whisperer',
  'The Whisperer: Awakened',
  'TOA',
  'TOA: Expert',
  'TOB',
  'TOB: HMT',
  'Vardorvis',
  'Vardorvis: Awakened',
  'Vorkath',
  'Zulrah',
];

const insert = async (times) => {
  try {
    // choices.forEach((x) => {
    //   times.collection(x).insertOne({
    //     bossName: x,
    //     teamSize: 0,
    //     teamMembers: 'none',
    //     timeAchieved: '0',
    //     screenShot: 'link',
    //     approvals: 0,
    //     approvers: '',
    //     denies: 0,
    //     deniers: '',
    //   });
    // });
  } catch (err) {
    console.log(err);
  } finally {
    // await client.close();
  }
};
