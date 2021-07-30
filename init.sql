/*************************************/
/* TABLE CREATION */
/*************************************/
CREATE TABLE IF NOT EXISTS publisher
(
  id    SERIAL,
  name  VARCHAR(100)  NOT NULL  UNIQUE,
  siret INT           NOT NULL,
  phone VARCHAR(20)   NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS game
(
  id            SERIAL,
  title         VARCHAR(100)  NOT NULL,
  price         INT           NOT NULL,
  discount      INT,
  publisherId   BIGINT        UNSIGNED,
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

