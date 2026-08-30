from pydantic import BaseModel,Field

class TripRequest(BaseModel):
    prompt:str=Field(min_length=1,max_length=2000)