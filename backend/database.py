import os
from motor.motor_asyncio import AsyncIOMotorClient

# This tells Python: "Try to find the MONGO_URI from Render. 
# If you can't find it, use the hardcoded string as a backup."
uri = os.getenv("MONGO_URI", "mongodb+srv://ohenawy_db_user:J4O747nag7Ia7V9m@unipath-cluster.fztcf4l.mongodb.net/?retryWrites=true&w=majority&appName=UniPath-Cluster")

client = AsyncIOMotorClient(uri)
db = client.unipath_db