from pydantic import BaseModel, Field


class AnalysisResult(BaseModel):
    species: str
    confidence: float = Field(ge=0, le=100)
    summary: str
    habitat: str
    safety: str
    outdoor_action: str


class ObservationCreate(AnalysisResult):
    pass


class Observation(ObservationCreate):
    id: int
    created_at: str
