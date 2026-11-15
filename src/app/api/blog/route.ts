import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

export async function GET() {
  try {
    const blogPosts = db.getBlogPosts();
    return NextResponse.json(
      { success: true, blogPosts },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, slug, excerpt, content, category, author } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Title and content are required." }, { status: 400 });
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newPost = db.createBlogPost({
      title,
      slug: generatedSlug,
      excerpt: excerpt || title,
      content,
      category: category || "Technology",
      author: author || "NIYAN Editorial",
      readTime: "5 min read",
      publishedAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID required" }, { status: 400 });
    }

    const deleted = db.deleteBlogPost(id);
    return NextResponse.json({ success: deleted });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
