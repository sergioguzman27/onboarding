from flask_restful import Resource, request
from flask_restful import fields, marshal

from models import Nivel
from db import db

model_fields = {
    'id': fields.Integer,
    'etiqueta': fields.String,
    'porcentaje': fields.Float,
    'tipo': fields.Integer,
}

class LevelController(Resource):
    
    def get(self, id=None):
        if id:
            obj = Nivel.query.filter_by(id=id).first()
            return marshal(obj, model_fields), 200
        else:
            query = Nivel.query.all()
            return [marshal(u, model_fields) for u in query], 200
    
    def post(self):
        obj = Nivel(**request.json)
        db.session.add(obj)
        db.session.commit()
        
        return marshal(obj, model_fields), 201
    
    def put(self, id=None):
        obj = Nivel.query.filter_by(id=id)
        obj.update(dict(request.json))
        db.session.commit()
        obj = Nivel.query.get(id)
        return marshal(obj, model_fields), 200
    
    def delete(self, id=None):
        obj = Nivel.query.get(id)
        db.session.delete(obj)
        db.session.commit()
        return None, 204
