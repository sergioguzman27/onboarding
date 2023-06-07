from flask_restful import Resource, request
from flask_restful import fields, marshal

from models import Recurso
from db import db

model_fields = {
    'id': fields.Integer,
    'descripcion': fields.String,
    'tipo': fields.Integer
}

class ResourceController(Resource):
    
    def get(self, id=None):
        if id:
            resource = Recurso.query.filter_by(id=id).first()
            return marshal(resource, model_fields), 200
        else:
            query = Recurso.query.all()
            return [marshal(u, model_fields) for u in query], 200
    
    def post(self):
        resource = Recurso(**request.json)
        db.session.add(resource)
        db.session.commit()
        
        return marshal(resource, model_fields), 201
    
    def put(self, id=None):
        resource = Recurso.query.get(id)
        
        resource.descripcion = request.json['descripcion']
        resource.tipo = request.json['tipo']
        db.session.commit()
        return marshal(resource, model_fields), 200
    
    def delete(self, id=None):
        resource = Recurso.query.get(id)
        db.session.delete(resource)
        db.session.commit()
        return None, 204
