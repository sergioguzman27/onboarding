from db import db

class Actividad(db.Model):
    __tablename__ = 'Actividad'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    nombre = db.Column('Nombre', db.String(150), nullable=True)
    id_objetivo = db.Column('IdObjetivo', db.Integer, db.ForeignKey('Objetivo.Id'), nullable=True)
