from pydantic import BaseModel
from typing import List, Dict

class UserProfile(BaseModel):
    username: str
    email: str
    level: int = 1
    xp: int = 0
    earned_tags: List[str] = []
    tag_scores: Dict[str, Dict[str, float]] = {}

class Major(BaseModel):
    name: str
    required_tags: Dict[str, int]
    description: str

class ScorePayload(BaseModel):
    tag: str
    level: str   # "L2" | "L3" | "L4" | "L5"
    value: float # 0.0 to 1.0
