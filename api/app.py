import os
import serverless_wsgi
from flask import Flask
from flask_restful import Api
from dotenv import load_dotenv

from controllers import TodoController
from db import db

load_dotenv()
env = os.getenv('ENV')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
app.config['BUNDLE_ERRORS'] = os.getenv('BUNDLE_ERRORS')
app.config['PROPAGATE_EXCEPTIONS'] = True

db.init_app(app)

api = Api(app)
api.prefix = '/api'

api.add_resource(TodoController, '/todos', '/todos/<int:todo_id>')

if __name__ == '__main__':
    app.run(debug=True)

def handler(event, context):
    return serverless_wsgi.handle_request(app, event, context)