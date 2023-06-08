from flask_restful import Resource, request
from flask_restful import fields, marshal
from datetime import datetime

from models import Colaborador, ColaboradorOnboarding
from db import db

model_fields = {
    'id': fields.Integer,
    'codigo': fields.Integer,
    'nombre': fields.String,
    'puesto': fields.String,
    'fecha_alta': fields.String,
}

onboarding_model_fields = {
    'id': fields.Integer,
    'id_plan': fields.Integer,
    'id_colaborador': fields.Integer,
    'resultado_skill1': fields.Float,
    'resultado_skill2': fields.Float,
    'resultado_will1': fields.Float,
    'resultado_will2': fields.Float,
    'fecha_evaluacion1': fields.String,
    'fecha_evaluacion2': fields.String,
    'comentario_puntos_fuertes1': fields.String,
    'comentario_puntos_fuertes2': fields.String,
    'comentario_puntos_desarrollar1': fields.String,
    'comentario_puntos_desarrollar2': fields.String,
    'comentario_evaluador1': fields.String,
    'comentario_evaluador2': fields.String,
    'comentario_evaluado1': fields.String,
    'comentario_evaluado2': fields.String
}

class EmployeeController(Resource):
    def get(self, id=None):
        if id:
            obj = Colaborador.query.filter_by(id=id).first()
            return marshal(obj, model_fields), 200
        else:
            query = Colaborador.query.all()
            response = [marshal(u, model_fields) for u in query]
            for i, item in enumerate(query):
                onboarding_obj = ColaboradorOnboarding.query.filter_by(id=item.id).first()
                response[i]['onboarding'] = None
                if onboarding_obj is not None:
                    response[i]['onboarding'] = marshal(onboarding_obj, onboarding_model_fields)
            
            return response, 200