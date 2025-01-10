import { db } from "@/server/db"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { env } from "@/env"

// Vercel cron job configuration
export const dynamic = "force-dynamic"
export const maxDuration = 59

export async function GET() {
  try {
    // Verify cron secret in production only
    if (env.NODE_ENV === "production") {
      const headersList = await headers()
      const cronSecret = headersList.get("x-vercel-cron")
      if (cronSecret !== env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    // Get the date 14 days ago
    const fourteenDaysAgo = new Date()
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

    // Delete pending members older than 14 days
    const deleteResult = await db.member.deleteMany({
      where: {
        status: "PENDING",
        createdAt: {
          lt: fourteenDaysAgo,
        },
      },
    })

    // Log the health check
    const healthLog = await db.health.create({
      data: {
        deletedRecords: deleteResult.count,
      },
    })

    return NextResponse.json({
      success: true,
      deletedRecords: deleteResult.count,
      healthLogId: healthLog.id,
    })
  } catch (error) {
    console.error("Health check failed:", error)

    // Log the error in the Health table
    try {
      await db.health.create({
        data: {
          deletedRecords: 0,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      })
    } catch (logError) {
      console.error("Failed to log health check error:", logError)
    }

    return NextResponse.json({ error: "Health check failed" }, { status: 500 })
  }
}
