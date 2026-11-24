export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoUrl = url.searchParams.get("url");

  if (!videoUrl) {
    return Response.json({
      success: false,
      message: "Please provide an MP4 link."
    }, { status: 400 });
  }

  try {
    const parsed = new URL(videoUrl);

    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      !/\.mp4$/i.test(parsed.pathname)
    ) {
      throw new Error("Invalid MP4 link");
    }

    const response = await fetch(videoUrl, {
      method: "HEAD"
    });

    const type = response.headers.get("content-type") || "";

    return Response.json({
      success: response.ok && type.includes("video"),
      message: response.ok && type.includes("video")
        ? "Video link is available!"
        : "Video could not be verified."
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Unable to verify this video link."
    }, { status: 400 });
  }
}
