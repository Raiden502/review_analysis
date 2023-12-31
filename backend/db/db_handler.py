from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from contextlib import contextmanager

# DB
db : SQLAlchemy = SQLAlchemy()
migrate = Migrate()


def init_app(app):
    db.init_app(app)
    migrate.init_app(app, db)

@contextmanager
def transaction():
    try:
        yield
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise


def persist(*args):
    db.session.add_all(args)

def delete(obj):
    db.session.delete(obj)

def execute(sql):
    return db.session.execute(sql)

def drop():
    db.session.drop_all()