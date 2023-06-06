from db import db

class Nivel(db.Model):
    __tablename__ = 'Nivel'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    etiqueta = db.Column('Etiqueta', db.String(150), nullable=True)
    porcentaje = db.Column('Porcentaje', db.Float, nullable=True)
    tipo = db.Column('Tipo', db.Integer, default=1)
