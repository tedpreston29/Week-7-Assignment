CREATE TABLE IF NOT EXISTS games (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game_title VARCHAR(300) NOT NULL,
  release_year INT,
  genre VARCHAR(100) NOT NULL,
  img_src TEXT
);

INSERT INTO games (game_title, release_year, genre, img_src) VALUES
('The Simpsons: Hit & Run', 2003, 'Action-Adventure', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20624.jpg?raw=true'),
('Grand Theft Auto: San Andreas', 2004, 'Action-Adventure', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20946.jpg?raw=true'),
('Enter the Matrix', 2003, 'Action', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20454.jpg?raw=true'),
('The Lord of the Rings: The Return of the King', 2003, 'Action', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20770.jpg?raw=true'),
('Spyro: Enter the Dragonfly', 2002, 'Platformer', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20315.jpg?raw=true'),
('Shrek 2', 2004, 'Platformer', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20745.jpg?raw=true'),
('Downhill Domination', 2003, 'Racing', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SCUS-97177.jpg?raw=true'),
('Burnout 2: Point of Impact', 2004, 'Racing', 'https://github.com/xlenore/ps2-covers/blob/main/covers/default/SLUS-20497.jpg?raw=true');





CREATE TABLE IF NOT EXISTS cheats (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cheat_title VARCHAR(250) NOT NULL,
  code TEXT NOT NULL,
  effect TEXT NOT NULL,
  game_id INT REFERENCES games(id)
);

INSERT INTO cheats (cheat_title, code, effect, game_id) VALUES

('Vehicle Invincibility', 'Right, Up, Right, Up', 'Cars become invincible', 1),
('Car Horn Jump', 'Left, Left, Left, Right', 'Cars launch into the air', 1),
('Redbrick Car', 'Down, Down, Right, Left', 'Unlocks the Redbrick car', 1),

('Infinite Health', 'R2, X, L1, Circle, Left, Down, Right, Up', 'Full health without damage', 2),
('Infinite Ammo', 'R1, R2, Square, R2, Left, Down, Right, Up', 'Unlimited ammunition', 2),
('Spawn Tank', 'R2, Right, Circle, Circle, Right, Down, Down, Right', 'Spawns a tank', 2),

('Infinite Ammunition', '1DDF2556', 'Unlimited ammo', 3),
('Enemies Cannot See You', 'FFFFFFF1', 'Enemies are invisible', 3),
('Maximum Firepower', '0034AFFF', 'Max damage with weapons', 3),

('Frodo Level 2 Skills', 'Triangle, Up, Down, Circle', 'Unlocks Frodo level 2 skills', 4),
('Frodo Level 4 Skills', 'Triangle, Up, Circle, Down', 'Unlocks Frodo level 4 skills', 4),
('Gimli Level 2 Skills', 'X, Square, X, Down', 'Unlocks Gimli level 2 skills', 4),

('Flying Cows', 'Left, Left, Right, Left, X', 'Cows fly around the level', 5),
('Slow Motion', 'Left, Right, Right, Right, X', 'Game runs in slow motion', 5),
('Turn Sparx Purple', 'Left, Right, Right, Left, X', 'Changes Sparx color', 5),

('Unlock All Characters', 'Left, Up, A, B, Left, Up, A, B, Left, Up, A, B, X, B, X, B, X, B', 'Unlocks all characters', 6),
('Bonus Games', 'Left, Up, A, B, Left, Up, A, B, Left, Up, A, B, X, B, X, B, X, B', 'Unlocks bonus games', 6),

('Unlock Protobike', 'Up, Triangle, Down, X, Left, Circle, Right, Square', 'Unlocks Protobike', 7),
('$2,000 Instantly', 'Right, Triangle, Triangle, Left', 'Grants $2,000 instantly', 7),
('Adrenaline Boost', 'Down, Left, Left, Right', 'Activates adrenaline boost', 7),
 
('Unlock All Cars', 'Up, Down, Up, Down', 'Unlocks all cars', 8),
('Unlock All Tracks', 'Left, Right, Left, Right', 'Unlocks all tracks', 8),
('Unlock All Modes', 'Up, Down, Left, Right', 'Unlocks all modes', 8);


SELECT
    games.id,
    games.game_title,
    games.release_year,
    games.img_src,
    ARRAY_AGG (json_build_object(
      'cheat_title', cheats.cheat_title,
      'cheat_code', cheats.code,
      'cheat_effect', cheats.effect
    )) AS cheat_info
    FROM games
    LEFT JOIN cheats ON cheats.game_id = games.id
    GROUP BY games.id, games.release_year, games.img_src