from dataclasses import dataclass
from sqlalchemy.orm import relationship
from ..db.db_handler import db
from datetime import datetime
from ..utils.gettime import getcurrenttime

newtime = getcurrenttime()

@dataclass
class ConsumerModel(db.Model):
    __tablename__ = "consumers"
    
    cons_id: int
    c_name: str
    c_email: str
    c_password: str
    c_role:str
    c_date:datetime
    c_is_active: bool

    cons_id = db.Column(db.BigInteger, autoincrement=True, primary_key=True)
    c_name = db.Column(db.String(200), nullable=False)
    c_email = db.Column(db.String(200), nullable=False, unique=True)
    c_password = db.Column(db.String(300), nullable=False)
    c_role = db.Column(db.String(100), nullable=False)
    c_date = db.Column(db.DateTime, default=newtime, nullable=False)
    c_is_active = db.Column(db.Boolean, nullable=False)
