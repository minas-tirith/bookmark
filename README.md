# Dependencies
make deps

# Migrations
make init

# Linter
make lint

# Tests
make test

# Run the project
make run

# Steps
- make deps, make init, make run
- do not forget the .env file :)

# API
- LIST => GET http://localhost:8000/v1/bookmarks
- READ => GET http://localhost:8000/v1/bookmarks/{id}
- DELETE => DEL http://localhost:8000/v1/bookmarks/{id}
- UPDATE => PUT http://localhost:8000/v1/bookmarks/{id}
    - Update author_name: { "author_name": "toto" }
- CREATE => POST http://localhost:8000/v1/bookmarks
    - PHOTO => { "url": "https://www.flickr.com/photos/bees/2341623661" }
    - VIDEO => { "url": "https://vimeo.com/332293586" }

# Lexique
- Controller: An entry point.
- Lambda: A function invokable inside the project.

# Système de routing
<p>The http request is used to retrieved the payload and create qualifier based on the HTTP url.</p>

There is 4 http verbs supported to create a qualifier.

| Http verb   |      Action on resources      |
|----------|:-------------:|
| GET |  read, list |
| PUT |    update   |
| POST | create |
| DELETE | delete |

Example of mapping

Http verb | Url   |      Qualifier      |
|----------|----------|:-------------:|
| GET | /users | users.list:v1 |
| GET | /users/1 | users.read:v1 |
| PUT | /users/1 | users.update:v1 |
| POST | /users | users.create:v1 |
| POST | /users/1/addresses | users.addresses.create:v1 |
| DELETE | /users/1 | users.delete:v1 |

# Note à l'attention du reviewer
Pour ce test technique, j'ai implémenté des tests (19), un linter, du versioning, un système de migrations, un système d'environnement, un sytème de gestion d'erreur et un système de routing "scalable" qui respecte les standards d'api REST.