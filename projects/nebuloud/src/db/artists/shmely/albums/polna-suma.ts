import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.polnaSuma,
  name: 'Полна сума',
  year: 2003,
  folder: '/artist/shmely/albums/2003_suma.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79309' },
  songs: [
    [EnumSongs.budtoSkazka, { name: ['Зверь'] }],
    EnumSongs.yaObernusOgnyom,
    EnumSongs.toska,
    EnumSongs.agoniya,
    { name: 'Клякса' },
    EnumSongs.polnaSuma,
    EnumSongs.laboratoriyaAltruizma,
    EnumSongs.voda,
    EnumSongs.sadizm,
    { name: 'Радиактивные отходы' },
    EnumSongs.ivolga,
    { name: 'Виртуальный самолёт' },
    EnumSongs.bomLbom,
    EnumSongs.tishinaIPokoi,
    EnumSongs.fabrikaFekalii,
    { name: 'Облака' },
    { name: 'Эпидемия Ха' },
    EnumSongs.goriKostyor,
    { name: 'Крыша горит' },
    EnumSongs.trupniePyatna,
    EnumSongs.sizoblyudov,
    { name: 'Хули пули праху' },
    [EnumSongs.neputyoviiAvtobus, { name: ['Уа-у-уа'] }],
  ],
  info: `"ПОЛНА СУМА" - сборник (1998-1999)

Выпущен в 2003 г. на "GM-records".

В сборник вошли песни из следующих альбомов: /туловище/, /пурга/, /дурацкие книжки (акустика)/, /принцесса без трусов/, /бомба в убежище (акустика)/, /мощи/.

1998 - 1999 гг. Выпущен 2003 г.

1. Зверь /пурга 1998/
2. Я Обернусь Огнем /принцесса без трусов 1999/
3. Тоска /пурга 1998/
4. Агония /бомба в убежище (акустика) 1999/
5. Клякса /мощи 1999/
6. Полна Сума /бомба в убежище (акустика) 1999/
7. Лаборотория Альтруизма /мощи 1999/
8. Вода /пурга 1998/
9. Садизм /бомба в убежище (акустика) 1999/
10. Радиактивные Отходы /мощи 1999/
11. Иволга /мощи 1999/
12. Виртуальный Самолет /пурга 1998/
13. Бом Лбом /бомба в убежище (акустика) 1999/
14. Тишина и Покой /бомба в убежище (акустика) 1999/
15. Фабрика Фикалий /мощи 1999/
16. Облака /дурацкие книжки (акустика) 1998/
17. Эпидемия Ха /мощи 1999/
18. Гори Костер /дурацкие книжки (акустика) 1998/
19. Крыша Горит /мощи 1999/
20. Трупные Пятна /бомба в убежище (акустика) 1999/
21. Сизоблюдов /мощи 1999/
22. Хули Пули Праху /бомба в убежище (акустика) 1999/
23. Уа-У-Уа /туловище 1998/`,
};

export default album;
