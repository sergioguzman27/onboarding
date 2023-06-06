from db import db

class Objetivo(db.Model):
    __tablename__ = 'Objetivo'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    nombre = db.Column('Nombre', db.String(150), nullable=True)
