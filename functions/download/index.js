export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoUrl = url.searchParams.get("url");

  if (!videoUrl) {
    return new Response("Video link is missing", { status: 400 });
  }

  let video;

  try {
    video = new URL(videoUrl);
  } catch {
    return new Response("Invalid video link", { status: 400 });
  }

  // صرف ہمارا ٹیسٹ لنک قبول ہوگا
  if (
    video.hostname !== "www.w3schools.com" ||
    video.pathname !== "/html/mov_bbb.mp4" ||
    video.protocol !== "https:"
  ) {
    return new Response("This video source is not allowed", {
      status: 403
    });
  }

  try {
    const result = await fetch(video.toString());

    if (!result.ok) {
      return new Response("Video could not be downloaded", {
        status: 502
      });
    }

    return new Response(result.body, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="video.mp4"'
      }
    });
  } catch {
    return new Response("Download failed", { status: 502 });
  }
}
