// Test MongoDB connection
import mongoose from "mongoose"

const MONGODB_URI =
  process.env.MONGODB_URI ||
  mongodb+srv://suman080778:mdJlx8JLtDwR2ahe@cluster0.p3m3amz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

async function testConnection() {
  try {
    console.log("🔄 Testing MongoDB connection...")

    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    })

    console.log("✅ MongoDB connection successful!")
    console.log("📊 Connection details:")
    console.log(`- Database: ${mongoose.connection.db.databaseName}`)
    console.log(`- Host: ${mongoose.connection.host}`)
    console.log(`- Port: ${mongoose.connection.port}`)

    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`- Collections: ${collections.map((c) => c.name).join(", ") || "None yet"}`)

    await mongoose.disconnect()
    console.log("🔌 Disconnected successfully")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
    process.exit(1)
  }
}

testConnection()
