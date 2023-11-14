from dataclasses import dataclass

@dataclass
class ApplicationConfig(object):
    # DATABASE
    DATABASE_URI:str= "postgresql://postgres:system@localhost:5432/nlp"