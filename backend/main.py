from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import UserProfile, ScorePayload
from database import db
from seed import TAG_LEVEL_FRACTIONS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # The asterisk means "Allow anyone" (Perfect for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users/")
async def create_user(user: UserProfile):
    existing_user = await db.users.find_one({"username": user.username})
    if existing_user:
        await db.users.update_one(
            {"username": user.username},
            {"$set": {"earned_tags": [], "tag_scores": {}, "xp": 0}}
        )
        return {"message": "Existing profile reset for a new game!"}
    await db.users.insert_one(user.dict())
    return {"message": "Profile created!"}

@app.post("/users/{username}/add-score")
async def add_score(username: str, payload: ScorePayload):
    field_path = f"tag_scores.{payload.tag}.{payload.level}"
    await db.users.update_one(
        {"username": username},
        {"$max": {field_path: payload.value}}
    )
    return {"ok": True}

@app.post("/users/{username}/add-tag", deprecated=True)
async def add_tag(username: str, tag: str):
    await db.users.update_one(
        {"username": username},
        {"$push": {"earned_tags": tag}, "$inc": {"xp": 10}}
    )
    return {"message": f"Tag '{tag}' added (deprecated — use /add-score)!"}

@app.get("/users/{username}/recommendations")
async def get_matches(username: str):
    user = await db.users.find_one({"username": username})
    if not user:
        return {"error": "User not found"}

    tag_scores = user.get("tag_scores", {})
    all_majors = await db.majors.find().to_list(100)
    results = []

    for m in all_majors:
        req_tags = m.get("required_tags", {})
        if not req_tags:
            continue

        score = 0.0
        for tag, weight in req_tags.items():
            for level, fraction in TAG_LEVEL_FRACTIONS.get(tag, {}).items():
                user_value = tag_scores.get(tag, {}).get(level, 0.0)
                score += user_value * weight * fraction

        results.append({
            "major": m["name"],
            "faculty": m.get("faculty", "Unknown"),
            "description": m.get("description", ""),
            "score": round(score, 1)
        })

    sorted_results = sorted(results, key=lambda x: x["score"], reverse=True)
    return {
        "username": username,
        "top_majors": sorted_results[:3],
        "all_majors": sorted_results
    }

@app.post("/users/{username}/save-final-result")
async def save_final_result(username: str, major: str):
    await db.users.update_one(
        {"username": username},
        {"$set": {"final_match": major}}
    )
    return {"message": "Final match saved!"}

@app.get("/admin/all-users")
async def get_all_users():
    users = await db.users.find().to_list(100)
    for user in users:
        user["_id"] = str(user["_id"])
    return users
