from flask_restful import Resource, request
from flask_restful import fields, marshal
from datetime import datetime

from models import Colaborador
from db import db

model_fields = {
    'id': fields.Integer,
    'codigo': fields.Integer,
    'nombre': fields.String,
    'puesto': fields.String,
    'fecha_alta': fields.String,
}

class EmployeeController(Resource):
    def get(self, id=None):
        if id:
            obj = Colaborador.query.filter_by(id=id).first()
            return marshal(obj, model_fields), 200
        else:
            query = Colaborador.query.all()
            return [marshal(u, model_fields) for u in query], 200