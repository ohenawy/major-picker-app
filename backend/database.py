from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb+srv://ohenawy_db_user:J4O747nag7Ia7V9m@unipath-cluster.fztcf4l.mongodb.net/?retryWrites=true&w=majority&appName=UniPath-Cluster")
db = client.unipath_db