from db import db

class Colaborador(db.Model):
    __tablename__ = 'Colaborador'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    codigo = db.Column('Codigo', db.Integer, nullable=True)
    nombre = db.Column('Nombre', db.String(150), nullable=True)
    fecha_alta = db.Column('FechaAlta', db.DateTime, nullable=True)
