-- ====  UP  ====

BEGIN;

CREATE TABLE IF NOT EXISTS types (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
);

INSERT INTO types(id, name)
VALUES (1, 'photo'), (2, 'video');

CREATE TABLE IF NOT EXISTS bookmarks (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(70),
  author_name VARCHAR(70),
  thumbnail_url VARCHAR(255),
  url VARCHAR(255),
  duration INT,
  width INT,
  height INT,
  upload_date DATETIME,
  created_at DATETIME NOT NULL,
  type INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (type) REFERENCES types(id)
);

COMMIT;

-- ==== DOWN ====

BEGIN;

COMMIT;
    