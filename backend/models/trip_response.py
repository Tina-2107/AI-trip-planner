from pydantic import BaseModel, Field
from typing import Optional


class Stop(BaseModel):
    id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    time: Optional[str] = None
    description: Optional[str] = None


class Day(BaseModel):
    day: int= Field(ge=1) #for -ve day
    title: Optional[str] = None
    stops: list[Stop] = Field(min_length=1)


class TripResponse(BaseModel):
    destination: str = Field(min_length=1)
    summary: Optional[str] = None
    days: list[Day] = Field(min_length=1)
    