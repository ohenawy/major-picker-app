import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb+srv://ohenawy_db_user:J4O747nag7Ia7V9m@unipath-cluster.fztcf4l.mongodb.net/?retryWrites=true&w=majority&appName=UniPath-Cluster")
db = client.unipath_db

TAG_LEVEL_FRACTIONS = {
    # 3-level tags
    "memorization":        {"L2": 0.50, "L3": 0.35, "L4": 0.15},
    "public-speaking":     {"L2": 0.50, "L3": 0.35, "L4": 0.15},
    "logic":               {"L2": 0.50, "L3": 0.35, "L4": 0.15},
    "collaboration":       {"L3": 0.30, "L4": 0.30, "L5": 0.40},
    # 2-level tags
    "hardware":            {"L2": 0.50, "L3": 0.50},
    "debugging":           {"L2": 0.50, "L3": 0.50},
    "subjectivity":        {"L2": 0.50, "L4": 0.50},
    "high-stress":         {"L2": 0.50, "L4": 0.50},
    "innovation":          {"L2": 0.50, "L5": 0.50},
    "writing":             {"L3": 0.60, "L5": 0.40},
    "clinical":            {"L3": 0.45, "L4": 0.55},
    # Single-level tags
    "math":                {"L2": 1.0},
    "conflict-management": {"L2": 1.0},
    "focus":               {"L3": 1.0},
    "software":            {"L3": 1.0},
    "design":              {"L3": 1.0},
    "management":          {"L3": 1.0},
    "analytics":           {"L3": 1.0},
    "art":                 {"L3": 1.0},
    "networks":            {"L3": 1.0},
    "construction":        {"L3": 1.0},
    "politics":            {"L3": 1.0},
    "ethics":              {"L3": 1.0},
    "physical-design":     {"L4": 1.0},
    "connectivity":        {"L4": 1.0},
    "financial":           {"L5": 1.0},
    "mobility":            {"L5": 1.0},
    "stability":           {"L5": 1.0},
    "social-impact":       {"L5": 1.0},
    "leadership":          {"L5": 1.0},
}

majors_data = [
    # ════════ FACULTY OF MEDIA ENGINEERING & TECHNOLOGY ════════
    {
        "name": "Computer Science and Engineering", "faculty": "Media Engineering and Technology", 
        "description": "Building the algorithms, logic, and software that power the digital world.",
        "required_tags": {"software": 35, "logic": 25, "debugging": 20, "math": 10, "focus": 10}
    },
    {
        "name": "Digital Media Engineering and Technology", "faculty": "Media Engineering and Technology", 
        "description": "Bridging hardcore software development with creative design and UI/UX.",
        "required_tags": {"software": 25, "design": 25, "innovation": 15, "art": 15, "collaboration": 10, "subjectivity": 10}
    },

    # ════════ FACULTY OF INFORMATION ENGINEERING & TECHNOLOGY ════════
    {
        "name": "Networks", "faculty": "Information Engineering and Technology", 
        "description": "Designing and securing the infrastructure that connects the internet.",
        "required_tags": {"networks": 35, "debugging": 20, "logic": 20, "software": 15, "hardware": 10}
    },
    {
        "name": "Communications", "faculty": "Information Engineering and Technology", 
        "description": "Developing wireless, satellite, and telecommunications systems.",
        "required_tags": {"connectivity": 30, "networks": 25, "math": 20, "hardware": 15, "focus": 10}
    },
    {
        "name": "Electronics", "faculty": "Information Engineering and Technology", 
        "description": "Engineering microchips, circuits, and physical tech hardware.",
        "required_tags": {"hardware": 35, "logic": 20, "math": 20, "debugging": 15, "focus": 10}
    },

    # ════════ FACULTY OF ENGINEERING & MATERIALS SCIENCE ════════
    {
        "name": "Materials Engineering", "faculty": "Engineering and Materials Science", 
        "description": "Researching the chemistry and physics of new physical materials.",
        "required_tags": {"analytics": 25, "clinical": 20, "math": 20, "physical-design": 15, "focus": 10, "stability": 10}
    },
    {
        "name": "Design and Production Engineering", "faculty": "Engineering and Materials Science", 
        "description": "Managing industrial manufacturing and physical prototyping.",
        "required_tags": {"physical-design": 30, "management": 20, "hardware": 20, "math": 15, "innovation": 15}
    },
    {
        "name": "Mechatronics Engineering", "faculty": "Engineering and Materials Science", 
        "description": "The ultimate hybrid of robotics, software, and mechanical systems.",
        "required_tags": {"hardware": 25, "software": 25, "math": 20, "logic": 15, "physical-design": 15}
    },
    {
        "name": "Civil Engineering", "faculty": "Engineering and Materials Science", 
        "description": "Managing massive public infrastructure and construction projects.",
        "required_tags": {"construction": 35, "management": 20, "math": 20, "stability": 15, "public-speaking": 10}
    },
    {
        "name": "Architecture Engineering", "faculty": "Engineering and Materials Science", 
        "description": "The structural, mathematical, and aesthetic design of buildings.",
        "required_tags": {"construction": 30, "design": 25, "art": 15, "math": 15, "physical-design": 15}
    },

    # ════════ FACULTY OF PHARMACY & BIOTECHNOLOGY ════════
    {
        "name": "PharmD", "faculty": "Pharmacy and Biotechnology", 
        "description": "The study of drugs, chemical interactions, and patient healthcare.",
        "required_tags": {"clinical": 30, "memorization": 30, "focus": 15, "stability": 15, "social-impact": 10}
    },
    {
        "name": "Biotechnology", "faculty": "Pharmacy and Biotechnology", 
        "description": "Using living organisms to develop new medical and agricultural tech.",
        "required_tags": {"clinical": 30, "analytics": 25, "innovation": 20, "focus": 15, "math": 10}
    },

    # ════════ FACULTY OF MANAGEMENT TECHNOLOGY ════════
    {
        "name": "General Management", "faculty": "Management Technology", 
        "description": "Overseeing teams, corporate operations, and human capital.",
        "required_tags": {"management": 35, "leadership": 25, "public-speaking": 15, "collaboration": 15, "conflict-management": 10}
    },
    {
        "name": "Business Informatics", "faculty": "Management Technology", 
        "description": "Using data analytics and software logic to solve business problems.",
        "required_tags": {"analytics": 30, "software": 25, "management": 20, "logic": 15, "financial": 10}
    },
    {
        "name": "Technology-based Management", "faculty": "Management Technology", 
        "description": "Leading tech startups and driving modern innovation strategy.",
        "required_tags": {"management": 30, "innovation": 25, "leadership": 20, "analytics": 15, "high-stress": 10}
    },

    # ════════ FACULTY OF APPLIED SCIENCES & ARTS ════════
    {
        "name": "Graphic Design", "faculty": "Applied Sciences and Arts", 
        "description": "Visual communication, branding, typography, and 2D media.",
        "required_tags": {"design": 35, "art": 30, "subjectivity": 15, "innovation": 10, "collaboration": 10}
    },
    {
        "name": "Media Design", "faculty": "Applied Sciences and Arts", 
        "description": "Creating dynamic content for film, animation, and digital platforms.",
        "required_tags": {"art": 25, "design": 25, "subjectivity": 20, "innovation": 15, "mobility": 15}
    },
    {
        "name": "Product Design", "faculty": "Applied Sciences and Arts", 
        "description": "Designing functional, ergonomic, and aesthetic physical products.",
        "required_tags": {"physical-design": 35, "design": 20, "art": 15, "innovation": 15, "focus": 15}
    },

    # ════════ FACULTY OF LAW ════════
    {
        "name": "Law & Legal Studies", "faculty": "Law",
        "description": "The study of legal systems, justice, corporate law, and advocacy.",
        "required_tags": {"writing": 25, "memorization": 20, "ethics": 15, "public-speaking": 15, "conflict-management": 10, "politics": 10, "high-stress": 5}
    },

    # ════════ FACULTY OF DENTISTRY ════════
    {
        "name": "Dentistry", "faculty": "Dentistry",
        "description": "High-precision surgical and medical care of oral health.",
        "required_tags": {"clinical": 35, "physical-design": 20, "memorization": 20, "high-stress": 15, "focus": 10}
    }
]

async def seed_database():
    print("Clearing old data...")
    await db.majors.delete_many({}) 
    
    print("Injecting majors...")
    await db.majors.insert_many(majors_data)
    
    count = await db.majors.count_documents({})
    print(f"✅ Success! {count} majors added to MongoDB.")

if __name__ == "__main__":
    asyncio.run(seed_database())