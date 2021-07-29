/*************************************/
/* TABLE CREATION */
/*************************************/
CREATE TABLE IF NOT EXISTS publisher
(
  id    SERIAL,
  name  VARCHAR(100)  NOT NULL,
  siret INT           NOT NULL,
  phone VARCHAR(20)   NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS game
(
  id            SERIAL,
  title         VARCHAR(100)  NOT NULL,
  price         INT           NOT NULL,
  publisherId  BIGINT        UNSIGNED    NOT NULL,
  releaseDate   TIMESTAMP     NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (publisherId) REFERENCES publisher(id)
);

CREATE TABLE IF NOT EXISTS tag
(
  id    SERIAL,
  name  VARCHAR(50)   NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS gameTag
(
  id        SERIAL,
  gameId   BIGINT  UNSIGNED    NOT NULL,
  tagId    BIGINT  UNSIGNED    NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (gameId) REFERENCES game(id),
  FOREIGN KEY (tagId) REFERENCES tag(id)
);

/*************************************/
/* DATA INSERTION */
/*************************************/
INSERT INTO publisher
  (name, siret, phone)
VALUES
  ('ubisoft', 99999, '0101010101'),
  ('riot', 88888, '0202020202');

INSERT INTO game
  (title, price, publisherId, releaseDate)
VALUES
  ('overwatch', 50, 1, '2021-01-01 00:00:01'),
  ('league of legends', 100, 2, '2021-02-01 00:00:01');

INSERT INTO tag
  (name)
VALUES
  ('fight'),
  ('team'),
  ('competition');

INSERT INTO gameTag
  (gameId, tagId)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2),
  (2, 3);
