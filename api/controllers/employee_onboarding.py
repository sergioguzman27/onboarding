from flask_restful import Resource, request
from flask_restful import fields, marshal
from datetime import datetime

from models import (ColaboradorOnboarding, Plan, ColaboradorObjetivo, ColaboradorActividad,
                    ColaboradorActitud, ColaboradorRecurso)
from db import db

onboarding_model_fields = {
    'id': fields.Integer,
    'id_plan': fields.Integer,
    'id_colaborador': fields.Integer,
    'resultado_evaluacion1': fields.Float,
    'resultado_evaluacion2': fields.Float,
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
        
    def post(self):
        # This method assign the onboarding plan to the employee
        obj = ColaboradorOnboarding(**request.json)
        db.session.add(obj)
        db.session.commit()
        
        # Create the relations (Objective, Activity, Attitude, Resource)
        
        
        return marshal(obj, onboarding_model_fields), 201
        
    