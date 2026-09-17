import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.organizm,
  name: 'Организм',
  year: 2000,
  folder: '/artist/shmely/albums/2000_organizm.jpg',
  songs: [
    EnumSongs.polnaSuma,
    EnumSongs.organizm,
    EnumSongs.pogadai,
    [EnumSongs.putK, { name: ['Путь к... (Клочья)'] }],
    EnumSongs.iskushenie,
    EnumSongs.pokidayaMir,
    [EnumSongs.slyoznaya, { name: ['Лиха та беда'] }],
    { name: 'Клякса' },
    EnumSongs.fabrikaFekalii,
    [EnumSongs.ivolga, { name: ['Иволгой'] }],
    [EnumSongs.groza, { name: ['Гроза (Клочья)'] }],
    EnumSongs.laboratoriyaAltruizma,
    { name: 'Череп и подснежник' },
    EnumSongs.agoniya,
    { name: 'Крыша горит' },
    EnumSongs.sizoblyudov,
  ],
};

export default album;
