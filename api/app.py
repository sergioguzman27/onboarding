import os
import serverless_wsgi
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv

import controllers as c
from db import db

load_dotenv()
env = os.getenv('ENV')

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
app.config['BUNDLE_ERRORS'] = os.getenv('BUNDLE_ERRORS')
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config["DEBUG"] = True

db.init_app(app)

api = Api(app)
api.prefix = '/api'

api.add_resource(c.TodoController, '/todos', '/todos/<int:todo_id>')
api.add_resource(c.RecursoController, '/resource', '/resource/<int:id>')
api.add_resource(c.NivelController, '/level', '/level/<int:id>')
api.add_resource(c.PlanController, '/plan', '/plan/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)

def handler(event, context):
    return serverless_wsgi.handle_request(app, event, context)