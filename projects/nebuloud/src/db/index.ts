import schwarzerEngel from './artists/schwarzer_engel';
import tardigradeInferno from './artists/tardigrade_inferno';
import master from './artists/master';
import shmely from './artists/shmely';
import geval from './artists/geval';
import mc18 from './artists/mc18';
import { TypeItems } from './types';

const artists: TypeItems = {
  [schwarzerEngel.artist.id]: schwarzerEngel,
  [tardigradeInferno.artist.id]: tardigradeInferno,
  [master.artist.id]: master,
  [shmely.artist.id]: shmely,
  [geval.artist.id]: geval,
  [mc18.artist.id]: mc18,
};

export default artists;
