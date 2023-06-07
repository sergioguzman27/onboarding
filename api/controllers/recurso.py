from flask_restful import Resource, request
from flask_restful import fields, marshal

from models import Recurso
from db import db

model_fields = {
    'id': fields.Integer,
    'descripcion': fields.String,
    'tipo': fields.Integer
}

class RecursoController(Resource):
    
    def get(self, id=None):
        if id:
            recurso = Recurso.query.filter_by(id=id).first()
            return marshal(recurso, model_fields), 200
        else:
            query = Recurso.query.all()
            return [marshal(u, model_fields) for u in query], 200
    
    def post(self):
        recurso = Recurso(**request.json)
        db.session.add(recurso)
        db.session.commit()
        
        return marshal(recurso, model_fields), 201
    
    def put(self, id=None):
        recurso = Recurso.query.get(id)
        
        recurso.descripcion = request.json['descripcion']
        recurso.tipo = request.json['tipo']
        db.session.commit()
        return marshal(recurso, model_fields), 200
    
    def delete(self, id=None):
        recurso = Recurso.query.get(id)
        db.session.delete(recurso)
        db.session.commit()
        return None, 204
