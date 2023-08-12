from flask import Flask
from flask_cors import CORS
from . import settings
from .db.db_handler import *
from .blueprints.blueprints import blueprint
from .models.consumer import *
from .models.order import *
from .models.product import *
from .models.review import *

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    settings.init(app)
    init_app(app)
    app.register_blueprint(blueprint)
    return app

