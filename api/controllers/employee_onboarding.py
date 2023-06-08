from flask_restful import Resource, request
from flask_restful import fields, marshal
from datetime import datetime

from models import (ColaboradorOnboarding, Colaborador, ColaboradorObjetivo, ColaboradorActividad,
                    ColaboradorActitud, ColaboradorRecurso, PlanObjetivo, PlanActividad,
                    PlanActitud, PlanRecurso)
from db import db

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

employee_model_fields = {
    'id': fields.Integer,
    'codigo': fields.Integer,
    'nombre': fields.String,
    'puesto': fields.String,
    'fecha_alta': fields.String,
}

generic_model_fields = {
    'id': fields.Integer,
    'id_objetivo': fields.Integer,
    'id_actividad': fields.Integer,
    'id_actitud': fields.Integer,
    'id_colaborador_onboarding': fields.Integer,
    'resultado_evaluacion1': fields.Float,
    'resultado_evaluacion2': fields.Float
}

resource_model_fields = {
    'id': fields.Integer,
    'id_recurso': fields.Integer,
    'id_colaborador_onboarding': fields.String,
    'entregado': fields.Integer,
    'fecha_entregado': fields.String
}

class EmployeeOnboardingController(Resource):
        
    def post(self):
        # This method assign the onboarding plan to the employee
        obj = ColaboradorOnboarding(**request.json)
        db.session.add(obj)
        db.session.commit()
        
        # Create the relations (Objective, Activity, Attitude, Resource)
        objectives = PlanObjetivo.query.filter_by(id_plan=obj.id_plan)
        activities = PlanActividad.query.filter_by(id_plan=obj.id_plan)
        attitudes = PlanActitud.query.filter_by(id_plan=obj.id_plan)
        resources = PlanRecurso.query.filter_by(id_plan=obj.id_plan)
        
        for item in objectives:
            empl_objective = ColaboradorObjetivo(
                **{'id_objetivo': item.id, 'id_colaborador_onboarding': obj.id}
            )
            db.session.add(empl_objective)
        
        for item in activities:
            empl_activity = ColaboradorActividad(
                **{'id_actividad': item.id, 'id_colaborador_onboarding': obj.id}
            )
            db.session.add(empl_activity)
        
        for item in attitudes:
            empl_attiude = ColaboradorActitud(
                **{'id_actitud': item.id, 'id_colaborador_onboarding': obj.id}
            )
            db.session.add(empl_attiude)
        
        for item in resources:
            empl_resource = ColaboradorRecurso(
                **{'id_recurso': item.id, 'id_colaborador_onboarding': obj.id}
            )
            db.session.add(empl_resource)
            
        db.session.commit()
            
        return marshal(obj, onboarding_model_fields), 201
    
    def get(self, id=None):
        try:
            employee = Colaborador.query.filter_by(id=id).first()
            employee_onb = ColaboradorOnboarding.query.filter_by(id_colaborador=id).first()
            
            # Relations
            objectives = ColaboradorObjetivo.query.filter_by(id_colaborador_onboarding=employee_onb.id)
            activities = ColaboradorActividad.query.filter_by(id_colaborador_onboarding=employee_onb.id)
            attitudes = ColaboradorActitud.query.filter_by(id_colaborador_onboarding=employee_onb.id)
            resources = ColaboradorRecurso.query.filter_by(id_colaborador_onboarding=employee_onb.id)
            
            employee_response = marshal(employee_onb, onboarding_model_fields)
            employee_response['employee'] = marshal(employee, employee_model_fields)
            employee_response['objectives'] = [marshal(u, generic_model_fields) for u in objectives]
            employee_response['activities'] = [marshal(u, generic_model_fields) for u in activities]
            employee_response['attitudes'] = [marshal(u, generic_model_fields) for u in attitudes]
            employee_response['resources'] = [marshal(u, resource_model_fields) for u in resources]
            
            return employee_response, 200
        except:
            return {'message': 'Employee has not onboarding plan'}, 404
