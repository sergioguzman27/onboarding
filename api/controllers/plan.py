from flask_restful import Resource, request
from flask_restful import fields, marshal

from models import Plan, PlanObjetivo, PlanActividad, PlanActitud, PlanRecurso
from db import db

plan_model_fields = {
    'id': fields.Integer,
    'puesto': fields.String,
    'fecha': fields.String,
    'peso_skill': fields.Float,
    'peso_will': fields.Float
}

objective_model_fields = {'id': fields.Integer, 'nombre': fields.String}
activity_model_fields = {'id': fields.Integer, 'id_objetivo': fields.Integer, 'nombre': fields.String}
attitude_model_fields = {
    'id': fields.Integer, 'nombre': fields.String, 'descripcion': fields.String, 'peso': fields.Float
}
resources_model_fields = {'id': fields.Integer, 'id_recurso': fields.Integer, 'responsable': fields.String}

class PlanController(Resource):
    def get(self, id=None):
        if id:
            obj = Plan.query.filter_by(id=id).first()
            objectives = PlanObjetivo.query.filter_by(id_plan=id)
            activities = PlanActividad.query.filter_by(id_plan=id)
            attitudes = PlanActitud.query.filter_by(id_plan=id)
            resources = PlanRecurso.query.filter_by(id_plan=id)
            
            response = marshal(obj, plan_model_fields)
            response['objectives'] = [marshal(u, objective_model_fields) for u in objectives]
            response['activities'] = [marshal(u, activity_model_fields) for u in activities]
            response['attitudes'] = [marshal(u, attitude_model_fields) for u in attitudes]
            response['resources'] = [marshal(u, resources_model_fields) for u in resources]
            return response, 200
        else:
            query = Plan.query.all()
            return [marshal(u, plan_model_fields) for u in query], 200
    
    def post(self):
        body = request.json
        skills_body = body.pop('objectives', [])
        wills_body = body.pop('attitudes', [])
        resources_body = body.pop('resources', [])
        
        # Create the plan object
        plan = Plan(**body)
        db.session.add(plan)
        db.session.commit()
        
        # Create skills
        for item in skills_body:
            obj_body = item
            activities_body = obj_body.pop('activities')
            obj_body = {**item, 'id_plan': plan.id}
            objective = PlanObjetivo(**obj_body)
            db.session.add(objective)
            db.session.commit()
            
            for _item in activities_body:
                act_body = {**_item, 'id_plan': plan.id, 'id_objetivo': objective.id}
                activity = PlanActividad(**act_body)
                db.session.add(activity)
        
        # Create wills
        for item in wills_body:
            attitude_body = {**item, 'id_plan': plan.id}
            attiude = PlanActitud(**attitude_body)
            db.session.add(attiude)
        
        # Create resources
        for item in resources_body:
            resource_body = {**item, 'id_plan': plan.id}
            resource = PlanRecurso(**resource_body)
            db.session.add(resource)
        
        db.session.commit()
        return marshal(plan, plan_model_fields), 201
    
    def put(self, id=None):
        obj = Plan.query.filter_by(id=id)
        obj.update(dict(request.json))
        db.session.commit()
        obj = Plan.query.get(id)
        return marshal(obj, plan_model_fields), 200
    
    def delete(self, id=None):
        obj = Plan.query.get(id)
        db.session.delete(obj)
        db.session.commit()
        return None, 204