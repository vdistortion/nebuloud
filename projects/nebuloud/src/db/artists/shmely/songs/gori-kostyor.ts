import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.goriKostyor,
  name: ['Гори, костёр!'],
  albums: [EnumAlbums.durackiyeKnizhki, EnumAlbums.polnaSuma],
  authors: '',
  text: `
- А я милого не любила,
Просто с пьяну закадрила!
- А потом его убила, угу!
С кожи его юбочку пошила!

- Так гори костёр, гори,
Так гори костёр, гори, УО-О!
Так гори, костёр, гори-
До зари, до зари!!

Я обручена с мёртвыми богами,
Я невеста принца огня!
Обманула, так обманула всех – угу!
Буду править всем сама!

Так гори костёр, гори,
Так гори костёр, гори, УО-О!
Так гори, костёр, гори-
До зари, до зари!!
`,
};

export default song;
