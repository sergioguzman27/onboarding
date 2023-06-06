from db import db

class PlanActitud(db.Model):
    __tablename__ = 'PlanActitud'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_plan = db.Column('IdPlan', db.Integer, db.ForeignKey('Plan.Id'), nullable=True)
    id_actitud = db.Column('IdActitud', db.Integer, db.ForeignKey('Actitud.Id'), nullable=True)
